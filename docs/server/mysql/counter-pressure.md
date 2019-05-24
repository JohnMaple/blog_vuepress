---
title: Mysql关于计数器缓解压力小技巧
description: mysql的优化，是后端程序猿都要掌握的。
featured_media: /icons/mysql.png
date: 2017-10-25 11:59:36
post: true
comments: true
humanize: false
tags:
- Mysql
---

# Mysql关于计数器缓解压力小技巧
以下要介绍的一个小技巧，应该来说是那种流量多的可能会高并发的情况下，可以借鉴下想法。

比如：一个例子，现在的很多网站对于文章或这商品的点击数浏览量，基本表的设计都是这样的，如：shop_id,type_id,shopname,view等等，当浏览了，就更新一下view加加。在一下小站里，一点问题都没有，但是试想过没，在一些大型的商城或者大型资讯门户网站中，每天浏览量ip非常之多，这样会对数据库照成压力，因为那么多用户在点击文章或者商品，这时候需要更新一下view技数，我们知道操作数据库会有短暂的锁表，流量大的情况下，锁表导致的用户请求等待就会出现的很明显。

其实大型项目中肯定会用到分库分表来缓解压力，而我这里要分享的是另一种小技巧，不仅是计数方面可以借鉴这样的思想，其他地方都可以有所借鉴。

处理方式：加一张表 
``` sql
CREATE TABLE `shop_view` (
  `shop_id` int(11) NOT NULL,
  `view` int(11) NOT NULL,
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB;
```

这种方式，虽然分担了商品表或者文章表的压力，还有点不足，每当有一个进程请求更新的时候，都会产生全局的互斥锁，只能串行，不能并行。在高并发下依然会有较长的等待时间。

另一种处理方式，基于以上的加表方式稍微在处理，就是对每一个商品的计数器不是一行，而是多行，比如，20行。每次随机更新其中一行，该文章的浏览数就是所有行的和。

``` sql
CREATE TABLE `shop_view` (
  `shop_id` int(11) NOT NULL,
  `round` tinyint(4) NOT NULL COMMENT '就是用来随机用的',
  `view` int(11) NOT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB;
```
> `alter table shop_view add unique shop_round (shop_id,round);`可以添加联合唯一索引更加高效

其实round五六个足矣。每次访问的时候，随机一个数字（1-10）作为round，如何该round存在则更新view+1，否则插入，view=1。借助DUPLICATE KEY，不然在程序里是实现得先SELECT，判断一下再INSERT或者UPDATE。
``` sql
INSERT INTO `shop_view` (`shop_id`, `round`, `view`) VALUES (`12`, RAND()*10, 1) ON DUPLICATE KEY UPDATE `view`=`view`+1;
```

获取指定文章的总访问量的时候：
``` sql
SELECT SUM(`view`) FROM `shop_view` WHERE `shop_id`='12';
```

以上这只是一个思路，一些地方都能借鉴这种思路，当然这种优化的手段是灵活多变的不一定这样处理，就如：我完全还可以不这样做，如果高并发，我可以用队列写表，甚至把计数器保存在内存中，每一个小时进行存储一次。主要都是为了解决最本质问题：在读比较多的表要加快读的速度，在写较多的表要加快写的速度。