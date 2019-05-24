---
title: Mysql常见存储引擎 -- MyISAM和InnoDB的区别
description: MySQL中最常见的数据引擎就是MyISAM和InnoDB，MyISAM适合查询以及插入为主的应用，InnoDB适合频繁修改以及涉及到安全性要求高的应用。
featured_media: /icons/mysql.png
date: 2017-04-30 13:12:41
post: true
comments: true
humanize: false
tags:
- Mysql
---

# Mysql常见存储引擎 -- MyISAM和InnoDB的区别

MySQL中最常见的数据引擎就是MyISAM和InnoDB，MyISAM适合查询以及插入为主的应用，InnoDB适合频繁修改以及涉及到安全性要求高的应用，两者的一些差别如下(部分借鉴来源于网络，以下只是记录着个人的学习记录)：

1. MyISAM不支持事务和外健关联，而InnoDB支持事务和外健关联。事务是一种高级的处理方式，可以把一连贯的操作过程中，只要哪个环节出错还可以回滚还原，而MyISAM就不可以了。比如用户下订单，用户支付了100元，店家收到了100元，但是由于各种原因用户支付环节出错了，店家可不能莫名多了100元，这时候就涉及到事务的回滚，优势就上来了。

2. MyISAM的索引和数据是分开的，并且索引是有压缩的，内存使用率就对应提高了不少，能加载更多索引。而Innodb是索引和数据是紧密捆绑的，没有使用压缩从而会造成Innodb比MyISAM体积要庞大，在海量数据的网站级别中尤能体现。MyISAM类型的数据文件相对小，还可以在不同操作系统中COPY库中frm.MYD,MYI的文件，这点还是很有优势，布署的时候方便。

3. InnoDB中不保存表的行数，如 `select count(*) from table` 时，InnoDB需要扫描一遍整个表来计算有多少行，但是MyISAM只要简单的读出保存好的行数即可。注意的是，当count(*)语句包含where条件时MyISAM也需要扫描整个表。

4. 删除表时，`DELETE FROM table` 时，InnoDB不会重新建立表，而是一行一行的删除，效率要慢。而MyISAM则会重新建立表。

5. InnoDB会造成行级锁，锁了行，其他的操作需要等待，等待释放资源才会进行操作。当然等待的是微乎其微的，只有海量数据级别的网站才会体现。InnoDB表的行锁也不是绝对的，还可能锁表，假如在执行一个SQL语句时MySQL不能确定要扫描的范围，例如 `update table set num=1 where name like “%aaa%”` ，InnoDB表同样会锁全表。同时这种情况也会锁表，where条件中，非主键的都会锁全表的。

6. MyISAM总体执行效率快，对比insert写操作的话，MyISAM的写性能比InnoDB要高效，如果是针对基于索引的update操作，Innodb会比MyISAM有优势。

没有绝对好坏，实际应用中，根据不同需求来优化，设计。