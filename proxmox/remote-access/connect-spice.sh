#!/usr/bin/env bash
# connect-spice.sh — Connect to a Linux Desktop VM via SPICE
#
# Requires: virt-viewer installed on ThinkPad
#   sudo apt install virt-viewer
#
# Usage: bash connect-spice.sh [PVE_HOST] [VMID] [PVE_USER]
#
# This script uses the Proxmox API to generate a SPICE connection file
# and opens it with remote-viewer.

set -euo pipefail

PVE_HOST="${1:-192.168.16.2}"
VMID="${2:-200}"
PVE_USER="${3:-root@pam}"
PVE_PORT="8006"

echo "==> Connecting to VM $VMID via SPICE"
echo "    PVE Host:  $PVE_HOST"
echo "    VMID:      $VMID"
echo ""

# Check remote-viewer
if ! command -v remote-viewer &>/dev/null; then
    echo "ERROR: remote-viewer not found."
    echo "Install with: sudo apt install virt-viewer"
    exit 1
fi

# Prompt for password
read -rsp "Enter password for $PVE_USER: " PVE_PASS
echo ""

# Get API ticket
echo "==> Authenticating..."
AUTH_RESPONSE=$(curl -s -k -d "username=$PVE_USER&password=$PVE_PASS" \
    "https://$PVE_HOST:$PVE_PORT/api2/json/access/ticket")

TICKET=$(echo "$AUTH_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['ticket'])" 2>/dev/null)
CSRF=$(echo "$AUTH_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['CSRFPreventionToken'])" 2>/dev/null)

if [[ -z "$TICKET" ]]; then
    echo "ERROR: Authentication failed."
    exit 1
fi

# Request SPICE proxy config
NODE=$(curl -s -k -b "PVEAuthCookie=$TICKET" \
    "https://$PVE_HOST:$PVE_PORT/api2/json/nodes" | \
    python3 -c "import sys,json; print(json.load(sys.stdin)['data'][0]['node'])" 2>/dev/null)

echo "==> Requesting SPICE configuration from node '$NODE'..."
SPICE_RESPONSE=$(curl -s -k -b "PVEAuthCookie=$TICKET" \
    -H "CSRFPreventionToken: $CSRF" \
    -X POST \
    "https://$PVE_HOST:$PVE_PORT/api2/json/nodes/$NODE/qemu/$VMID/spiceproxy")

# Create .vv file
VV_FILE="/tmp/pve-spice-$VMID.vv"
python3 -c "
import sys, json
data = json.loads('''$SPICE_RESPONSE''')['data']
print('[virt-viewer]')
for k, v in data.items():
    print(f'{k}={v}')
" > "$VV_FILE"

echo "==> Opening SPICE connection..."
remote-viewer "$VV_FILE" &
echo "    Connection file: $VV_FILE"
