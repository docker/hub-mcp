#!/usr/bin/env bash
# mount-share-thinkpad.sh — Mount Samba shares on the ThinkPad
#
# Run on ThinkPad (192.168.16.10) to mount shared folders from the
# Linux file server VM (192.168.20.20).
#
# Usage: sudo bash mount-share-thinkpad.sh [SERVER_IP] [SHARE_USER]

set -euo pipefail

SERVER_IP="${1:-192.168.20.20}"
SHARE_USER="${2:-smbuser}"

echo "==> Mounting Samba shares from $SERVER_IP"

# Install cifs-utils if needed
if ! command -v mount.cifs &>/dev/null; then
    apt-get install -y -qq cifs-utils
fi

# Create mount points
mkdir -p /mnt/{projects,documents,backups}

# Create credentials file
CRED_FILE="/root/.smbcredentials"
if [[ ! -f "$CRED_FILE" ]]; then
    read -rsp "Enter Samba password for $SHARE_USER: " SMB_PASS
    echo ""
    cat > "$CRED_FILE" <<EOF
username=$SHARE_USER
password=$SMB_PASS
EOF
    chmod 600 "$CRED_FILE"
    echo "    Credentials saved to $CRED_FILE"
fi

# Mount shares
CURRENT_UID=$(id -u "${SUDO_USER:-$(whoami)}")
CURRENT_GID=$(id -g "${SUDO_USER:-$(whoami)}")

for SHARE in projects documents backups; do
    if mountpoint -q "/mnt/$SHARE"; then
        echo "    /mnt/$SHARE already mounted"
    else
        mount -t cifs "//$SERVER_IP/$SHARE" "/mnt/$SHARE" \
            -o credentials="$CRED_FILE",uid="$CURRENT_UID",gid="$CURRENT_GID",iocharset=utf8
        echo "    /mnt/$SHARE mounted"
    fi
done

echo ""
echo "==> Shares mounted:"
df -h /mnt/projects /mnt/documents /mnt/backups 2>/dev/null

echo ""
echo "==> To make persistent, add to /etc/fstab:"
for SHARE in projects documents backups; do
    echo "    //$SERVER_IP/$SHARE /mnt/$SHARE cifs credentials=$CRED_FILE,uid=$CURRENT_UID,gid=$CURRENT_GID,iocharset=utf8,_netdev 0 0"
done
