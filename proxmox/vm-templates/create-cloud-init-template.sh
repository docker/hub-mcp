#!/usr/bin/env bash
# create-cloud-init-template.sh — Download a cloud image and create a
# Cloud-Init-enabled VM template on Proxmox VE.
#
# Usage: sudo bash create-cloud-init-template.sh [VMID] [TEMPLATE_NAME] [IMAGE_URL]
#
# Defaults to Ubuntu 22.04 (Jammy) cloud image.

set -euo pipefail

VMID="${1:-9000}"
TEMPLATE_NAME="${2:-ubuntu-2204-cloud}"
IMAGE_URL="${3:-https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img}"
STORAGE="local-lvm"
BRIDGE="vmbr0"
IMAGE_FILE="/tmp/cloud-image-$(basename "$IMAGE_URL")"

echo "==> Creating Cloud-Init VM Template"
echo "    VMID:     $VMID"
echo "    Name:     $TEMPLATE_NAME"
echo "    Image:    $IMAGE_URL"
echo "    Storage:  $STORAGE"

# Download cloud image
if [[ ! -f "$IMAGE_FILE" ]]; then
    echo "    Downloading cloud image..."
    wget -q --show-progress -O "$IMAGE_FILE" "$IMAGE_URL"
else
    echo "    Cloud image already downloaded: $IMAGE_FILE"
fi

# Destroy existing VM with same ID (if any)
if qm status "$VMID" &>/dev/null; then
    echo "    Destroying existing VM $VMID..."
    qm destroy "$VMID" --purge
fi

# Create VM
echo "    Creating VM..."
qm create "$VMID" \
    --name "$TEMPLATE_NAME" \
    --ostype l26 \
    --memory 2048 \
    --cores 2 \
    --cpu host \
    --net0 "virtio,bridge=$BRIDGE" \
    --scsihw virtio-scsi-single \
    --agent enabled=1

# Import disk
echo "    Importing disk image..."
qm set "$VMID" --scsi0 "$STORAGE:0,import-from=$IMAGE_FILE"

# Add Cloud-Init drive
echo "    Adding Cloud-Init drive..."
qm set "$VMID" --ide2 "$STORAGE:cloudinit"

# Set boot order
qm set "$VMID" --boot order=scsi0

# Set serial console for cloud images
qm set "$VMID" --serial0 socket --vga serial0

# Set default Cloud-Init settings
qm set "$VMID" \
    --ciuser admin \
    --cipassword "changeme" \
    --ipconfig0 ip=dhcp

echo "    Resizing disk to 32G..."
qm disk resize "$VMID" scsi0 32G

# Convert to template
echo "    Converting to template..."
qm template "$VMID"

echo ""
echo "==> Template '$TEMPLATE_NAME' (VMID $VMID) created successfully."
echo ""
echo "Clone with:"
echo "  qm clone $VMID <NEW_VMID> --name <vm-name> --full"
echo ""
echo "Customize Cloud-Init before first boot:"
echo "  qm set <NEW_VMID> --ciuser myuser --sshkeys ~/.ssh/id_rsa.pub --ipconfig0 ip=10.10.10.x/24,gw=10.10.10.1"
