#!/usr/bin/env bash
# create-linux-desktop-vm.sh — Create a Linux Desktop VM with SPICE display
#
# Creates a lightweight Linux Desktop VM accessible via SPICE from the
# ThinkPad (192.168.16.10) or any machine on the network.
#
# Usage: sudo bash create-linux-desktop-vm.sh [VMID] [VM_NAME] [CLOUD_IMG_URL]

set -euo pipefail

VMID="${1:-200}"
VM_NAME="${2:-linux-desktop}"
IMAGE_URL="${3:-https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img}"
STORAGE="local-lvm"
BRIDGE="vmbr1"
VM_IP="192.168.20.20"

echo "============================================"
echo "  Linux Desktop VM (SPICE)"
echo "============================================"
echo "  VMID:    $VMID"
echo "  Name:    $VM_NAME"
echo "  VM IP:   $VM_IP (vmbr1)"
echo "  Display: SPICE + QXL"
echo "============================================"
echo ""

IMAGE_FILE="/tmp/cloud-image-$(basename "$IMAGE_URL")"

# Download cloud image
if [[ ! -f "$IMAGE_FILE" ]]; then
    echo "==> Downloading cloud image..."
    wget -q --show-progress -O "$IMAGE_FILE" "$IMAGE_URL"
else
    echo "==> Cloud image already cached: $IMAGE_FILE"
fi

# Destroy existing VM
if qm status "$VMID" &>/dev/null; then
    echo "==> Destroying existing VM $VMID..."
    qm destroy "$VMID" --purge
fi

# --- Create VM with SPICE display ---
echo "==> Creating VM..."
qm create "$VMID" \
    --name "$VM_NAME" \
    --ostype l26 \
    --machine q35 \
    --memory 4096 \
    --cores 4 \
    --cpu host \
    --scsihw virtio-scsi-single \
    --net0 "virtio,bridge=$BRIDGE" \
    --agent enabled=1 \
    --vga qxl \
    --tablet 1

# Import disk
echo "==> Importing disk..."
qm set "$VMID" --scsi0 "$STORAGE:0,import-from=$IMAGE_FILE,iothread=1,ssd=1,discard=on"

# Cloud-Init drive
qm set "$VMID" --ide2 "$STORAGE:cloudinit"

# Boot from disk
qm set "$VMID" --boot order=scsi0

# Resize disk to 50GB
echo "==> Resizing disk to 50G..."
qm disk resize "$VMID" scsi0 50G

# SPICE enhancements
qm set "$VMID" --usb0 spice --usb1 spice --usb2 spice

# Cloud-Init: set user, SSH key, network
qm set "$VMID" \
    --ciuser admin \
    --cipassword "changeme" \
    --ipconfig0 "ip=$VM_IP/24,gw=192.168.20.1" \
    --nameserver "192.168.16.1" \
    --searchdomain "local"

echo ""
echo "============================================"
echo "  VM $VMID ($VM_NAME) created"
echo "============================================"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Start the VM:"
echo "   qm start $VMID"
echo ""
echo "2. Install a desktop environment (via SSH or console):"
echo "   ssh admin@$VM_IP"
echo "   sudo apt update && sudo apt install -y ubuntu-desktop spice-vdagent"
echo "   sudo reboot"
echo ""
echo "3. Connect via SPICE from ThinkPad:"
echo "   # Option A: Proxmox Web UI → VM → Console → SPICE"
echo "   # Option B: Download .vv file and open with virt-viewer:"
echo "   remote-viewer spice://192.168.16.2:5900"
echo ""
echo "4. Or install xrdp for RDP access:"
echo "   sudo apt install -y xrdp"
echo "   sudo systemctl enable xrdp"
echo "   xfreerdp /v:$VM_IP /u:admin"
echo ""
