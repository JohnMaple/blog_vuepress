---
title: 哪些情况下索引会失效？
description: 索引并不是时时都会生效的，在哪些情况下会使索引失效？
featured_media: /icons/mysql.png
date: 2017-07-02 00:52:12
post: true
comments: true
humanize: false
tags:
- Mysql
---

# 哪些情况下索引会失效？
索引并不是时时都会生效的，比如以下几种情况，将导致索引失效：
1. 如果条件中有 `or`，即使其中有条件带索引也不会使用(这也是为什么尽量少用 `or` 的原因)
    > 注意：要想使用 `or`，又想让索引生效，只能将 `or` 条件中的每个列都加上索引。

2. 对于多列索引，不是使用的第一部分，则不会使用索引。

3. `like` 查询是以 `%` 开头。

4. 如果列类型是字符串，那一定要在条件中将数据使用引号引用起来,否则不使用索引。

5. 如果 mysql 估计使用全表扫描要比使用索引快,则不使用索引。

此外，查看索引的使用情况：
``` sql
show status like 'Handler_read%';
```

- `handler_read_key`：这个值越高越好，越高表示使用索引查询到的次数
- `handler_read_rnd_next`：这个值越高，说明查询越低效