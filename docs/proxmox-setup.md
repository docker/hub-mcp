# Proxmox VE Setup Guide

Complete infrastructure-as-code for a 2-host Proxmox cluster with GPU passthrough, VM management, remote access, and file sharing.

## Network Topology

```
┌──────────────────────────────────────────────────────────────────┐
│  LAN: 192.168.16.0/24                                           │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │ Host 1           │  │ Host 2           │  │ ThinkPad      │  │
│  │ 192.168.16.2     │  │ 192.168.16.3     │  │ 192.168.16.10 │  │
│  │ RX 6800 XT 16GB  │  │ GTX 1080 8GB     │  │ (Client)      │  │
│  │                  │  │                  │  │               │  │
│  │ vmbr0 ─ LAN      │  │ vmbr0 ─ LAN      │  │  RDP ──────┐  │  │
│  │ vmbr1 ─ VM-Netz  │  │ vmbr1 ─ VM-Netz  │  │  SPICE ──┐ │  │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────────┼─┼──┘  │
│           │                     │                       │ │     │
└───────────┼─────────────────────┼───────────────────────┼─┼─────┘
            │                     │                       │ │
┌───────────┼─────────────────────┼───────────────────────┼─┼─────┐
│  VM-Netz: 192.168.20.0/24      │                       │ │     │
│           │                     │                       │ │     │
│  ┌────────┴─────────┐  ┌───────┴──────────┐            │ │     │
│  │ Windows VM       │  │ Linux Desktop VM │            │ │     │
│  │ 192.168.20.10    │  │ 192.168.20.20    │            │ │     │
│  │ GPU: RX 6800 XT  │  │ Display: SPICE   │◄───────────┘ │     │
│  │ Access: RDP ◄────┼──┼──────────────────┼──────────────┘     │
│  └──────────────────┘  │                  │                    │
│                        │ Samba Server:    │                    │
│                        │  \\projects       │                    │
│                        │  \\documents      │                    │
│                        └──────────────────┘                    │
└────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
proxmox/
├── network/
│   ├── setup-nat.sh                  # NAT/MASQUERADE (192.168.20.0/24 → WAN)
│   ├── setup-firewall.sh             # PVE firewall rules (cluster + host)
│   ├── harden-ssh.sh                 # SSH hardening (key-only, no root pw)
│   ├── setup-fail2ban.sh             # Fail2Ban for SSH + PVE Web GUI
│   ├── interfaces-host1.example      # /etc/network/interfaces for Host 1
│   └── interfaces-host2.example      # /etc/network/interfaces for Host 2
├── vm-windows/
│   ├── setup-gpu-passthrough.sh      # IOMMU + vfio-pci for RX 6800 XT
│   └── create-windows-vm.sh          # Windows VM with GPU passthrough
├── vm-linux-desktop/
│   └── create-linux-desktop-vm.sh    # Linux Desktop VM (SPICE/QXL)
├── vm-templates/
│   ├── setup-storage.sh              # Storage backends (local-lvm, NFS, ZFS)
│   └── create-cloud-init-template.sh # Cloud-Init base template
├── remote-access/
│   ├── connect-rdp.sh                # RDP to Windows VM (from ThinkPad)
│   ├── connect-spice.sh              # SPICE to Linux VM (from ThinkPad)
│   └── setup-thinkpad-routes.sh      # Route 192.168.20.0/24 on ThinkPad
├── fileserver/
│   ├── setup-samba.sh                # Samba server in Linux VM
│   └── mount-share-thinkpad.sh       # Mount shares on ThinkPad
├── backup/
│   ├── vzdump-backup.sh              # vzdump backup for all VMs/CTs
│   └── install-backup-cronjob.sh     # Cron job for automated backups
└── gpu/
    └── gpu-check.sh                  # GPU passthrough readiness check
```

## Prerequisites

- Proxmox VE 7.x or 8.x on both hosts
- Root access via SSH key
- Windows ISO + VirtIO drivers ISO uploaded to `/var/lib/vz/template/iso/`
- IOMMU enabled in BIOS (VT-d / AMD-Vi)

## Phase 1 — Network & Security (Both Hosts)

```bash
# 1a) Set up NAT for VM network
sudo bash proxmox/network/setup-nat.sh vmbr0 vmbr1 192.168.20.0/24

# 1b) Configure PVE firewall
sudo bash proxmox/network/setup-firewall.sh

# 1c) Harden SSH
sudo bash proxmox/network/harden-ssh.sh     # port 22 (default)
sudo bash proxmox/network/harden-ssh.sh 2222 # or custom port

# 1d) Install Fail2Ban (block after 3 failures, 1h ban)
sudo bash proxmox/network/setup-fail2ban.sh 3 3600
```

## Phase 2 — GPU Passthrough (Host 1 only)

```bash
# 2a) Prepare RX 6800 XT passthrough (REQUIRES REBOOT)
sudo bash proxmox/vm-windows/setup-gpu-passthrough.sh
# → reboot Host 1

# 2b) Verify GPU passthrough
sudo bash proxmox/gpu/gpu-check.sh
```

## Phase 3 — VM Creation

### Windows VM with GPU (Host 1)

```bash
# 3a) Configure storage
sudo bash proxmox/vm-templates/setup-storage.sh

# 3b) Create Windows VM (VMID 100, RX 6800 XT passthrough)
sudo bash proxmox/vm-windows/create-windows-vm.sh 100 win11-workstation

# Inside Windows after install:
# - Install VirtIO guest tools
# - Install AMD GPU drivers
# - Enable Remote Desktop (Settings → System → Remote Desktop)
# - Set IP: 192.168.20.10/24, GW: 192.168.20.1, DNS: 192.168.16.1
```

### Linux Desktop VM (Host 1 or Host 2)

```bash
# 3c) Create Linux Desktop VM (VMID 200, SPICE)
sudo bash proxmox/vm-linux-desktop/create-linux-desktop-vm.sh 200 linux-desktop

# After first boot (via SSH or console):
ssh admin@192.168.20.20
sudo apt update && sudo apt install -y ubuntu-desktop spice-vdagent
sudo reboot
```

## Phase 4 — Remote Access (ThinkPad)

```bash
# 4a) Set up routing on ThinkPad to reach VMs
sudo bash proxmox/remote-access/setup-thinkpad-routes.sh

# 4b) Connect to Windows VM via RDP
bash proxmox/remote-access/connect-rdp.sh 192.168.20.10

# 4c) Connect to Linux Desktop VM via SPICE
bash proxmox/remote-access/connect-spice.sh 192.168.16.2 200
```

## Phase 5 — File Sharing

```bash
# 5a) Set up Samba in the Linux VM (run inside VM)
sudo bash proxmox/fileserver/setup-samba.sh smbuser /srv/projects

# 5b) Mount shares on ThinkPad
sudo bash proxmox/fileserver/mount-share-thinkpad.sh 192.168.20.20

# Access from Windows VM (Explorer):
#   \\192.168.20.20\projects
#   \\192.168.20.20\documents
```

## Phase 6 — Backups

```bash
# 6a) Install daily backup cronjob (02:00)
sudo bash proxmox/backup/install-backup-cronjob.sh daily

# 6b) Manual backup
sudo bash proxmox/backup/vzdump-backup.sh local snapshot 3
```

## Production Architecture Decision

| Component | Host 1 (192.168.16.2) | Host 2 (192.168.16.3) |
|-----------|----------------------|----------------------|
| GPU | RX 6800 XT (16GB) | GTX 1080 (8GB) |
| Role | Windows Workstation + large AI models | Docker + Ollama + 24/7 services |
| VMs | win11-workstation (VMID 100) | Docker host, Linux services |
| Access | RDP from ThinkPad | SSH + Portainer |

**Recommended separation:** Host 1 for interactive work (Windows + GPU), Host 2 for always-on services (Docker, Ollama, APIs). This keeps workstation reboots independent of service availability.
