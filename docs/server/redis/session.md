---
title: Redis 事务
description: 
featured_media: /icons/redis.png
date: 2018-11-19 22:12:35
post: true
comments: true
humanize: false
tags:
- Nosql
- Redis
---

# Redis 事务
## 基本使用
每个事务的操作都有begin、commit、rollback，begin指示事务的开始，commit指示事务的提交，rollback指示事务的回滚。形如：
``` java
begin();
try{
    command()
    command2();
    ...
    commit();
}catch(Exception e) {
    rollback();
}
```

redis也差不多，分别用multi指示事务的开始，exec指示事务的执行，discard指示事务的丢弃，用于在exec执行之前，丢弃事务缓存队列中的所有指令。reddis的事务不能算原子性，而仅仅满足了事务的隔离性-当前执行的事务有着不被其它事务打断的权利。形如

``` sh
>multi
OK
>set maxint 100
QUEUED
>incrby maxint 10
QUEUED
>exec
```

redis还提供了watch机制，一种乐观锁。watch会在事务开始之前盯住1个或者多个关键变量，当事务执行，也就是服务器收到了exec指令要顺序执行缓存的事务队列时，redis会检查关键变量自watch之后，是否被修改了。如果变量被修改，exec指令就会返回null回复客户端事务执行失败。

## redis的事务为什么不能支持回滚?
- Redis先执行命令，命令执行成功后才会记录日志，所以出现错误时无法回滚。
- Redis 命令只会因为错误的语法而失败（并且这些问题不能在入队时发现），或是命令用在了错误类型的键上面。这也就是说，从实用性的角度来说，失败的命令是由编程错误造成的，而这些错误应该在开发的过程中被发现，而不应该出现在生产环境中。因为不需要对回滚进行支持，所以 Redis 的内部可以保持简单且快速。