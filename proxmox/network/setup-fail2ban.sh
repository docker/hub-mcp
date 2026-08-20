#!/usr/bin/env bash
# setup-fail2ban.sh — Install and configure Fail2Ban for Proxmox
# Protects SSH and the Proxmox Web GUI against brute-force attacks.
#
# Usage: sudo bash setup-fail2ban.sh [MAX_RETRY] [BAN_TIME]
# Example: sudo bash setup-fail2ban.sh 3 3600

set -euo pipefail

MAX_RETRY="${1:-3}"
BAN_TIME="${2:-3600}"

echo "==> Installing and configuring Fail2Ban"
echo "    Max retries: $MAX_RETRY"
echo "    Ban time:    ${BAN_TIME}s"

# Install fail2ban if not present
if ! command -v fail2ban-server &>/dev/null; then
    apt-get update -qq
    apt-get install -y -qq fail2ban
fi

# --- Proxmox Web GUI filter ---
cat > /etc/fail2ban/filter.d/proxmox-webgui.conf <<'EOF'
[Definition]
failregex = pvedaemon\[.*authentication (verification )?failure; rhost=<HOST> user=\S+ msg=.*
ignoreregex =
journalmatch = _SYSTEMD_UNIT=pvedaemon.service
EOF

# --- Jail configuration ---
cat > /etc/fail2ban/jail.d/proxmox.conf <<EOF
# SSH jail
[sshd]
enabled  = true
port     = ssh
filter   = sshd
backend  = systemd
maxretry = ${MAX_RETRY}
bantime  = ${BAN_TIME}
findtime = 600

# Proxmox Web GUI jail
[proxmox-webgui]
enabled  = true
port     = https,8006
filter   = proxmox-webgui
backend  = systemd
maxretry = ${MAX_RETRY}
bantime  = ${BAN_TIME}
findtime = 600
EOF

# Enable and restart fail2ban
systemctl enable fail2ban
systemctl restart fail2ban

echo "==> Fail2Ban status:"
fail2ban-client status
echo ""
echo "==> Fail2Ban configuration complete."
echo "    Check jail status: fail2ban-client status sshd"
echo "    Check jail status: fail2ban-client status proxmox-webgui"
