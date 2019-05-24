---
title: Mysql 外键的设置
description: 我们说数据库的优化，有一点可以给字段做索引，然后进行外键关联。这一点大家都知道。而初学者往往，还是没有真正理解，就以为自己明白了，不就是比如把某一个表中的分类ID，拿过来作为查询语句的条件作为父类ID。是的，也是这么做的，但是还有对表进行结构上的操作，往往都被初学者忽略掉了。
featured_media: /icons/mysql.png
date: 2017-05-02 10:47:12
post: true
comments: true
humanize: false
tags:
- Mysql
---

# Mysql 外键的设置
我们说数据库的优化，有一点可以给字段做索引，然后进行外键关联。这一点大家都知道。而初学者往往，还是没有真正理解，就以为自己明白了，不就是比如把某一个表中的分类ID，拿过来作为查询语句的条件作为父类ID。是的，也是这么做的，但是还有对表进行结构上的操作，往往都被初学者忽略掉了。

## 外键设置
- 指定外键关键字： `foreign key(列名)`
- 引用外键所对应的表： `references <外键表名>(外键列名)`

> 建立外键的前提： 本表的列必须与外键类型相同，而且外键必须是外表主键。

![查看表结构](/icons/mysql/foreign_key.png)

首先创建表的时候，给这个ID设为主键

![查看表结构](/icons/mysql/foreign_key1.png)

再给另一张表要关联的某一个字段设置索引：
``` sql
alter table t_article add index art_type_id(articletypeid);
```

再定义外键：  
``` sql
alter table t_article add constraint t_article_t_category foreign key (articletypeid) references t_category(id);
```
外键设置好后，根据需求还可以，实现级联操作，就是当 t_category 中的id,被删除了，或被更新了。

我们如果到 `t_article` 表中，一一手动去更新对应的`articletypeid`的值，这种做法完全没必要。

定义了外键后，我们可以实现级联操作，当外键发生改变，另一方跟着自动改变：
``` sql
alter table t_article add constraint t_article_t_category foreign key (articletypeid) references t_category(id) on update cascade on delete cascade;
```

同时，我们还可以防止外表中的外键被修改：
``` sql
alter table t_article add constraint t_article_t_category foreign key (articletypeid) references t_category(id) on update restrict on delete restrict;
```

如果我们需要删除这个外键关联呢：
``` sql
alter table t_article drop foreign key t_article_t_category;
```
如果你没有给这个关联起一个别名的话，你可以show create table 进行查看，可以查看的到。