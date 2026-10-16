#!/usr/bin/env bash
# setup-gpu-passthrough.sh — Prepare Host 1 for RX 6800 XT GPU passthrough
#
# This script:
#   1. Enables IOMMU in GRUB
#   2. Blacklists the amdgpu/radeon drivers on the host
#   3. Loads vfio-pci and binds the GPU to it
#   4. Updates initramfs
#
# Run on Host 1 (192.168.16.2) — requires reboot after execution.
#
# Usage: sudo bash setup-gpu-passthrough.sh [GPU_IDS]
# Example: sudo bash setup-gpu-passthrough.sh "1002:73bf,1002:ab28"

set -euo pipefail

echo "============================================"
echo "  RX 6800 XT GPU Passthrough Setup"
echo "  Host 1 — 192.168.16.2"
echo "============================================"
echo ""

# --- Detect GPU PCI IDs ---
echo "==> Detecting RX 6800 XT PCI IDs..."
# Look for Navi 21 (RX 6800 XT) vendor:device IDs
GPU_IDS_DETECTED=$(lspci -nn | grep -i 'navi 21\|6800' | grep -oP '\[\K[0-9a-f]{4}:[0-9a-f]{4}' | sort -u | paste -sd',' -)
GPU_IDS="${1:-$GPU_IDS_DETECTED}"

if [[ -z "$GPU_IDS" ]]; then
    echo "ERROR: Could not detect GPU IDs. Provide them manually:"
    echo "  bash setup-gpu-passthrough.sh '1002:73bf,1002:ab28'"
    echo ""
    echo "Find IDs with: lspci -nn | grep -i VGA"
    exit 1
fi

echo "    GPU PCI IDs: $GPU_IDS"
echo ""

# --- Detect CPU vendor for IOMMU ---
CPU_VENDOR=$(grep -m1 'vendor_id' /proc/cpuinfo | awk '{print $3}')
if [[ "$CPU_VENDOR" == "GenuineIntel" ]]; then
    IOMMU_PARAM="intel_iommu=on"
elif [[ "$CPU_VENDOR" == "AuthenticAMD" ]]; then
    IOMMU_PARAM="amd_iommu=on"
else
    echo "WARNING: Unknown CPU vendor '$CPU_VENDOR'. Defaulting to intel_iommu=on"
    IOMMU_PARAM="intel_iommu=on"
fi

# --- 1. Enable IOMMU in GRUB ---
echo "==> Configuring GRUB for IOMMU..."
GRUB_FILE="/etc/default/grub"
GRUB_BACKUP="/etc/default/grub.bak.$(date +%s)"
cp "$GRUB_FILE" "$GRUB_BACKUP"

CURRENT_CMDLINE=$(grep '^GRUB_CMDLINE_LINUX_DEFAULT=' "$GRUB_FILE" | sed 's/GRUB_CMDLINE_LINUX_DEFAULT="\(.*\)"/\1/')

# Add IOMMU params if not already present
NEW_CMDLINE="$CURRENT_CMDLINE"
for param in "$IOMMU_PARAM" "iommu=pt"; do
    if ! echo "$NEW_CMDLINE" | grep -q "$param"; then
        NEW_CMDLINE="$NEW_CMDLINE $param"
    fi
done
NEW_CMDLINE=$(echo "$NEW_CMDLINE" | sed 's/^ *//')

sed -i "s|^GRUB_CMDLINE_LINUX_DEFAULT=.*|GRUB_CMDLINE_LINUX_DEFAULT=\"$NEW_CMDLINE\"|" "$GRUB_FILE"
echo "    GRUB_CMDLINE_LINUX_DEFAULT=\"$NEW_CMDLINE\""

# --- 2. Load VFIO modules early ---
echo "==> Configuring VFIO modules..."
cat > /etc/modules-load.d/vfio.conf <<EOF
vfio
vfio_iommu_type1
vfio_pci
EOF

# --- 3. Bind GPU to vfio-pci ---
echo "==> Binding GPU IDs to vfio-pci..."
cat > /etc/modprobe.d/vfio.conf <<EOF
options vfio-pci ids=$GPU_IDS
softdep amdgpu pre: vfio-pci
softdep radeon pre: vfio-pci
EOF

# --- 4. Blacklist AMD GPU drivers on host ---
echo "==> Blacklisting AMD GPU drivers on host..."
cat > /etc/modprobe.d/blacklist-gpu.conf <<EOF
# Prevent host from claiming the RX 6800 XT
blacklist amdgpu
blacklist radeon
EOF

# --- 5. Update initramfs and GRUB ---
echo "==> Updating initramfs..."
update-initramfs -u -k all

echo "==> Updating GRUB..."
update-grub

echo ""
echo "============================================"
echo "  GPU Passthrough Setup Complete"
echo "============================================"
echo ""
echo "  GPU IDs:     $GPU_IDS"
echo "  IOMMU:       $IOMMU_PARAM iommu=pt"
echo "  Driver:      vfio-pci"
echo "  Blacklisted: amdgpu, radeon"
echo ""
echo "  GRUB backup: $GRUB_BACKUP"
echo ""
echo "  >>> REBOOT REQUIRED <<<"
echo "  After reboot, verify with:"
echo "    dmesg | grep -i vfio"
echo "    lspci -nnk | grep -A3 'VGA'"
echo "    bash proxmox/gpu/gpu-check.sh"
echo ""
