#!/usr/bin/env bash
# create-windows-vm.sh — Create a Windows VM on Host 1 with RX 6800 XT passthrough
#
# This script creates a Windows 10/11 VM optimized for GPU passthrough.
# Run on Host 1 (192.168.16.2) where the RX 6800 XT is installed.
#
# Prerequisites:
#   - Windows ISO uploaded to /var/lib/vz/template/iso/
#   - VirtIO drivers ISO: https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/
#   - IOMMU enabled (intel_iommu=on / amd_iommu=on)
#   - RX 6800 XT bound to vfio-pci (see setup-gpu-passthrough.sh)
#
# Usage: sudo bash create-windows-vm.sh [VMID] [VM_NAME] [WIN_ISO] [VIRTIO_ISO]

set -euo pipefail

VMID="${1:-100}"
VM_NAME="${2:-win11-workstation}"
WIN_ISO="${3:-local:iso/Win11_23H2_German_x64.iso}"
VIRTIO_ISO="${4:-local:iso/virtio-win.iso}"
STORAGE="local-lvm"
BRIDGE="vmbr1"
VM_IP="192.168.20.10"

echo "============================================"
echo "  Windows VM with GPU Passthrough"
echo "============================================"
echo "  VMID:    $VMID"
echo "  Name:    $VM_NAME"
echo "  Host:    192.168.16.2 (Host 1)"
echo "  VM IP:   $VM_IP (vmbr1)"
echo "  GPU:     RX 6800 XT (passthrough)"
echo "============================================"
echo ""

# Destroy existing VM with same ID
if qm status "$VMID" &>/dev/null; then
    echo "==> Destroying existing VM $VMID..."
    qm destroy "$VMID" --purge
fi

# --- Detect RX 6800 XT PCI addresses ---
echo "==> Detecting RX 6800 XT PCI addresses..."
GPU_VGA=$(lspci -nn | grep -i 'navi 21' | grep -i 'vga\|display' | awk '{print $1}' | head -1)
GPU_AUDIO=$(lspci -nn | grep -i 'navi 21' | grep -i 'audio' | awk '{print $1}' | head -1)

if [[ -z "$GPU_VGA" ]]; then
    # Fallback: search for any RX 6800
    GPU_VGA=$(lspci -nn | grep -i '6800' | grep -i 'vga\|display' | awk '{print $1}' | head -1)
    GPU_AUDIO=$(lspci -nn | grep -i '6800' | grep -i 'audio' | awk '{print $1}' | head -1)
fi

if [[ -z "$GPU_VGA" ]]; then
    echo "ERROR: Could not detect RX 6800 XT. Check lspci output."
    echo "       You can manually set GPU_VGA and GPU_AUDIO in this script."
    exit 1
fi

echo "    GPU VGA:   $GPU_VGA"
echo "    GPU Audio: $GPU_AUDIO"

# --- Create VM ---
echo "==> Creating VM..."
qm create "$VMID" \
    --name "$VM_NAME" \
    --ostype win11 \
    --machine q35 \
    --bios ovmf \
    --efidisk0 "$STORAGE:1,efitype=4m,pre-enrolled-keys=1" \
    --tpmstate0 "$STORAGE:1,version=v2.0" \
    --memory 16384 \
    --balloon 0 \
    --cores 8 \
    --sockets 1 \
    --cpu host,hidden=1 \
    --scsihw virtio-scsi-single \
    --net0 "virtio,bridge=$BRIDGE" \
    --agent enabled=1

# --- Disks ---
echo "==> Adding disks..."
# OS disk (100GB SSD)
qm set "$VMID" --scsi0 "$STORAGE:100,iothread=1,ssd=1,discard=on"
# Windows ISO
qm set "$VMID" --ide0 "$WIN_ISO,media=cdrom"
# VirtIO drivers ISO
qm set "$VMID" --ide1 "$VIRTIO_ISO,media=cdrom"
# Boot order: CD first for installation, then disk
qm set "$VMID" --boot order="ide0;scsi0"

# --- GPU Passthrough ---
echo "==> Configuring GPU passthrough..."
HOSTPCI_ARGS="$GPU_VGA,pcie=1,x-vga=1"
qm set "$VMID" --hostpci0 "$HOSTPCI_ARGS"
if [[ -n "$GPU_AUDIO" ]]; then
    qm set "$VMID" --hostpci1 "$GPU_AUDIO,pcie=1"
fi

# Disable default display (GPU takes over)
qm set "$VMID" --vga none

# --- USB passthrough for keyboard/mouse (optional) ---
# Uncomment and adjust if needed:
# qm set "$VMID" --usb0 host=046d:c52b   # Logitech receiver
# qm set "$VMID" --usb1 host=1532:006e   # Razer keyboard

echo ""
echo "============================================"
echo "  VM $VMID ($VM_NAME) created successfully"
echo "============================================"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Start VM and install Windows:"
echo "   qm start $VMID"
echo "   (Use Proxmox console for initial install — VGA output goes to GPU)"
echo ""
echo "2. During Windows install, load VirtIO drivers:"
echo "   Browse to D:\\amd64\\w11\\ for storage driver"
echo "   Browse to D:\\NetKVM\\w11\\amd64\\ for network driver"
echo ""
echo "3. After install, inside Windows:"
echo "   a) Install VirtIO guest tools (D:\\virtio-win-guest-tools.exe)"
echo "   b) Install AMD GPU drivers"
echo "   c) Enable Remote Desktop:"
echo "      Settings → System → Remote Desktop → ON"
echo "   d) Set static IP: $VM_IP/24, Gateway: 192.168.20.1, DNS: 192.168.16.1"
echo ""
echo "4. Change boot order after install:"
echo "   qm set $VMID --boot order=scsi0"
echo ""
echo "5. Connect from ThinkPad (192.168.16.10):"
echo "   xfreerdp /v:$VM_IP /u:Administrator /dynamic-resolution"
echo ""
