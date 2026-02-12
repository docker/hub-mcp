# Proxmox VE Setup Guide

This document describes the scripts in the `proxmox/` directory and how to use them to set up and harden a Proxmox VE host.

## Directory Structure

```
proxmox/
├── network/
│   ├── setup-nat.sh              # NAT/MASQUERADE for internal VMs
│   ├── setup-firewall.sh         # PVE firewall rules (cluster + host)
│   ├── harden-ssh.sh             # SSH hardening (key-only, disable root pw)
│   └── setup-fail2ban.sh         # Fail2Ban for SSH + PVE Web GUI
├── vm-templates/
│   ├── setup-storage.sh          # Storage backends (local-lvm, NFS, ZFS)
│   └── create-cloud-init-template.sh  # Cloud-Init VM template
├── backup/
│   ├── vzdump-backup.sh          # vzdump backup for all VMs/CTs
│   └── install-backup-cronjob.sh # Install cron job for automated backups
└── gpu/
    └── gpu-check.sh              # GPU passthrough readiness check
```

## Prerequisites

- Proxmox VE 7.x or 8.x installed
- Root access to the Proxmox host
- SSH key pair for key-based authentication

## Recommended Execution Order

### 1. Network & Security

```bash
# a) Set up NAT for internal VM network
sudo bash proxmox/network/setup-nat.sh vmbr0 vmbr1 10.10.10.0/24

# b) Configure PVE firewall rules
sudo bash proxmox/network/setup-firewall.sh

# c) Harden SSH (optionally change port)
sudo bash proxmox/network/harden-ssh.sh 2222

# d) Install Fail2Ban (block after 3 failures, ban for 1 hour)
sudo bash proxmox/network/setup-fail2ban.sh 3 3600
```

### 2. Storage & VM Templates

```bash
# a) Configure storage backends
sudo bash proxmox/vm-templates/setup-storage.sh

# b) Create a Cloud-Init Ubuntu template (VMID 9000)
sudo bash proxmox/vm-templates/create-cloud-init-template.sh 9000 ubuntu-2204-cloud

# Clone a VM from the template:
qm clone 9000 100 --name my-vm --full
qm set 100 --ciuser myuser --sshkeys ~/.ssh/id_rsa.pub --ipconfig0 ip=10.10.10.100/24,gw=10.10.10.1
qm start 100
```

### 3. Backups

```bash
# a) Install daily backup cronjob (runs at 02:00)
sudo bash proxmox/backup/install-backup-cronjob.sh daily

# b) Or run a manual backup
sudo bash proxmox/backup/vzdump-backup.sh local snapshot 3
```

### 4. GPU Passthrough

```bash
# Check GPU passthrough readiness
sudo bash proxmox/gpu/gpu-check.sh
```

The GPU check script verifies:
- IOMMU is enabled in the kernel
- IOMMU groups are correctly formed
- GPUs are detected via `lspci`
- vfio-pci driver bindings
- NVIDIA VRAM via `nvidia-smi` (if available)

## Customization

- **NAT subnet**: Change the third argument to `setup-nat.sh`
- **SSH port**: Pass desired port to `harden-ssh.sh`
- **Fail2Ban thresholds**: Adjust `MAX_RETRY` and `BAN_TIME` in `setup-fail2ban.sh`
- **Backup schedule**: Use `daily`, `weekly`, or `custom` with `install-backup-cronjob.sh`
- **VM template**: Change the image URL in `create-cloud-init-template.sh` for Debian, Rocky, etc.
- **NFS/ZFS storage**: Uncomment the relevant sections in `setup-storage.sh`
