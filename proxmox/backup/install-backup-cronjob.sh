#!/usr/bin/env bash
# install-backup-cronjob.sh — Install a cron job for automated VM backups
#
# Usage: sudo bash install-backup-cronjob.sh [SCHEDULE]
#
# SCHEDULE examples:
#   daily   — Every day at 02:00 (default)
#   weekly  — Every Sunday at 03:00
#   custom  — Prompts for a custom cron expression

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP_SCRIPT="$SCRIPT_DIR/vzdump-backup.sh"
CRON_FILE="/etc/cron.d/proxmox-backup"
SCHEDULE="${1:-daily}"

echo "==> Installing backup cronjob"
echo "    Schedule: $SCHEDULE"
echo "    Script:   $BACKUP_SCRIPT"

# Ensure the backup script is executable
chmod +x "$BACKUP_SCRIPT"

case "$SCHEDULE" in
    daily)
        CRON_EXPR="0 2 * * *"
        ;;
    weekly)
        CRON_EXPR="0 3 * * 0"
        ;;
    custom)
        read -rp "Enter cron expression (e.g., '0 4 * * 1,4'): " CRON_EXPR
        ;;
    *)
        echo "ERROR: Unknown schedule '$SCHEDULE'. Use: daily, weekly, or custom."
        exit 1
        ;;
esac

# Write the cron file
cat > "$CRON_FILE" <<EOF
# Proxmox VE automated backup
# Schedule: $SCHEDULE ($CRON_EXPR)
# Installed: $(date -Iseconds)
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
MAILTO=root

$CRON_EXPR root $BACKUP_SCRIPT local snapshot 3 >> /var/log/proxmox-backup-cron.log 2>&1
EOF

chmod 644 "$CRON_FILE"

echo "==> Cronjob installed: $CRON_FILE"
echo "    Expression: $CRON_EXPR"
echo ""
echo "Verify with: cat $CRON_FILE"
echo "Check logs:  tail -f /var/log/proxmox-backup-cron.log"
