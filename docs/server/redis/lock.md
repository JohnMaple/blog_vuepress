---
title: Redis 分布式锁
description: 
featured_media: /icons/redis.png
date: 2018-12-19 20:32:41
post: true
comments: true
humanize: false
tags:
- Nosql
- Redis
---

# Redis 分布式锁
分布式锁本质上要实现的目标就是在 Redis 里面占一个“茅坑”，当别的进程也要来占时，发现已经有人蹲在那里了，就只好放弃或者稍后再试。

占坑一般是使用 `setnx(set if not exists)` 指令，只允许被一个客户端占坑。先来先占，用完了，再调用 `del` 指令释放茅坑

``` sh
>set lock:userxxx true ex 5 nx
OK
//do something
....
>del lock:userxxx
```

超时问题。如果在加锁和释文锁之间逻辑执行的太长，以至于超出了锁的超时限制，就会出现问题。因为锁过期了，第二个线程重新持有了这把锁，但是紧接着第一个线程执行完了业务逻辑，就把锁释放了，第三个线程就会在第二个线程逻辑执行完之间拿到锁。

解决方案：

换zk，用心跳解决
为set指令的value参数设置为一个随机数，释放时先匹配随机数是否一致，然后再删除key