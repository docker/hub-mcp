#!/usr/bin/env bash
# vzdump-backup.sh — Backup all VMs and containers using vzdump
# Designed to be called from a cronjob.
#
# Usage: sudo bash vzdump-backup.sh [STORAGE] [MODE] [MAX_BACKUPS]
#
# MODE: snapshot (default, no downtime), suspend, or stop
# MAX_BACKUPS: number of backups to keep per VM (prune older ones)

set -euo pipefail

STORAGE="${1:-local}"
MODE="${2:-snapshot}"
MAX_BACKUPS="${3:-3}"
LOGFILE="/var/log/vzdump-backup-$(date +%Y%m%d-%H%M%S).log"
MAILTO="${MAILTO:-root}"

echo "==> Starting vzdump backup — $(date)" | tee "$LOGFILE"
echo "    Storage:     $STORAGE" | tee -a "$LOGFILE"
echo "    Mode:        $MODE" | tee -a "$LOGFILE"
echo "    Max backups: $MAX_BACKUPS" | tee -a "$LOGFILE"

# Backup all VMs and containers
vzdump --all \
    --storage "$STORAGE" \
    --mode "$MODE" \
    --compress zstd \
    --prune-backups keep-last="$MAX_BACKUPS" \
    --mailto "$MAILTO" \
    --quiet 2>&1 | tee -a "$LOGFILE"

EXIT_CODE=${PIPESTATUS[0]}

if [[ $EXIT_CODE -eq 0 ]]; then
    echo "==> Backup completed successfully — $(date)" | tee -a "$LOGFILE"
else
    echo "==> ERROR: Backup failed with exit code $EXIT_CODE — $(date)" | tee -a "$LOGFILE"
fi

# Cleanup old log files (keep last 30)
find /var/log -name 'vzdump-backup-*.log' -mtime +30 -delete 2>/dev/null || true

exit $EXIT_CODE
