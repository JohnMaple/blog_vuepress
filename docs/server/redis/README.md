---
title: Redis 概述
description: 
featured_media: /icons/redis.png
date: 2018-11-15 23:25:15
post: true
comments: true
humanize: false
tags:
- Nosql
- Redis
---

# Redis 概述

## Redis 安装
### Docker 方式  
``` sh
# 拉取 redis 镜像  
$ docker pull redis  
# 运行 redis 容器  
$ docker run --name myredis -d -p6379:6379 redis  
# 执行容器中的 redis-cli，可以直接使用命令行操作 redis  
$ docker exec -it myredis redis-cli  
```
 
### Github 源码编译方式  
``` sh
# 下载源码
$ git clone --branch 2.8 --depth 1 git@github.com:antirez/redis.git  
$ cd redis  
# 编译  
$ make  
$ cd src  
# 运行服务器，daemonize 表示在后台运行  
$ ./redis-server --daemonize yes  
# 运行命令行  
$ ./redis-cli  
```

### 直接安装方式  
``` sh
# mac  
$ brew install redis  
# ubuntu  
$ apt-get install redis  
# redhat  
$ yum install redis  
# 运行客户端  
$ redis-cli 
```

## Redis 基本结构数据
- string
- list
- set
- hash
- zset

## 常用命令
``` sh
# string
set key value
setex key seconds value   # 几秒后过期，等价于 set+expire
setnx key value   # key不存在就创建
get key
incr key  # 自增，key数值
incrby key value  # 自增value

# list
lpush key value [value …]   # 从左边入队
rpush key value [value …]   # 从右边入队
lrange mylist 0 -1    # 取出全部
llen key  # 列表长度
lpop
rpop
brpop   # 阻塞式出队
lindex key index  # 慢操作，通过index获取值
ltrim key start_index end_index   # 获取区间[start_index, end_index]

# hash
hset key field value    # 置key上的hash字段field 为value
hgetall key
hget key field
hmset key field value [field value …]   # 批量保存
hlen key    # hash的长度 

# set
sadd key value    # 添加集合
smembers key    # 获取集合成员
sismember key value   # 查询value是否存在
scard key   # 获取集合长度
spop key  # 删除一个成员

# zset
zadd key score member   # 根据score添加成员
zrange key start_index end_index  # 获取排名区间
zcard key   # 集合长度
zrangebyscore key start_score end_score   # 根据score获取区间
zrem key value  # 删除value, 可用于简单延时队列
setbit key index value  # 设置位图
getbit key index
```

## Redis 配置
``` sh
daemonize：如需要在后台运行，把该项的值改为yes
pdifile：把pid文件放在/var/run/redis.pid，可以配置到其他地址
bind：指定redis只接收来自该IP的请求，如果不设置，那么将处理所有请求，在生产环节中最好设置该项
port：监听端口，默认为6379
timeout：设置客户端连接时的超时时间，单位为秒
loglevel：等级分为4级，debug，revbose，notice和warning。生产环境下一般开启notice
logfile：配置log文件地址，默认使用标准输出，即打印在命令行终端的端口上
database：设置数据库的个数，默认使用的数据库是0
save：设置redis进行数据库镜像的频率
rdbcompression：在进行镜像备份时，是否进行压缩
dbfilename：镜像备份文件的文件名
dir：数据库镜像备份的文件放置的路径
slaveof：设置该数据库为其他数据库的从数据库
masterauth：当主数据库连接需要密码验证时，在这里设定
requirepass：设置客户端连接后进行任何其他指定前需要使用的密码
maxclients：限制同时连接的客户端数量
maxmemory：设置redis能够使用的最大内存
appendonly：开启appendonly模式后，redis会把每一次所接收到的写操作都追加到appendonly.aof文件中，当redis重新启动时，会从该文件恢复出之前的状态
appendfsync：设置appendonly.aof文件进行同步的频率
vm_enabled：是否开启虚拟内存支持
vm_swap_file：设置虚拟内存的交换文件的路径
vm_max_momery：设置开启虚拟内存后，redis将使用的最大物理内存的大小，默认为0
vm_page_size：设置虚拟内存页的大小
vm_pages：设置交换文件的总的page数量
vm_max_thrrads：设置vm IO同时使用的线程数量
```

## Redis 协议
redis协议分为5种单元类型，单元结束时统一加上回车换行符号`\r\n`
- 单行字符串 以`+`号开头
- 多行字符串 以`$`符开头，后跟字符串长度
- 整数值 以`:`号开头，后跟整数的字符串形式
- 错误消息 以`-`号开头
- 数组 以`*`号开头，后跟数组长度

客户端向服务器发送的指令只有一种格式，多行字符串数组；服务器向客户端回复的响应要支持多种数据结构。

## 线程 io模型
redis是个单线程程序。之所以单线程还能跑这么快，是因为
- 所有数据都在内存中，所有的运算都是内存级别的运算
- 使用非阻塞式io。每次io操作，能读多少，读多少，能写多少，写多少，不在io浪费时间
- 采用事件轮询(如kqueue, epoll)，多路复用

## 主要应用
- 分布式锁
- 延时队列(应对一组消费者时，相比rabbitmq、kafka更简单)
- hyperLogLog 提供不精确的去重计数方案
- 布隆过滤器
- 漏斗限流
- GeoHash (GEO模块)

## 过期策略
redis会将每个设置了过期时间的key放入到一个独立的字典中，以后会定时遍历这个字典来删除到期的key。除了定时遍历外，它还会使用惰性策略来删除过期的key，即客户端在访问这个key的时间，redis对key的过期时间进行检查，如果过期了就立即删除。redis默认会每秒进行十次过期扫描，扫描默认不会超过25ms，过期扫描不会遍历过期字典中所有的key，而是采用了一种简单的贪心策略

- 从过期字典中随机20个key
- 删除这20个key中已经过期的key
- 如果过期的key比率超过1/4，重复步骤过程。

为避免有大量key同时过期导致卡顿，可以给过期时间设置一个随机范围，不能全部在同一时间过期。

## 注意事项
- Redis和memcache相比的独特之处：
  - redis可以用来做存储（storge）、而memcache是来做缓存（cache）。这个特点主要是因为其有“持久化”功能
  - 存储的数据有“结构”，对于memcache来说，存储的数据，只有一种类型——“字符串”，而redis则可以存储字符串、链表、集合、有序集合、哈序结构

- 持久化：
  - Redis将数据存储于内存中，或被配置为使用虚拟内存。
  - 实现数据持久化的两种方式：
    - 使用截图的方式，将内存中的数据不断写入磁盘（性能高，但可能会引起一定程度的数据丢失）
    - 使用类似mysql的方式，记录每次更新的日志

- Redis的主从同步：对提高读取性能非常有益

- Redis服务端的默认端口是6379

- Redis优点：
  - 单线程：并发安全
  - 高性能
  - 原语与数据结构丰富
  - 应用广泛

> zrange start, stop, 总长度为 n, 复杂度是O(M+log(N)), M 是结果集基数 stop-start