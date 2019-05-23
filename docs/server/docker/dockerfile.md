---
title: Dockerfile 介绍
description: Dockerfile是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。它们简化了从头到尾的流程并极大的简化了部署工作。Dockerfile从FROM命令开始，紧接着跟随者各种方法，命令和参数。其产出为一个新的可以用于创建容器的镜像。
featured_media: /icons/docker.png
date: 2018-10-11 20:34:31
post: true
comments: true
humanize: false
tags:
- Docker
---

# Dockerfile 介绍
Dockerfile是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。它们简化了从头到尾的流程并极大的简化了部署工作。Dockerfile从FROM命令开始，紧接着跟随者各种方法，命令和参数。其产出为一个新的可以用于创建容器的镜像。

## Dockerfile 语法
Dockerfile语法由两部分构成，注释和命令+参数
``` docker
# Line blocks used for commenting
command argument argument ..
```

一个简单的例子：
``` docker
# Print "Hello docker!"
RUN echo "Hello docker!"
```

## Dockerfile 命令
Dockerfile有十几条命令可用于构建镜像，下文将简略介绍这些命令。

### 组成部分

|部分| 命令  |
|:-----------:|:-----:|
| 基础镜像信息 | FROM |
| 维护者信息 | MAINTAINER |
| 镜像操作指令 | 	RUN、COPY、ADD、EXPOSE、WORKDIR、ONBUILD、USER、VOLUME等 | 
| 容器启动时执行指令| CMD、ENTRYPOINT |

### FROM
FROM命令可能是最重要的Dockerfile命令。改命令定义了使用哪个基础镜像启动构建流程。基础镜像可以为任意镜 像。如果基础镜像没有被发现，Docker将试图从Docker image index来查找该镜像。FROM命令必须是Dockerfile的首个命令。
``` docker
# Usage: FROM [image name]
FROM ubuntu 
```

### MAINTAINER
我建议这个命令放在Dockerfile的起始部分，虽然理论上它可以放置于Dockerfile的任意位置。这个命令用于声明作者，并应该放在FROM的后面。
``` docker
# Usage: MAINTAINER [name]
MAINTAINER authors_name 
```

### RUN
RUN命令是Dockerfile执行命令的核心部分，它接受命令作为参数并用于创建镜像；不像CMD命令，RUN命令用于创建镜像（在之前commit的层之上形成新的层），可使用\来换行。
``` docker
# Usage: RUN [command]
RUN aptitude install -y riak
RUN echo 'hello docker!' \
    > /usr/local/file.txt
```
也可以使用exec格式RUN ["executable", "param1", "param2"]的命令，如：
``` docker
RUN ["apt-get","install","-y","nginx"]
```
要注意的是，`executable`是命令，后面的`param`是参数

### COPY
将主机的文件复制到镜像内，如果目的位置不存在，Docker会自动创建所有需要的目录结构，但是它只是单纯的复制，并不会去做文件提取和解压工作。如：
``` docker
COPY application.yml /etc/springboot/hello-service/src/resources
```
> - 需要复制的目录一定要放在Dockerfile文件的同级目录下
> - 因为构建环境将会上传到Docker守护进程，而复制是在Docker守护进程中进行的。任何位于构建环境之外的东西都是不可用的。COPY指令的目的的位置则必须是容器内部的一个绝对路径。

### ADD
ADD命令有两个参数，源和目标。它的基本作用是从源系统的文件系统上复制文件到目标容器的文件系统。如果源是一个URL，那该URL的内容将被下载并复制到容器中
``` docker
# Usage: ADD [source directory or URL] [destination directory]
ADD /my_app_folder /my_app_folder
ADD application.yml /etc/springboot/hello-service/src/resources
```
但是ADD会对压缩文件（tar, gzip, bzip2, etc）做提取和解压操作。

### EXPOSE
EXPOSE用来指定端口，使容器内的应用可以通过端口和外界交互。启动镜像时，使用-P参数来讲镜像端口与宿主机的随机端口做映射。使用方式（可指定多个）。
``` docker
# Usage: EXPOSE [port]
EXPOSE 8080
EXPOSE 8081
...
```

### CMD
和RUN命令相似，CMD可以用于执行特定的命令。和RUN不同的是，这些命令不是在镜像构建的过程中执行的，而是在用镜像构建容器后被调用。
``` docker
# Usage 1: CMD application "argument", "argument", ..
CMD "echo" "Hello docker!"
CMD /bin/bash
CMD ["/bin/bash"]   # 同样可以使用exec语法
```
当有多个CMD的时候，只有最后一个生效

### WORKDIR
WORKDIR命令用于设置CMD指明的命令的运行目录，之后的命令都是基于此工作目录，如果不存在，则会创建目录。
``` docker
# Usage: WORKDIR /path
WORKDIR /usr/local
WORKDIR webservice
RUN echo 'hello docker' > text.txt
```
最终会在/usr/local/webservice/目录下生成text.txt文件

### VOLUME
VOLUME命令用于让你的容器访问宿主机上的目录。比如你可以将mongodb镜像中存储数据的data文件指定为主机的某个文件。(容器内部建议不要存储任何数据)。
``` docker
# Usage: VOLUME ["/dir_1", "/dir_2" ..]
VOLUME /data/db /data/configdb
```
注意:`VOLUME 主机目录 容器目录`

### USER
指定该镜像以什么样的用户去执行
``` docker
# Usage: USER [UID]
USER mongo
```

### ENV 
ENV命令用于设置环境变量。这些变量以”key=value”的形式存在，并可以在容器内被脚本或者程序调用。这个机制给在容器中运行应用带来了极大的便利。
``` docker
# Usage: ENV key value
ENV SERVER_WORKS 4
```

### ENTRYPOINT
配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖。

> - 每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效。
> - ENTRYPOINT 帮助你配置一个容器使之可执行化，如果你结合CMD命令和ENTRYPOINT命令，你可以从CMD命令中移除“application”而仅仅保留参数，参数将传递给ENTRYPOINT命令。
``` docker
# Usage: ENTRYPOINT application "argument", "argument", ..
# Remember: arguments are optional. They can be provided by CMD
# or during the creation of a container.
ENTRYPOINT echo
# Usage example with CMD:
# Arguments set with CMD can be overridden during *run*
CMD "Hello docker!"
ENTRYPOINT echo
```
作用和用法和CMD一模一样

#### CMD和ENTRYPOINT的区别
CMD的命令会被 docker run 的命令覆盖而ENTRYPOINT不会

[ENTRYPOINT详解](https://blog.csdn.net/wo18237095579/article/details/80540571#entrypoint-%E5%85%A5%E5%8F%A3%E7%82%B9)

## Dockerfile 示例

### 简单示例
#### 构建dockerfile
``` docker
FROM alpine:latest				# 基础镜像，从哪个镜像创建
MAINTAINER	Ethan				  # 维护者
CMD echo 'hello world'		# 运行命令
```
#### 构建镜像
``` sh
docker build -t hello_docker . 
```
- `.` 表示当前路径下所有文件到添加到镜像里面
- `-t` 表示添加标签，标签名为 `hello_docker`

### 创建Nginx的镜像
#### Nginx简述
Nginx是一个高性能的 HTTP 和 反向代理 服务器。它因为它的轻量级，易用，易于扩展而流行于业界。基于优良的架构设计，它能够比之前的类似软件处理更多的请求。它也可以用来提供静态文件服务，比如图片，脚本和CSS。

#### 构建nginx的Dockerfile
从基础镜像开始，运用FROM命令和MAINTAINER命令
``` docker
############################################################
# Dockerfile to build Nginx Installed Containers
# Based on Ubuntu
############################################################
# Set the base image to Ubuntu
FROM ubuntu
# File Author / Maintainer
MAINTAINER Maintaner Name

# Install Nginx
# Add application repository URL to the default sources
RUN echo "deb http://archive.ubuntu.com/ubuntu/ raring main universe" >> /etc/apt/sources.list
# Update the repository
RUN apt-get update
# Install necessary tools
RUN apt-get install -y nano wget dialog net-tools
# Download and Install Nginx
RUN apt-get install -y nginx

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf
# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/
# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
# Expose ports
EXPOSE 80
# Set the default command to execute
# when creating a new container
CMD service nginx start
```
#### 构建镜像
``` sh
sudo docker build -t nginx .
```
- `.` 表示当前路径下所有文件到添加到镜像里面，
- `-t` 表示添加标签，标签名为 `nginx`