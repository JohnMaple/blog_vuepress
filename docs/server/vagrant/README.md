---
title: 使用 Vagrant 打造跨平台开发环境
description: Vagrant 是一款用来构建虚拟开发环境的工具，非常适合 php/python/ruby/java 这类语言开发 web 应用，“代码在我机子上运行没有问题”这种说辞将成为历史。
featured_media: /icons/vagrant.png
date: 2018-11-18 19:50:21
post: true
comments: true
humanize: false
tags:
- Vagrant
---

# 使用 Vagrant 打造跨平台开发环境
Vagrant 是一款用来构建虚拟开发环境的工具，非常适合 php/python/ruby/java 这类语言开发 web 应用，“代码在我机子上运行没有问题”这种说辞将成为历史。

我们可以通过 Vagrant 封装一个 Linux 的开发环境，分发给团队成员。成员可以在自己喜欢的桌面系统（Mac/Windows/Linux）上开发程序，代码却能统一在封装好的环境里运行。

## 安装
### 安装VirtualBox
[下载地址](https://www.virtualbox.org/wiki/Downloads)

### 安装Vagrant
[下载地址](https://www.vagrantup.com/downloads.html)

## 启动第一台虚拟机
在启动虚拟机之前先简单介绍下 Vagrant box：
- box 是一个打包好的操作系统，是一个后缀名为 .box 的文件，其实是一个压缩包，里面包含了 Vagrant 的配置信息和 VirtualBox 的虚拟机镜像文件。
- vagrant up 启动虚拟机是基于 box 文件的，因此在启动虚拟机前必须得把 box 文件准备好。或者也可以在启动的时候指定远程 box 地址，在这里我把 box 文件下载下来，然后启动时指定该文件。
[官方镜像库](https://app.vagrantup.com/boxes/search)
### 新建一个目录作为 Vagrant 的工程目录
``` sh
mkdir -p vagrant/project_name
cd vagrant/project_name
pwd   # ~/vagrant/project_name 目录位置随便
```
### 初始化镜像
#### 本地备好镜像
一般是基础版的ubuntu，根据你熟悉的操作系统，从镜像库下载下来。

##### 添加本地镜像
- `本地 box 名称`：自定义名称，该名称是本地 vagrant 管理时使用的名称；
- `box 文件`：前面下载的 vagrant box 文件或者远程 box url 地址
``` sh
# vagrant box add <本地 box 名称> <box 文件>
vagrant box add ubuntu-server-16.04 ubuntu-server-16.04-amd64-vagrant.box
```

##### 查看镜像
``` sh
vagrant box list
```

::: tip
接下来的步骤，参照 `使用镜像库初始化`
:::

#### 使用镜像库初始化

##### 初始化镜像
初始化后会在当前目录生产一个 Vagrantfile 文件，里面包含了虚拟机的各种配置
``` sh
# vagrant init <本地 box 名称> 
vagrant init 'ubuntu-server-16.04'
```
> `本地 box 名称`：若本地没有下好的镜像，默认会从[远程镜像库](https://app.vagrantup.com/boxes/search)下载

##### 启动虚拟机
启动虚拟机时会自动将当前目录（即 Vagrantfile 文件所在目录），和虚拟机的 /vagrant 目录共享
``` sh
vagrant up
```

##### 连接虚拟机 
``` sh
vagrant ssh
```

##### 查看 Vagrant 共享目录 
进入虚拟机后执行 `df -h` 可以看到 Vagrant 默认把宿主机 `Vagrantfile` 所在的目录和虚拟机的 `/vagrant` 目录共享，可以通过 `ls /vagrant/` 查看该目录内容，内容和宿主机对应目录一致

## 配置浅析
Vagrantfile 主要包括三个方面的配置，虚拟机的配置、SSH配置、Vagrant 的一些基础配置。Vagrant 是使用 Ruby 开发的，所以它的配置语法也是 Ruby 的，对于没有学过 Ruby 的朋友也没关系，根据例子模仿下就会了。
> 修改完配置后需要执行 `vagrant reload` 重启 VM 使其配置生效

### box 名称设置 
`config.vm.box = "centos7"`

该名称是再使用 vagrant init 中后面跟的名字，那么默认就是 base。

### hostname 设置
`config.vm.hostname = "node1"`

设置hostname非常重要，因为当我们有很多台虚拟服务器的时候，都是依靠hostname來做识别的。比如，我安装了centos1,centos2 两台虚拟机，再启动时，我可以通过vagrant up centos1来指定只启动哪一台。

### 网络设置 
agrant 有两种方式来进行网络连接：
- `NAT` : 缺省创建，用于让vm可以通过host转发访问局域网甚至互联网。
- `host-only (主机模式)`：这种模式下所有的虚拟系统是可以互相通信的，但虚拟系统和真实的网络是被隔离开的，虚拟机和宿主机是可以互相通信的，相当于两台机器通过双绞线互联。
- `Bridge(桥接模式)`：该模式下的 VM 就像是局域网中的一台独立的主机，可以和局域网中的任何一台机器通信，这种情况下需要手动给 VM 配 IP 地址，子网掩码等。
``` ruby
# Host-only模式
config.vm.network "private_network", ip: "192.168.10.11"

# Bridge模式
config.vm.network "public_network", ip: "10.1.2.61"

# Host-only模式下，ip不指定，采用dhcp
# config.vm.network "private_network", type: "dhcp”

# 创建一个bridge桥接网络，指定IP
# config.vm.network "public_network", ip: "192.168.0.17"
# 创建一个bridge桥接网络，指定桥接适配器
# config.vm.network "public_network", bridge: "en1: Wi-Fi (AirPort)"
# 创建一个bridge桥接网络，不指定桥接适配器
# config.vm.network "public_network"
```

### 同步目录
前面介绍过/vagrant目录默认就是当前的开发目录，这是在虚拟机开启的时候默认挂载同步的。还可以通过配置来设置额外的同步目录
``` ruby
# 第一个参数是主机的目录，第二个参数是虚拟机挂载的目录
config.vm.synced_folder  "/Users/haohao/data", "/vagrant_data"
```

### 端口转发 
对宿主机器上 8080 端口的访问请求 forward 到虚拟机的 80 端口的服务上
``` ruby
config.vm.network :forwarded_port, guest: 80, host: 8080
```

## 常用命令
``` sh
$ vagrant init  # 初始化
$ vagrant up  # 启动虚拟机
$ vagrant halt  # 关闭虚拟机
$ vagrant reload  # 重启虚拟机，重新载入配置文件
$ vagrant ssh  # 登录虚拟机
$ vagrant status  # 查看虚拟机运行状态
$ vagrant destroy  # 销毁当前虚拟机
$ vagrant box list  # 列出 Vagrant 当前 box 列表
$ vagrant box remove  # 删除相应的 box
$ vagrant package  # 把当前的运行的虚拟机环境进行打包为 box 文件，vagrant package --output xxx.box
$ vagrant plugin  # 安装卸载插件
$ vagrant resume  # 恢复被挂起的状态
$ vagrant status  # 获取当前虚拟机的状态
$ vagrant suspend  # 挂起当前的虚拟机
$ vagrant global-status  # 查看当前 vagrant 管理的所有 vm 信息
$ vagrant ssh-config  # 输出用于 ssh 连接的一些信息
```

## 打包分发
### 打包
在当前目录下，使用vagrant package打包，生成 `.box` 镜像文件
``` sh
$ vagrant package
```

### 分发
打包好的 `.box` 文件分发给别人，其他人执行下面命令，就可以得到一模一样的开发环境了
``` sh
$ vagrant box add vnmp ~/box/package.box  # 添加 package.box 镜像并命名为 vnmp
$ cd ~/dev  # 切换到项目目录
$ vagrant init vnmp  # 用 vnmp 镜像初始化。
```

## 集成预安装
从上面这条看下来，你会发现每次都修改了一点点内容，再打包分发给其他用户其实很麻烦。为此 Vagrant 还提供了更为便捷的预安装定制。打开 `Vagrantfile` 文件末尾处有下面被注释的代码:
``` ruby
config.vm.provision "shell", inline: <<-SHELL
   apt-get update
   apt-get install -y apache2
SHELL
```
这段代码就是让你在初次运行 vagrant up 后，虚拟机创建过程众自动运行的初始化命令。 取消注释，把要预先安装的 php/mysql/redis 和配置之类的通通都写进去。初始化时这些程序都会根据你写好的方法安装并配置。

如果你不是初次运行，同时又修改了这里的命令，想让系统再次运行这里面的命令，你可以使用 `vagrant reload --provision` 进行重载。所以在这种情况下，你只要将 `Vagrantfile` 共享给团队的其他成员就可以了，其他成员运行相同的命令即可，是不是比打包分发要方便许多。

你还可以把要运行的命令单独写在一个文件里存放在相同的目录下，比如 bootstrap.sh：
``` sh
#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi
```

然后在 Vagrantfile 里这样添加：
``` ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"
  ...

  config.vm.provision "shell", path: "bootstrap.sh"  # 添加这行
end
```
效果和直接写在 Vagrantfile 是一样的。

## 启动虚拟机集群
前面我们都是通过一个 Vagrantfile 配置启动单台机器，如果我们要启动一个集群，那么可以把需要的节点在一个 Vagrantfile 写好，然后直接就可以通过 vagrant up 同时启动多个 VM 组成一个集群。以下示例配置一个 web 节点和一个 db 节点，两个节点在同一个网段，并且使用同一个 box 启动：
``` ruby
Vagrant.configure("2") do |config|
  config.vm.define :web do |web|
    web.vm.provider "virtualbox" do |v|
          v.customize ["modifyvm", :id, "--name", "web", "--memory", "512"]
    end
    web.vm.box = "ubuntu-server-16.04"
    web.vm.hostname = "web"
    web.vm.network :private_network, ip: "11.11.1.1"
  end

  config.vm.define :db do |db|
    db.vm.provider "virtualbox" do |v|
          v.customize ["modifyvm", :id, "--name", "db", "--memory", "512"]
    end
    db.vm.box = "ubuntu-server-16.04"
    db.vm.hostname = "db"
    db.vm.network :private_network, ip: "11.11.1.2"
  end
end
```

## 注意事项
使用 Apache/Nginx 时会出现诸如图片修改后但页面刷新仍然是旧文件的情况，是由于 VirtualBox 的一个 BUG 造成的。需要对虚拟机里的 Apache/Nginx 配置文件进行修改：
``` sh
# Apache 配置（httpd.conf 或者 apache.conf）修改：
EnableSendfile off

# Nginx 配置（nginx.conf）修改：
sendfile off;
```