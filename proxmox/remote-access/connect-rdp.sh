#!/usr/bin/env bash
# connect-rdp.sh — Connect to a Windows VM via RDP from the ThinkPad
#
# Requires: xfreerdp (freerdp2-x11) installed on ThinkPad
#   sudo apt install freerdp2-x11
#
# Usage: bash connect-rdp.sh [VM_IP] [USERNAME] [RESOLUTION]
#
# Network topology:
#   ThinkPad (192.168.16.10) → Host 1 (192.168.16.2) → Windows VM (192.168.20.10)
#
# NOTE: ThinkPad needs a route to 192.168.20.0/24 via 192.168.16.2:
#   sudo ip route add 192.168.20.0/24 via 192.168.16.2

set -euo pipefail

VM_IP="${1:-192.168.20.10}"
USERNAME="${2:-Administrator}"
RESOLUTION="${3:-1920x1080}"

echo "==> Connecting to Windows VM via RDP"
echo "    Target:     $VM_IP"
echo "    User:       $USERNAME"
echo "    Resolution: $RESOLUTION"
echo ""

# Check if xfreerdp is installed
if ! command -v xfreerdp &>/dev/null; then
    echo "ERROR: xfreerdp not found."
    echo "Install with: sudo apt install freerdp2-x11"
    exit 1
fi

# Check connectivity
if ! ping -c1 -W2 "$VM_IP" &>/dev/null; then
    echo "WARNING: Cannot reach $VM_IP"
    echo "You may need to add a route:"
    echo "  sudo ip route add 192.168.20.0/24 via 192.168.16.2"
    echo ""
    echo "Attempting connection anyway..."
fi

xfreerdp \
    /v:"$VM_IP" \
    /u:"$USERNAME" \
    /size:"$RESOLUTION" \
    /dynamic-resolution \
    /gfx:AVC444 \
    /network:lan \
    /sound:sys:pulse \
    /microphone:sys:pulse \
    /drive:shared,/home/"$(whoami)"/Shared \
    /clipboard \
    +auto-reconnect \
    /auto-reconnect-max-retries:5 \
    /cert:ignore
