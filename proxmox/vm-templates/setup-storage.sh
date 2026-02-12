#!/usr/bin/env bash
# setup-storage.sh — Configure storage backends on Proxmox VE
# Creates commonly needed storage pools: local-lvm for VMs, and optionally
# a ZFS pool or NFS mount for ISOs and backups.
#
# Usage: sudo bash setup-storage.sh

set -euo pipefail

echo "==> Configuring Proxmox storage backends"

# --- Ensure local-lvm exists and is properly configured ---
if pvesm status | grep -q 'local-lvm'; then
    echo "    local-lvm already exists"
else
    echo "    Creating local-lvm storage (thin LVM on pve/data)"
    pvesm add lvmthin local-lvm \
        --vgname pve \
        --thinpool data \
        --content rootdir,images
    echo "    local-lvm created"
fi

# --- ISO storage on local ---
# Ensure the local storage accepts ISO images and container templates
pvesm set local --content iso,vztmpl,backup,snippets
echo "    local storage configured for iso,vztmpl,backup,snippets"

# --- Create ISO directory if it doesn't exist ---
ISO_DIR="/var/lib/vz/template/iso"
mkdir -p "$ISO_DIR"
echo "    ISO directory ready: $ISO_DIR"

# --- Optional: NFS mount for shared storage ---
# Uncomment and adjust the following to add NFS storage:
# NFS_SERVER="192.168.1.100"
# NFS_EXPORT="/export/pve-storage"
# NFS_MOUNT="nfs-shared"
#
# if ! pvesm status | grep -q "$NFS_MOUNT"; then
#     pvesm add nfs "$NFS_MOUNT" \
#         --server "$NFS_SERVER" \
#         --export "$NFS_EXPORT" \
#         --content images,iso,backup,vztmpl \
#         --options vers=4
#     echo "    NFS storage '$NFS_MOUNT' added"
# fi

# --- Optional: ZFS pool ---
# Uncomment to add a ZFS-backed storage:
# ZFS_POOL="rpool/data"
# ZFS_NAME="local-zfs"
#
# if ! pvesm status | grep -q "$ZFS_NAME"; then
#     pvesm add zfspool "$ZFS_NAME" \
#         --pool "$ZFS_POOL" \
#         --content rootdir,images \
#         --sparse 1
#     echo "    ZFS storage '$ZFS_NAME' added"
# fi

echo ""
echo "==> Current storage status:"
pvesm status
echo ""
echo "==> Storage configuration complete."
echo "    Upload ISOs to: $ISO_DIR"
echo "    Or via Web UI: Datacenter > Storage > local > ISO Images"
