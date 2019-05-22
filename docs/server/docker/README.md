---
title: Docker 基本命令汇总
description: Docker的三大核心概念：镜像、容器、仓库
featured_media: /icons/docker.png
date: 2018-09-26 21:17:26
post: true
comments: true
humanize: false
tags:
- Docker
---

# Docker 基本命令汇总

## 概述

Docker的三大核心概念：镜像、容器、仓库

- 镜像：类似虚拟机的镜像、用俗话说就是安装文件。
- 容器：类似一个轻量级的沙箱，容器是从镜像创建应用运行实例，可以将其启动、开始、停止、删除、而这些容器都是相互隔离、互不可见的。
- 仓库：类似代码仓库，是Docker集中存放镜像文件的场所。

## 安装
[Docker 文档](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## 系统操作
### 设置docker自启动
安装好docker后，设置开机启动
``` sh
systemctl enable docker   # 不同的操作系统，命令可能不一样
```

### docker的启动、停止、重启
``` sh
# 启动
service docker start
# 停止
service docker stop
# 重启
service docker restart
```

## 基本使用
### docker镜像

#### docker search `<image>`
用于搜索线上镜像仓库，这样就可以搜索出在[Docker Hub](https://hub.docker.com/)上所有带redis的公共的可用镜像

#### docker pull `<image>`
拉取服务器镜像仓库里的镜像

> 不指定版本,默认会下载最新的一个版本。由于官方的镜像在国外，有时网速较慢，所以推荐下载国内的镜像，比如阿里云，网易云

#### docker push
`docker push 远程仓库名：远程镜像标签`，推送本地镜像到服务器

### 查看镜像
- `docker images`：列出images

- `docker images -a`：列出所有的images（包含历史）

- `docker images --tree`：显示镜像的所有层(layer)

- `docker rmi  <image ID>`：删除一个或多个image

### docker创建一个容器
上面介绍了docker镜像的拉取，我们接下来看下如何创建一个容器

#### docker run `命令格式`
``` go
Usage: docker run [OPTIONS] IMAGE [COMMAND] [ARG...]  
 
  -d, --detach=false         指定容器运行于前台还是后台，默认为false   
  -i, --interactive=false   打开STDIN，用于控制台交互  
  -t, --tty=false            分配tty设备，该可以支持终端登录，默认为false  
  -u, --user=""              指定容器的用户  
  -a, --attach=[]            登录容器（必须是以docker run -d启动的容器）
  -w, --workdir=""           指定容器的工作目录 
  -c, --cpu-shares=0        设置容器CPU权重，在CPU共享场景使用  
  -e, --env=[]               指定环境变量，容器中可以使用该环境变量  
  -m, --memory=""            指定容器的内存上限  
  -P, --publish-all=false    指定容器暴露的端口  
  -p, --publish=[]           指定容器暴露的端口 
  -h, --hostname=""          指定容器的主机名  
  -v, --volume=[]            给容器挂载存储卷，挂载到容器的某个目录  
  --volumes-from=[]          给容器挂载其他容器上的卷，挂载到容器的某个目录
  --cap-add=[]               添加权限，权限清单详见：http://linux.die.net/man/7/capabilities  
  --cap-drop=[]              删除权限，权限清单详见：http://linux.die.net/man/7/capabilities  
  --cidfile=""               运行容器后，在指定文件中写入容器PID值，一种典型的监控系统用法  
  --cpuset=""                设置容器可以使用哪些CPU，此参数可以用来容器独占CPU  
  --device=[]                添加主机设备给容器，相当于设备直通  
  --dns=[]                   指定容器的dns服务器  
  --dns-search=[]            指定容器的dns搜索域名，写入到容器的/etc/resolv.conf文件  
  --entrypoint=""            覆盖image的入口点  
  --env-file=[]              指定环境变量文件，文件格式为每行一个环境变量  
  --expose=[]                指定容器暴露的端口，即修改镜像的暴露端口  
  --link=[]                  指定容器间的关联，使用其他容器的IP、env等信息  
  --lxc-conf=[]              指定容器的配置文件，只有在指定--exec-driver=lxc时使用  
  --name=""                  指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字  
  --net="bridge"             容器网络设置:
                                bridge 使用docker daemon指定的网桥     
                                host     //容器使用主机的网络  
                                container:NAME_or_ID  >//使用其他容器的网路，共享IP和PORT等网络资源  
                                none 容器使用自己的网络（类似--net=bridge），但是不进行配置 
  --privileged=false         指定容器是否为特权容器，特权容器拥有所有的capabilities  
  --restart="no"             指定容器停止后的重启策略:
                                no：容器退出时不重启  
                                on-failure：容器故障退出（返回值非零）时重启 
                                always：容器退出时总是重启  
  --rm=false                 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)  
  --sig-proxy=true           设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理
```
实例：
``` sh
docker run -p 8090:8080 -p 50000:50000 --restart always --link Redis:redis --name jenkins -v /home/jenkins:/home/jenkins_home --privileged=true dokcer.io/jenkins/jenkins
```
- -p：把容器的8080端口映射到宿主机8090上

- -v：主机的目录/home/jenkins映射到容器的目录/home/jenkins_home

- --name：给容器起个名字jenkins，docker.io/jenkins/jenkins是你下载的镜像

- --restart：always 容器退出时总是重启

- --privileged=true：挂载主机目录Docker访问出现Permission denied的解决办法

- --link：为redis容器起个别名Redis，访问的时候使用别名Redis

### 查看docker容器
#### docker ps
查看正在运行的容器
#### docker ps -a
查看所有容器

### 启动、停止、重启、删除docker容器
根据id和name对容器进行操作
``` sh
#启动容器
docker start <ContainerId(或者name)>
#停止容器
docker stop <ContainerId(或者name)>
#重启容器
docker restart <ContainerId(或者name)>
#删除容器
docker rm <ContainerId(或者name)>
#删除所有容器
docker rm $(docker ps -a -q)
```

### 进入docker容器
``` sh
docker exec -it <ContainerId(或者name)> /bin/bash
```

### 退出容器
``` sh
# 方法一
exit
# 方法二
ctrl+p && ctrl+q (一起按，注意顺序，退出后容器依然保持启动状态)
```

### 查看容器日志
`docker logs -f -t --tail 行数 容器名`
``` sh
docker logs -f -t --tail 10 redis #查看redis容器最后10行日志
```

### Docker网络操作
``` sh
#在主机上创建一个网络
docker network create mynet

#查看自定义bridge网络
docker network inspect mynet

#移除网络要求网络中所有的容器关闭或断开与此网络的连接时，才能够使用移除命令
docker network disconnet mynet 容器ID

#移除网络
docker network rm mynet
```

## 注意事项
### 非root用户操作docker
``` sh
# 创建docker组
sudo groupadd docker
# 将当前用户加入docker组
sudo gpasswd -a ${USER} docker
# 重新启动docker服务（下面是CentOS7的命令）
sudo service docker restart或sudo systemctl restart docker
# 当前用户退出系统重新登陆
su root
su franson 
```

