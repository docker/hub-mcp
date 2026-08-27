#!/usr/bin/env bash
# gpu-check.sh — Diagnose GPU passthrough readiness on a Proxmox host
# Checks: IOMMU enabled, IOMMU groups, GPU detection, vfio-pci binding, NVIDIA VRAM.
#
# Usage: sudo bash gpu-check.sh

set -euo pipefail

PASS="\033[0;32m[PASS]\033[0m"
FAIL="\033[0;31m[FAIL]\033[0m"
WARN="\033[0;33m[WARN]\033[0m"
INFO="\033[0;34m[INFO]\033[0m"

echo "============================================"
echo "  GPU Passthrough Readiness Check"
echo "============================================"
echo ""

# --- 1. Check IOMMU enabled in kernel ---
echo -e "$INFO Checking IOMMU kernel support..."
if dmesg | grep -qi 'IOMMU enabled\|DMAR.*IOMMU\|AMD-Vi.*enabled'; then
    echo -e "$PASS IOMMU is enabled in the kernel."
else
    echo -e "$FAIL IOMMU does not appear to be enabled."
    echo "      Add 'intel_iommu=on iommu=pt' (Intel) or 'amd_iommu=on iommu=pt' (AMD)"
    echo "      to GRUB_CMDLINE_LINUX_DEFAULT in /etc/default/grub, then:"
    echo "      update-grub && reboot"
fi
echo ""

# --- 2. Check for VT-d / AMD-Vi in dmesg ---
echo -e "$INFO Checking IOMMU dmesg output..."
dmesg | grep -iE 'DMAR|IOMMU|AMD-Vi' | head -10
echo ""

# --- 3. List IOMMU groups ---
echo -e "$INFO IOMMU Groups:"
IOMMU_BASE="/sys/kernel/iommu_groups"
if [[ -d "$IOMMU_BASE" ]] && [[ $(ls "$IOMMU_BASE" 2>/dev/null | wc -l) -gt 0 ]]; then
    for g in "$IOMMU_BASE"/*/; do
        GROUP_ID=$(basename "$g")
        DEVICES=""
        for d in "$g"devices/*/; do
            if [[ -e "$d" ]]; then
                DEV_ID=$(basename "$d")
                DEV_DESC=$(lspci -nns "$DEV_ID" 2>/dev/null || echo "unknown")
                DEVICES="$DEVICES\n      $DEV_DESC"
            fi
        done
        if echo -e "$DEVICES" | grep -qi 'vga\|3d\|display\|nvidia\|amd.*radeon'; then
            echo -e "  Group $GROUP_ID (GPU detected):$DEVICES"
        fi
    done
    echo ""
    echo -e "$PASS IOMMU groups are formed."
else
    echo -e "$FAIL No IOMMU groups found. IOMMU may not be enabled."
fi
echo ""

# --- 4. Detect GPUs via lspci ---
echo -e "$INFO Detected GPUs (lspci):"
GPU_LIST=$(lspci -nn | grep -iE 'vga|3d|display' || true)
if [[ -n "$GPU_LIST" ]]; then
    echo "$GPU_LIST"
    echo -e "$PASS GPU(s) detected."
else
    echo -e "$WARN No discrete GPU detected via lspci."
fi
echo ""

# --- 5. Check vfio-pci driver binding ---
echo -e "$INFO Checking vfio-pci driver bindings..."
VFIO_BOUND=false
for dev_path in /sys/bus/pci/drivers/vfio-pci/*/; do
    if [[ -e "$dev_path" ]]; then
        DEV=$(basename "$dev_path")
        DESC=$(lspci -nns "$DEV" 2>/dev/null || echo "unknown")
        echo "      $DESC"
        VFIO_BOUND=true
    fi
done
if $VFIO_BOUND; then
    echo -e "$PASS GPU(s) bound to vfio-pci driver."
else
    echo -e "$WARN No devices bound to vfio-pci."
    echo "      To bind a GPU, add its PCI IDs to /etc/modprobe.d/vfio.conf:"
    echo "      options vfio-pci ids=10de:xxxx,10de:yyyy"
    echo "      Then: update-initramfs -u && reboot"
fi
echo ""

# --- 6. Check NVIDIA VRAM (if nvidia-smi available) ---
echo -e "$INFO Checking NVIDIA GPU VRAM (nvidia-smi)..."
if command -v nvidia-smi &>/dev/null; then
    nvidia-smi --query-gpu=index,name,memory.total,memory.free,driver_version \
        --format=csv,noheader,nounits 2>/dev/null | while IFS=',' read -r idx name mem_total mem_free driver; do
        echo "      GPU $idx: $name — VRAM: ${mem_total}MiB total, ${mem_free}MiB free — Driver: $driver"
    done
    echo -e "$PASS NVIDIA driver loaded and reporting."
else
    echo -e "$INFO nvidia-smi not available (expected if GPU is passed through to VM)."
fi
echo ""

# --- 7. Kernel modules check ---
echo -e "$INFO Loaded GPU-related kernel modules:"
lsmod | grep -iE 'vfio|nvidia|nouveau|radeon|amdgpu|i915' || echo "      (none found)"
echo ""

echo "============================================"
echo "  GPU Check Complete"
echo "============================================"
