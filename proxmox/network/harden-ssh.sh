#!/usr/bin/env bash
# harden-ssh.sh — Harden the OpenSSH server on a Proxmox host
# - Disables root password login (key-only for root)
# - Disables password authentication globally
# - Optionally changes the SSH port
#
# Usage: sudo bash harden-ssh.sh [NEW_PORT]
# Example: sudo bash harden-ssh.sh 2222

set -euo pipefail

SSHD_CONFIG="/etc/ssh/sshd_config"
SSHD_HARDENING="/etc/ssh/sshd_config.d/90-hardening.conf"
NEW_PORT="${1:-}"

echo "==> Hardening SSH configuration"

# Create a drop-in config for hardening (avoids modifying the main config directly)
mkdir -p /etc/ssh/sshd_config.d

cat > "$SSHD_HARDENING" <<EOF
# SSH hardening — managed by setup script
PermitRootLogin prohibit-password
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2
AllowAgentForwarding no
AllowTcpForwarding no
EOF

if [[ -n "$NEW_PORT" ]]; then
    echo "Port $NEW_PORT" >> "$SSHD_HARDENING"
    echo "    SSH port changed to $NEW_PORT"
else
    echo "    SSH port left at default (22)"
fi

echo "    Hardening config written to $SSHD_HARDENING"

# Ensure the main sshd_config includes drop-in configs
if ! grep -q '^Include /etc/ssh/sshd_config.d/\*.conf' "$SSHD_CONFIG" 2>/dev/null; then
    echo 'Include /etc/ssh/sshd_config.d/*.conf' >> "$SSHD_CONFIG"
    echo "    Added Include directive to $SSHD_CONFIG"
fi

# Validate configuration before restarting
if sshd -t; then
    systemctl restart sshd
    echo "==> SSH restarted with hardened configuration."
else
    echo "==> ERROR: sshd config test failed. Reverting."
    rm -f "$SSHD_HARDENING"
    exit 1
fi

echo ""
echo "IMPORTANT: Ensure you have SSH key access before disconnecting!"
echo "  Test with: ssh -p ${NEW_PORT:-22} root@<host>"
