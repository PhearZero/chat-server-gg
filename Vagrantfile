# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.


# NOTES:
# Nanode 1GB 1
# 2GB 1
# 4GB 2 vCPU
# 8GB


# Size of the current cluster
CLUSTER_SIZE=1
REDIS_NODES_SIZE=2

# Setup the VM's subdomain based FQDN
DOMAIN_NAME="access.local"
SUBDOMAIN_SEPARATOR="-"

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vagrant.plugins = ["vagrant-hostmanager"]

  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.manage_guest = true

  # Disable Shared Folder
  config.vm.synced_folder ".", "/vagrant", disabled: true

  config.vm.provider "virtualbox" do |v|
    v.linked_clone = true
    v.memory = 1024
    v.cpus = 1
  end

  # NGINX Load Balancer Stand-in
  config.vm.define "nginx" do |nginx|
    # Setup Backends Template
    tpl = %{
upstream backends {
  least_conn;
  ip_hash;
--
}
    }
    # Template path to generate to
    tpl_path = "./services/nginx/nginx-backends.conf"

    # Contain all WSS Backends
    tpl_partial = ""
    (1..CLUSTER_SIZE).each do |i|
      tpl_partial += "  server wss#{SUBDOMAIN_SEPARATOR}#{i}.#{DOMAIN_NAME}:9001;"
    end

    # Write Template to Conf File
    File.open(tpl_path, "w") {|file| file.puts tpl.gsub(/--/, tpl_partial) }

    nginx.vm.hostname = "#{DOMAIN_NAME}"
    nginx.vm.network "forwarded_port", guest: 80, host: 8080
    nginx.vm.provision "shell", inline: "apt-get update && apt-get install nginx -y"
    nginx.vm.provision "file", source: "./services/nginx", destination: "/tmp/nginx"
    nginx.vm.provision "shell", inline: "mv /tmp/nginx/default.conf /etc/nginx/sites-available/default && mv /tmp/nginx/nginx-backends.conf /etc/nginx/conf.d/backends.conf"
    nginx.vm.provision "shell", inline: "service nginx restart"
  end


  # Redis Sentinel/Request Layer
  config.vm.define "redis" do |node|
    node.vm.hostname = "redis.#{DOMAIN_NAME}"
    node.vm.network :private_network, ip: "192.168.42.60"
    node.vm.provision "shell", inline: "apt-get update && apt-get install redis"
  end

  # Redis Memory Store Nodes
  (1..REDIS_NODES_SIZE).each do |i|
    subdomain = "redis-node-#{SUBDOMAIN_SEPARATOR}#{i}"
    config.vm.define subdomain do |node|
      node.vm.hostname = "#{subdomain}.#{DOMAIN_NAME}"
      node.vm.network :private_network, ip: "192.168.42.#{i+61}"
      node.vm.provision "shell", inline: "apt-get update && apt-get install redis"
    end
  end

  # Web Socket Server + API
   (1..CLUSTER_SIZE).each do |i|
      subdomain = "wss#{SUBDOMAIN_SEPARATOR}#{i}"
      config.vm.define subdomain do |node|
        node.vm.hostname = "#{subdomain}.#{DOMAIN_NAME}"
        node.vm.network :private_network, ip: "192.168.42.#{i+120}"
        node.vm.provision "shell", inline: "apt-get update && apt-get install build-essential -y"
        node.vm.provision "shell", privileged: false, inline: "rm -rf /home/vagrant/apps/chat-server"
        node.vm.provision "file", source: "./src", destination: "~/apps/chat-server/"
        node.vm.provision "file", source: "./server.js", destination: "~/apps/chat-server/server.js"
        node.vm.provision "file", source: "./npm-setup.sh", destination: "~/apps/chat-server/npm-setup.sh"
        node.vm.provision "file", source: "./package.json", destination: "~/apps/chat-server/package.json"
        node.vm.provision "file", source: "./package-lock.json", destination: "~/apps/chat-server/package-lock.json"
        node.vm.provision "shell", privileged: false, inline: "cd ~/apps/chat-server && chmod +x npm-setup.sh && ./npm-setup.sh && (npm start&)"
      end
   end

  # Worker Server
  # TODO: Single instance with Nodejs scaled to thread size

  # Redis Cluster
  # TODO: N number redis nodes in Cluster configuration

  # Database instance
  # TODO: Single instance non-partitioned Couchdb for now
  # Just an example can be any Long Term Storage

  # Configure interface for internal traffic
  # config.vm.network "private_network", type: "dhcp"
  # Launch a set number of nodes


    # (1..CLUSTER_SIZE).each do |i|
    #   config.vm.define nodeName = "redis#{SUBDOMAIN_SEPARATOR}#{i}" do |node|
    #     node.vm.hostname = "#{nodeName}.#{DOMAIN_NAME}"
    #     node.vm.provision "shell", inline: "echo hi"
    #   end
    # end
    #
    # (1..CLUSTER_SIZE).each do |i|
    #   config.vm.define nodeName = "worker#{SUBDOMAIN_SEPARATOR}#{i}" do |node|
    #     node.vm.hostname = "#{nodeName}.#{DOMAIN_NAME}"
    #     node.vm.provision "shell", inline: "echo hi"
    #   end
    # end
    # (1..CLUSTER_SIZE).each do |i|
    #   config.vm.define nodeName = "database#{SUBDOMAIN_SEPARATOR}#{i}" do |node|
    #     node.vm.hostname = "#{nodeName}.#{DOMAIN_NAME}"
    #     node.vm.provision "shell", inline: "echo hi"
    #   end
    # end
end
