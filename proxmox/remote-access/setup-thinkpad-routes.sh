#!/usr/bin/env bash
# setup-thinkpad-routes.sh — Configure routing on ThinkPad to reach VM network
#
# Run this on the ThinkPad (192.168.16.10) to enable access to VMs
# on the internal 192.168.20.0/24 network via the Proxmox hosts.
#
# Usage: sudo bash setup-thinkpad-routes.sh

set -euo pipefail

echo "==> Setting up routes on ThinkPad to reach VM network"
echo ""
echo "    ThinkPad:  192.168.16.10"
echo "    Host 1:    192.168.16.2  (gateway to VMs)"
echo "    Host 2:    192.168.16.3  (gateway to VMs)"
echo "    VM subnet: 192.168.20.0/24"
echo ""

# Add route to VM subnet via Host 1
# (Adjust to Host 2 if VMs are on that host)
if ip route show | grep -q '192.168.20.0/24'; then
    echo "    Route to 192.168.20.0/24 already exists:"
    ip route show | grep '192.168.20.0/24'
else
    ip route add 192.168.20.0/24 via 192.168.16.2
    echo "    Added: 192.168.20.0/24 via 192.168.16.2"
fi

# Verify connectivity
echo ""
echo "==> Testing connectivity..."
for IP in 192.168.20.10 192.168.20.20; do
    if ping -c1 -W2 "$IP" &>/dev/null; then
        echo "    $IP — reachable"
    else
        echo "    $IP — not reachable (VM may not be running)"
    fi
done

echo ""
echo "==> To make persistent, add to /etc/network/interfaces or NetworkManager:"
echo "    # /etc/network/interfaces (if using):"
echo "    up ip route add 192.168.20.0/24 via 192.168.16.2"
echo ""
echo "    # Or via nmcli:"
echo "    nmcli connection modify <conn-name> +ipv4.routes '192.168.20.0/24 192.168.16.2'"
echo "    nmcli connection up <conn-name>"
