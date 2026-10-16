#!/usr/bin/env bash
# setup-firewall.sh — Enable and configure the Proxmox VE Firewall
# Applies host-level rules via /etc/pve/local/host.fw and cluster-level
# defaults via /etc/pve/firewall/cluster.fw.
#
# Usage: sudo bash setup-firewall.sh

set -euo pipefail

CLUSTER_FW="/etc/pve/firewall/cluster.fw"
HOST_FW="/etc/pve/local/host.fw"

echo "==> Configuring Proxmox VE Firewall"

# --- Cluster-level firewall config ---
mkdir -p "$(dirname "$CLUSTER_FW")"
cat > "$CLUSTER_FW" <<'EOF'
[OPTIONS]
enable: 1
policy_in: DROP
policy_out: ACCEPT
log_level_in: nolog
log_level_out: nolog

[RULES]
# Allow ICMP (ping)
IN ACCEPT -p icmp
# Allow established/related traffic
IN ACCEPT -m conntrack --ctstate RELATED,ESTABLISHED
# Allow Proxmox Web GUI (port 8006)
IN ACCEPT -p tcp -dport 8006
# Allow SSH
IN ACCEPT -p tcp -dport 22
# Allow SPICE console
IN ACCEPT -p tcp -dport 3128
# Allow VNC console range
IN ACCEPT -p tcp -dport 5900:5999
# Allow Proxmox cluster communication (corosync)
IN ACCEPT -p udp -dport 5405:5412
# Allow live migration
IN ACCEPT -p tcp -dport 60000:60050
EOF

echo "    Cluster firewall written to $CLUSTER_FW"

# --- Host-level firewall config ---
mkdir -p "$(dirname "$HOST_FW")"
cat > "$HOST_FW" <<'EOF'
[OPTIONS]
enable: 1

[RULES]
# Allow SSH from management network only (adjust subnet as needed)
IN ACCEPT -source 10.0.0.0/8 -p tcp -dport 22
# Allow Web GUI from management network
IN ACCEPT -source 10.0.0.0/8 -p tcp -dport 8006
EOF

echo "    Host firewall written to $HOST_FW"
echo "==> Firewall configuration complete."
echo "    Verify in the PVE web UI under Datacenter > Firewall."
