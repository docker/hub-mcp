#!/usr/bin/env bash
# setup-nat.sh — Configure NAT (MASQUERADE) on a Proxmox host
# This enables VMs on an internal bridge (e.g. vmbr1) to reach the internet
# through the host's primary interface.
#
# Usage: sudo bash setup-nat.sh [WAN_IFACE] [INTERNAL_BRIDGE] [INTERNAL_SUBNET]

set -euo pipefail

WAN_IFACE="${1:-vmbr0}"
INTERNAL_BRIDGE="${2:-vmbr1}"
INTERNAL_SUBNET="${3:-10.10.10.0/24}"

echo "==> Configuring NAT"
echo "    WAN interface:    $WAN_IFACE"
echo "    Internal bridge:  $INTERNAL_BRIDGE"
echo "    Internal subnet:  $INTERNAL_SUBNET"

# Enable IP forwarding persistently
if ! grep -q '^net.ipv4.ip_forward=1' /etc/sysctl.conf; then
    echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
fi
sysctl -w net.ipv4.ip_forward=1

# Flush existing NAT rules for idempotency
iptables -t nat -D POSTROUTING -s "$INTERNAL_SUBNET" -o "$WAN_IFACE" -j MASQUERADE 2>/dev/null || true

# Add MASQUERADE rule
iptables -t nat -A POSTROUTING -s "$INTERNAL_SUBNET" -o "$WAN_IFACE" -j MASQUERADE

# Allow forwarding between internal bridge and WAN
iptables -D FORWARD -i "$INTERNAL_BRIDGE" -o "$WAN_IFACE" -j ACCEPT 2>/dev/null || true
iptables -D FORWARD -i "$WAN_IFACE" -o "$INTERNAL_BRIDGE" -m state --state RELATED,ESTABLISHED -j ACCEPT 2>/dev/null || true
iptables -A FORWARD -i "$INTERNAL_BRIDGE" -o "$WAN_IFACE" -j ACCEPT
iptables -A FORWARD -i "$WAN_IFACE" -o "$INTERNAL_BRIDGE" -m state --state RELATED,ESTABLISHED -j ACCEPT

# Persist rules (Debian/Proxmox uses iptables-persistent or /etc/network/interfaces post-up)
if command -v netfilter-persistent &>/dev/null; then
    netfilter-persistent save
    echo "==> Rules saved via netfilter-persistent"
else
    echo "==> WARNING: netfilter-persistent not found."
    echo "    Install with: apt install iptables-persistent"
    echo "    Or add post-up rules to /etc/network/interfaces manually:"
    echo "    post-up iptables -t nat -A POSTROUTING -s $INTERNAL_SUBNET -o $WAN_IFACE -j MASQUERADE"
fi

echo "==> NAT configuration complete."
