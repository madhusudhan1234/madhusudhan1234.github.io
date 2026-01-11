---
title: 'Getting Started with Ansible'
description: 'Learn how to get started with Ansible automation through a practical example of PHP installation using Ansible playbooks.'
pubDate: 'March 13 2025'
heroImage: 'images/blogs/ansible.png'
---

Ansible is a powerful automation tool that simplifies task automation on remote servers. Being agentless, it doesn't require any agent installation on the server - a simple SSH connection from the host to the servers suffices.

In this article, we'll explore getting started with Ansible through a practical example of PHP installation using Ansible playbooks.

### Prerequisites

Follow the Ansible installation guide using this [link](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).

The directory structure for playbooks and configuration should look like this:

```plaintext
your-folder-name/
├── ansible.cfg
├── inventory/
│   └── hosts
├── playbooks/
│   └── provision.yml
└── roles/
    ├── common/
    │   ├── tasks/
    │   │   └── main.yml
    │   ├── vars/
    │   │   └── main.yml
    │   └── README.md
    ├── php/
    │   ├── tasks/
    │   │   └── main.yml
    │   ├── handlers/
    │   │   └── main.yml
    │   ├── vars/
    │   │   └── main.yml
    │   └── README.md
    └── README.md
```

### Configuration

First, define the server host machines and ensure they are accessible via SSH. Set up the necessary SSH configuration using private/public keys, then specify the hosts in the inventory/hosts file like this:

inventory/hosts
```ini
[web_servers]
your-host-ip # for example: 192.168.1.10
```

Define the ansible.cfg file like this:

ansible.cfg
```ini
[defaults]
inventory = inventory/hosts
remote_user = ubuntu
host_key_checking = False
roles_path = roles
ask_vault_pass = True
ask_become_pass = True
```

Here is the breakdown of the ansible.cfg settings:

1. `inventory = inventory/hosts`
    - Specifies the location of the inventory file that contains server IPs and groups
    - In this case, Ansible will use inventory/hosts as the default inventory

2. `remote_user = ubuntu`
    - Defines the default SSH user for connecting to remote servers
    - If not overridden in the inventory file, Ansible will use ubuntu as the SSH user

3. `host_key_checking = False`
    - Disables SSH host key verification
    - Prevents SSH from prompting for key confirmation when connecting to new servers
    - Useful for automation but not recommended for production (security risk)

4. `roles_path = roles`
    - Defines the default directory for Ansible roles
    - When using roles in playbooks, Ansible will look for them in the roles/ directory

5. `ask_vault_pass = True`
    - Prompts the user for the Ansible Vault password when running encrypted files
    - Required if using encrypted variables or files (ansible-vault)
    - If you're using encrypted files or variables (with Ansible Vault), this option prompts for the vault password
    
6. `ask_become_pass = True`
    - Prompts for the sudo password (become password) when running tasks that require root privileges
    - Useful when running Ansible without a passwordless sudo setup
    - This option will prompt for the sudo password when running tasks requiring elevated privileges

Ansible uses simple, human-readable scripts called playbooks to automate tasks. Now add the playbook file in the following location:

playbooks/provision.yml
```yaml
- name: Provision PHP
  hosts: web_servers
  become: true

  pre_tasks:
    - name: Update apt cache and upgrade packages
      apt:
        update_cache: yes
        upgrade: dist
        cache_valid_time: 3600
      register: apt_upgrade

    - name: Reboot if required
      reboot:
        msg: "Reboot required after system upgrade"
        connect_timeout: 5
        reboot_timeout: 300
        pre_reboot_delay: 0
        post_reboot_delay: 30
      when: apt_upgrade.changed

  roles:
    - common
    - user
    - php
```

Here's a brief explanation of the above playbook:

- `name: Provision PHP`: The name of the playbook
- `hosts: web_servers`: The playbook targets the web_servers group from the inventory file
- `become: true`: The tasks will run with elevated privileges (sudo)
- `pre_tasks`:
    - Update apt cache and upgrade packages: Updates the package cache and upgrades all installed packages using apt
    - Reboot if required: If the system upgrade changes anything, it triggers a reboot
- `roles`: Specifies the roles to execute during the playbook run
    - `common`: Installs common packages and configures the system
    - `user`: Configures user-related settings
    - `php`: Installs PHP and necessary extensions

This configuration ensures the system is updated, reboots if necessary, and then provisions PHP and other common configurations.

The roles/ directory is where Ansible stores reusable automation logic. Each role can have its own tasks, handlers, and variables that are executed as part of the playbook.

Now let's configure the `common` role. This role is mainly useful for common tasks like updating the apt cache, installing packages, setting timezone, etc.

roles/common/tasks/main.yml
```yaml
- name: Install common packages
  apt:
    name:
      - git
      - curl
      - wget
      - zip
      - unzip
      - software-properties-common
      - apt-transport-https
      - ca-certificates
      - gnupg
      - vim
    state: present
    update_cache: yes

- name: Set timezone
  timezone:
    name: "{{ timezone }}"
```

The {{ timezone }} variable is defined in the roles/common/vars/main.yml file:

roles/common/vars/main.yml
```yaml
---
timezone: Asia/Tokyo
```

Now that the common role is ready, let's set up the PHP role in a similar way:

roles/php/tasks/main.yml
```yaml
- name: Install PHP and extensions
  apt:
    name:
      - "php{{ php_version }}"
      - "php{{ php_version }}-fpm"
      - "php{{ php_version }}-mysql"
      - "php{{ php_version }}-xml"
      - "php{{ php_version }}-mbstring"
      - "php{{ php_version }}-curl"
    state: present
    update_cache: yes
  notify: restart php-fpm  
```

This will install PHP and php-fpm (PHP FastCGI Process Manager) and notify the handler to restart php-fpm. The handler is defined like this:

roles/php/handlers/main.yml
```yaml
- name: restart php-fpm
  service:
    name: "php{{ php_version }}-fpm"
    state: restarted
    enabled: yes
```

Set the PHP version in the following variable file:

roles/php/vars/main.yml
```yaml
---
php_version: 8.3
```

If you need to add secret variables, you can use an Ansible vault file. When using a vault file, all secrets are encrypted and securely stored.

Finally, run this command to provision the server:

```bash
ansible-playbook playbooks/provision.yml
```

This is the basic way of using Ansible. For more advanced usage, please check additional resources about Ansible. Creating a README.md file for each role is a best practice to document all necessary details.

### References:
https://docs.ansible.com/ansible/latest/index.html