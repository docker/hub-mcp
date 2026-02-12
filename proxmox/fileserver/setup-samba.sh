#!/usr/bin/env bash
# setup-samba.sh — Set up a Samba file server in a Linux VM
#
# Creates shared directories accessible from Windows VMs and the ThinkPad.
# Run inside the Linux VM (e.g., 192.168.20.20).
#
# Access from Windows:  \\192.168.20.20\projects
# Access from Linux:    mount -t cifs //192.168.20.20/projects /mnt/projects -o user=smbuser
#
# Usage: sudo bash setup-samba.sh [SHARE_USER] [SHARE_DIR]

set -euo pipefail

SHARE_USER="${1:-smbuser}"
SHARE_DIR="${2:-/srv/projects}"

echo "============================================"
echo "  Samba File Server Setup"
echo "============================================"
echo "  Share user:  $SHARE_USER"
echo "  Share dir:   $SHARE_DIR"
echo "============================================"
echo ""

# Install Samba
echo "==> Installing Samba..."
apt-get update -qq
apt-get install -y -qq samba samba-common

# Create share directory
echo "==> Creating share directory: $SHARE_DIR"
mkdir -p "$SHARE_DIR"/{documents,projects,iso-images,backups}

# Create the share user (system user + Samba user)
if ! id "$SHARE_USER" &>/dev/null; then
    useradd -M -s /usr/sbin/nologin "$SHARE_USER"
    echo "    System user '$SHARE_USER' created"
fi

echo "==> Set Samba password for '$SHARE_USER':"
smbpasswd -a "$SHARE_USER"
smbpasswd -e "$SHARE_USER"

# Set ownership
chown -R "$SHARE_USER":"$SHARE_USER" "$SHARE_DIR"
chmod -R 2775 "$SHARE_DIR"

# Backup existing config
cp /etc/samba/smb.conf /etc/samba/smb.conf.bak.$(date +%s)

# Write Samba config
cat > /etc/samba/smb.conf <<EOF
[global]
workgroup = WORKGROUP
server string = Proxmox File Server
security = user
map to guest = never
dns proxy = no
log file = /var/log/samba/log.%m
max log size = 1000
server role = standalone server

# Performance tuning
socket options = TCP_NODELAY IPTOS_LOWDELAY
read raw = yes
write raw = yes
use sendfile = yes
aio read size = 16384
aio write size = 16384

[projects]
comment = Shared Projects
path = $SHARE_DIR/projects
browseable = yes
writable = yes
valid users = $SHARE_USER
create mask = 0664
directory mask = 2775
force user = $SHARE_USER

[documents]
comment = Shared Documents
path = $SHARE_DIR/documents
browseable = yes
writable = yes
valid users = $SHARE_USER
create mask = 0664
directory mask = 2775
force user = $SHARE_USER

[backups]
comment = Backup Storage
path = $SHARE_DIR/backups
browseable = yes
writable = yes
valid users = $SHARE_USER
create mask = 0664
directory mask = 2775
force user = $SHARE_USER
EOF

# Test config
echo "==> Testing Samba configuration..."
testparm -s /etc/samba/smb.conf

# Enable and restart
systemctl enable smbd nmbd
systemctl restart smbd nmbd

# Open firewall if ufw is active
if command -v ufw &>/dev/null && ufw status | grep -q 'active'; then
    ufw allow samba
    echo "    UFW: Samba ports allowed"
fi

echo ""
echo "============================================"
echo "  Samba File Server Ready"
echo "============================================"
echo ""
echo "  Shares:"
echo "    \\\\$(hostname -I | awk '{print $1}')\\projects"
echo "    \\\\$(hostname -I | awk '{print $1}')\\documents"
echo "    \\\\$(hostname -I | awk '{print $1}')\\backups"
echo ""
echo "  Connect from Windows (Explorer address bar):"
echo "    \\\\192.168.20.20\\projects"
echo ""
echo "  Connect from Linux (ThinkPad):"
echo "    sudo mount -t cifs //192.168.20.20/projects /mnt/projects -o user=$SHARE_USER"
echo ""
echo "  Or add to /etc/fstab:"
echo "    //192.168.20.20/projects /mnt/projects cifs credentials=/root/.smbcredentials,uid=1000 0 0"
echo ""
