---
title: docker-compose编排容器
description: Docker Compose 是 Docker 容器进行编排的工具，定义和运行多容器的应用，可以一条命令启动多个容器。
featured_media: /icons/docker.png
date: 2018-10-25 21:45:20
post: true
comments: true
humanize: false
tags:
- Docker
---

# 使用docker-compose编排容器
docker-compose 是 Docker 容器进行编排的工具，定义和运行多容器的应用，可以一条命令启动多个容器。
使用Compose 基本上分为三步：
- Dockerfile 定义应用的运行环境
- docker-compose.yml 定义组成应用的各服务
- docker-compose up 启动整个应用

## 安装compose
安装 Docker Compose 可以通过下面命令自动下载适应版本的 Compose，并为安装脚本添加执行权限
``` sh
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

查看安装是否成功
``` sh
docker-compose --version
```

## compose 常用命令与配置
### build
构建或重新构建服务容器
``` sh
# docker-compose build [options] [--build-arg key=val...] [SERVICE...]
docker-compose build
```
选项：
- `–compress` 通过gzip压缩构建上下环境
- `–force-rm` 删除构建过程中的临时容器
- `–no-cache` 构建镜像过程中不使用缓存
- `–pull` 始终尝试通过拉取操作来获取更新版本的镜像
- `-m`, `--memory MEM` 为构建的容器设置内存大小
- `–build-arg key=val` 为服务设置build-time变量

### help
获得一个命令的帮助

### kill
通过发送 SIGKILL 信号来停止指定服务的容器
``` sh
# docker-compose kill [options] [SERVICE...]
docker-compose kill -s SIGINT   # -s参数来指定发送的信号，例如发送SIGINT信号
```

### config
验证并查看compose文件配置
``` sh
# docker-compose config [options]
```
选项：
- `–resolve-image-digests` 将镜像标签标记为摘要
- `-q`, `--quiet` 只验证配置，不输出。 当配置正确时，不输出任何内容，当文件配置错误，输出错误信息
- `–services` 打印服务名，一行一个
- `–volumes` 打印数据卷名，一行一个

### exec
与 `docker exec` 命令功能相同，可以通过service name登陆到容器中
``` sh
# docker exec [options] SERVICE COMMAND [ARGS...]
```
选项：
- `-d` 分离模式，后台运行命令
- `–privileged` 获取特权
- `–user USER` 指定运行的用户
- `-T` 禁用分配TTY. By default docker-compose exec分配 a TTY
- `–index=index` 当一个服务拥有多个容器时，可通过该参数登陆到该服务下的任何服务，例如：docker-compose exec --index=1 web /bin/bash ，web服务中包含多个容器

### ps
列出所有运行容器
``` sh
# docker-compose ps [options] [SERVICE...]
docker-compose ps
```
选项：
- `-q` 只打印容器的ID信息

### logs
查看服务日志输出
``` sh
# docker-compose logs [options] [SERVICE...]
docker-compose logs
```
docker-compose将对不同的服务输出使用不同的颜色来区分。可以通过–no-color来关闭颜色

### port
打印某个容器端口所映射的公共端口
``` sh
# docker-compose port [options] SERVICE PRIVATE_PORT
```
选项：
- `–protocol=proto` 指定端口协议，TCP（默认值）或者UDP
- `–index=index` 如果同意服务存在多个容器，指定命令对象容器的序号（默认为1）

### pull
拉取服务依赖的镜像
``` sh
# docker-compose pull [options] [SERVICE...]
```
选项：
- `–ignore-pull-failures` 忽略拉取镜像过程中的错误
- `–parallel` 多个镜像同时拉取
- `–quiet` 拉取镜像过程中不打印进度信息

### push
推送服务依赖的镜像
``` sh
# docker-compose push [options] [SERVICE...]
```
选项：
- `–ignore-pull-failures` 忽略拉取镜像过程中的错误

### up
up命令十分强大，它尝试自动完成包括构建镜像，（重新）创建服务，启动服务，并关联服务相关容器的一些列操作。链接的服务都将会被自动启动，除非已经处于运行状态。
多数情况下我们可以直接通过该命令来启动一个项目
``` sh
# docker-compose up [options] [--scale SERVICE=NUM...] [SERVICE...]
docker-compose up
```
选项：
- `-d` 在后台运行服务容器
- `–no-color` 不使用颜色来区分不同的服务的控制输出
- `–no-deps` 不启动服务所链接的容器
- `–force-recreate` 强制重新创建容器，不能与 `–no-recreate`同时使用
- `–no-recreate` 如果容器已经存在，则不重新创建，不能与 `–force-recreate` 同时使用
- `–no-build` 不自动构建缺失的服务镜像
- `–build` 在启动容器前构建服务镜像
- `–abort-on-container-exit` 停止所有容器，如果任何一个容器被停止，不能与-d同时使用
- `-t`, `--timeout TIMEOUT` 停止容器时候的超时（默认为10秒）
- `–remove-orphans` 删除服务中没有在compose文件中定义的容器
- `–scale SERVICE=NUM` 设置服务运行容器的个数，将覆盖在compose中通过scale指定的参数

### start
启动已经存在的服务容器
``` sh
# docker-compose start [SERVICE...]
docker-compose start dnmp
```

### stop
停止已经处于运行状态的容器，但不删除它
``` sh
# docker-compose stop [options] [SERVICE...]
docker-compose start dnmp
```
选项：
- `-t`, `--timeout TIMEOUT` 停止容器时候的超时（默认为10秒）

### restart
重启项目中的服务
``` sh
# docker-compose restart [options] [SERVICE...]
docker-compose restart dnmp
```
选项：
- `-t`, `--timeout TIMEOUT` 指定重启前停止容器的超时（默认为10秒）

### run
在指定服务上执行一个命令
``` sh
# docker-compose run [options] [-v VOLUME...] [-p PORT...] [-e KEY=VAL...] SERVICE [COMMAND] [ARGS...]
docker-compose run ubuntu ping www.anumbrella.net   # 将会执行一个ubuntu容器，并执行ping www.anumbrella.net命令。
```
> 默认情况下，如果存在关联，则所有关联的服务将会自动被启动，除非这些服务已经在运行中。该命令类似于启动容器后运行指定的命令，相关卷、链接等都会按照配置自动创建。有两个不同点：
> - 给定命令将会覆盖原有的自动运行命令
> - 不会自动创建端口，以避免冲突

如果不希望自动启动关联的容器，可以使用–no-deps选项，例如：
``` sh
docker-compose run --no-deps web
```

选项：
- `-d` 在后台运行服务容器
- `–name NAME` 为容器指定一个名字
- `–entrypoint CMD` 覆盖默认的容器启动指令
- `-e KEY=VAL` 设置环境变量值，可多次使用选项来设置多个环境变量
- `-u`, `--user=""` 指定运行容器的用户名或者uid
- `–no-deps` 不自动启动管理的服务容器
- `–rm` 运行命令后自动删除容器，d模式下将忽略
- `-p`, `--publish=[]` 映射容器端口到本地主机
- `–service-ports` 配置服务端口并映射到本地主机
- `-v`, `--volume=[]` 绑定一个数据卷，默认为空
- `-T` 不分配伪tty，意味着依赖tty的指令将无法运行
- `-w`, `--workdir=""` 为容器指定默认工作目录

### rm
删除指定服务的容器
``` sh
# docker-compose rm [options] [SERVICE...]
docker-compose rm dnmp
```
选项：
- `–f`, `--force` 强制直接删除，包括非停止状态的容器
- `-v` 删除容器所挂载的数据卷

### scale
设置指定服务运行的容器个数，通过service=num的参数来设置数量
``` sh
# docker-compose scale [options] [SERVICE=NUM...]
docker-compose scale web=3 db=2
```
将启动3个容器运行web服务，2个容器运行db服务。一般情况下，当指定书目多于该服务当前实际运行容器，将新创建并启动容器；反之，将停止容器。

选项：
- `-t`, `--timeout TIMEOUT` 停止容器时候的超时（默认为10秒）

### version
打印版本信息
``` sh
docker-compose version
```

## docker-compose.yml 属性
- `version`：指定 docker-compose.yml 文件的写法格式
- `services`：多个容器集合
- `build`：配置构建时，Compose 会利用它自动构建镜像，该值可以是一个路径，也可以是一个对象，用于指定 Dockerfile 参数
  ``` yml
  build: ./dir
  ---------------
  build:
      context: ./dir
      dockerfile: Dockerfile
      args:
          buildno: 1
  ```
- `command`：覆盖容器启动后默认执行的命令
  ``` yml
  command: bundle exec thin -p 3000
  ----------------------------------
  command: [bundle,exec,thin,-p,3000]
  ```
- `dns`：配置 dns 服务器，可以是一个值或列表
  ``` yml
  dns: 8.8.8.8
  ------------
  dns:
      - 8.8.8.8
      - 9.9.9.9
  ```
- `dns_search`：配置 DNS 搜索域，可以是一个值或列表
  ``` yml
  dns_search: example.com
  ------------------------
  dns_search:
      - dc1.example.com
      - dc2.example.com
  ```
- `environment`：环境变量配置，可以用数组或字典两种方式
  ``` yml
  environment:
    RACK_ENV: development
    SHOW: 'ture'
  -------------------------
  environment:
      - RACK_ENV=development
      - SHOW=ture
  ```
- `env_file`：从文件中获取环境变量，可以指定一个文件路径或路径列表，其优先级低于 `environment` 指定的环境变量
  ``` yml
  env_file: .env
  ---------------
  env_file:
      - ./common.env
  ```
- `expose`：暴露端口，只将端口暴露给连接的服务，而不暴露给主机
  ``` yml
  expose:
    - "3000"
    - "8000"
  ```
- `image`：指定服务所使用的镜像
  ``` yml
  image: nginx
  ```
- `network_mode`：设置网络模式
  ``` yml
  network_mode: "bridge"
  network_mode: "host"
  network_mode: "none"
  network_mode: "service:[service name]"
  network_mode: "container:[container name/id]"
  ```
- `ports`：对外暴露的端口定义，和 `expose` 对应
  ``` yml
  ports:   # 暴露端口信息  - "宿主机端口:容器暴露端口"
    - "8763:8763"
    - "8763:8763
  ```
- `links`：将指定容器连接到当前连接，可以设置别名，避免ip方式导致的容器重启动态改变的无法连接情况
  ``` yml
  links:    # 指定服务名称:别名 
    - docker-compose-eureka-server:compose-eureka
  ```
- `volumes`：卷挂载路径
  ``` yml
  volumes:
    - /lib
    - /var
  ```
- `logs`：日志输出信息
  ``` yml
  --no-color          单色输出，不显示其他颜.
  -f, --follow        跟踪日志输出，就是可以实时查看日志
  -t, --timestamps    显示时间戳
  --tail              从日志的结尾显示，--tail=200
  ```

## 其他
### 更新容器
- 当服务的配置发生更改时，可使用 docker-compose up 命令更新配置
- 此时，Compose 会删除旧容器并创建新容器，新容器会以不同的 IP 地址加入网络，名称保持不变，任何指向旧容起的连接都会被关闭，重新找到新容器并连接上去
### links
服务之间可以使用服务名称相互访问，links 允许定义一个别名，从而使用该别名访问其它服务
``` yml
version: '2'
services:
    web:
        build: .
        links:
            - "db:database"
    db:
        image: postgres
```
这样 Web 服务就可以使用 db 或 database 作为 hostname 访问 db 服务了

## 示例
``` yml
version: "3"
services:
  nginx:
    image: nginx:${NGINX_VERSION}
    ports:
      - "${NGINX_HTTP_HOST_PORT}:80"
      - "${NGINX_HTTPS_HOST_PORT}:443"
    volumes:
      - ${SOURCE_DIR}:/var/www/html/:rw
      - ${NGINX_CONFD_DIR}:/etc/nginx/conf.d/:rw
      - ${NGINX_CONF_FILE}:/etc/nginx/nginx.conf:ro
      - ${NGINX_LOG_DIR}:/var/log/nginx/:rw
    restart: always
    networks:
      - default

  php72:
    build:
      context: .
      args:
        PHP_VERSION: ${PHP72_VERSION}
        PHP_XDEBUG: ${PHP72_XDEBUG}
        PHP_SWOOLE: ${PHP72_SWOOLE}
        PHP_REDIS: ${PHP72_REDIS}
        REPLACE_SOURCE_LIST: ${REPLACE_SOURCE_LIST}
    volumes:
      - ${SOURCE_DIR}:/var/www/html/:rw
      - ${PHP72_PHP_CONF_FILE}:/usr/local/etc/php/php.ini:ro
      - ${PHP72_FPM_CONF_FILE}:/usr/local/etc/php-fpm.d/www.conf:rw
    restart: always
    cap_add:
      - SYS_PTRACE
    networks:
      - default

  php56:
    build:
      context: .
      args:
        PHP_VERSION: ${PHP56_VERSION}
        PHP_XDEBUG: ${PHP56_XDEBUG}
        PHP_SWOOLE: ${PHP56_SWOOLE}
        PHP_REDIS: ${PHP56_REDIS}
        REPLACE_SOURCE_LIST: ${REPLACE_SOURCE_LIST}
    volumes:
      - ${SOURCE_DIR}:/var/www/html/:rw
      - ${PHP56_PHP_CONF_FILE}:/usr/local/etc/php/php.ini:ro
      - ${PHP56_FPM_CONF_FILE}:/usr/local/etc/php-fpm.d/www.conf:rw
    restart: always
    cap_add:
      - SYS_PTRACE
    networks:
      - default

  mysql:
    image: mysql:${MYSQL_VERSION}
    ports:
      - "${MYSQL_HOST_PORT}:3306"
    volumes:
      - ${MYSQL_CONF_FILE}:/etc/mysql/conf.d/mysql.cnf:ro
      - ${MYSQL_DATA_DIR}:/var/lib/mysql/:rw
    restart: always
    networks:
      - default
    environment:
      MYSQL_ROOT_PASSWORD: "${MYSQL_ROOT_PASSWORD}"

  redis:
    image: redis:${REDIS_VERSION}
    ports:
      - "${REDIS_HOST_PORT}:6379"
    volumes:
      - ${REDIS_CONF_FILE}:/etc/redis.conf:ro
    restart: always
    entrypoint: ["redis-server", "/etc/redis.conf"]
    networks:
      - default
    

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    ports:
      - "${PHPMYADMIN_HOST_PORT}:80"
    networks:
      - default
    environment:
      - PMA_HOST=mysql
      - PMA_PORT=3306

  phpredisadmin:
    image: erikdubbelboer/phpredisadmin:latest
    ports:
      - "${REDISMYADMIN_HOST_PORT}:80"
    networks:
      - default
    environment:
      - REDIS_1_HOST=redis
      - REDIS_1_PORT=6379

networks:
  default:
```