---
title: Mysql 几个优化手段
description: mysql的优化，是后端程序猿都要掌握的。
featured_media: /icons/mysql.png
date: 2017-07-27 01:12:20
post: true
comments: true
humanize: false
tags:
- Mysql
---

# Mysql 几个优化手段

## sql和索引
### 通过 `show status` 命令了解各种sql的执行效率
`SHOW STATUS` 提供 msyql 服务器的状态信息

一般情况下，我们只需要了解以”Com”开头的指令
``` sql
show session status like 'Com%';   # 显示当前的连接的统计结果
show global status like 'Com%';   # 显示自数据库上次启动至今的统计结果
```
::: tip
注：默认是session级别的，其中Com_XXX表示XXX语句所执行的次数。

重点注意：`Com_select`, `Com_insert`, `Com_update`, `Com_delete` 通过这几个参数，可以容易地了解到当前数据库的应用是以插入更新为主还是以查询操作为主，以及各类的SQL大致的执行比例是多少。
:::

另外，还有几个参数需要注意下：
``` sql
show status like 'Connections';   # 试图连接MySQL服务器的次数
show status like 'Uptime';  # 服务器工作的时间（单位秒）
show status like 'Slow_queries';  # 慢查询的次数 (默认是好像是10秒，就当做是慢查询，如下图所示)
```

### mysql的慢查询
开启慢查询日志，可以让MySQL记录下查询超过指定时间的语句，通过定位分析性能的瓶颈，才能更好的优化数据库系统的性能。
#### 查看mysql的慢查询
``` sql
show variables like 'slow_query%';  # 查询慢查询的配置
show variables like 'long_query_time';  # 查询mysql的慢查询时间
set long_query_time = 2;  # 如果查询时间超过2秒就算作是慢查询（修改mysql 慢查询时间）
```
#### 开启慢查询
打开 MySQL 数据库配置文件 `my.ini` ,找到 `[mysqld]` 在其下面添加如下两行代码
``` sh
slow_query_log = ON
long_query_time=2
log_slow_queries=/var/log/slow_sql.log  # 设置把日志写在那里，可以为空，系统会给一个缺省的文件
```

### explain分析低效率的SQL语句
``` sql
EXPLAIN SELECT * FROM order_copy WHERE id=12345
```

会产生一个表格信息，相关信息解释如下：
```
select_type:表示查询的类型。
table:输出结果集的表
type:表示表的连接类型(system和const为佳)
possible_keys:表示查询时，可能使用的索引
key:表示实际使用的索引
key_len:索引字段的长度
rows:扫描的行数
Extra:执行情况的描述和说明
```

> 注意：要尽量避免让type的结果为all，extra的结果为：using filesort

## 索引
常用的优化措施是添加索引。添加索引，我们不用加内存，不用改程序，不用调sql，只要执行个正确的 `create index`，查询速度就可能提高百倍千倍。但是天下没有免费的午餐，查询速度的提高是以插入、更新、删除的速度为代价的，这些写操作，增加了大量的I/O。


### 索引的类型
- `PRIMARY` => 在主键上自动创建
- `INDEX` => 普通索引
- `UNIQUE` => 唯一索引，相当于INDEX + Unique
- `FULLTEXT` => 全文索引，只在MYISAM 存储引擎支持, 目的是全文索引，在内容系统中用的多， 在全英文网站用多(英文词独立). 中文数据不常用，意义不大 国内全文索引通常使用 sphinx 来完成。


### 建立索引
``` sql
ALTER TABLE 表名 ADD INDEX (`user_name`);

ALTER TABLE 表名 ADD UNIQUE KEY(`name`);

ALTER TABLE  表名 ADD PRIMARY KEY (`id`);
```


### 删除索引
``` sql
DROP INDEX index_name ON tbl_name;
alter table t_b drop primary key;   # 删除主键(索引)比较特别:

# 查询索引(均可) 
show index from table_name;
show keys from table_name;
```

> 更多的优化方案待续...
