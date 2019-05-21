---
title: Linux 特殊命令
description: Linux 一些特殊的命令，日常维护可能会用得到...
featured_media: /icons/Linux.png
date: 2018-06-10 19:56:30
post: true
comments: true
humanize: false
tags:
- Linux
---

# Linux 特殊命令

## 用内存最大的10个进程:
`ps -aux | sort -k4nr | head -n 10`
## 最大使用内存
`ps aux| grep -v "USER" |sort -n -r -k 4 |awk 'NR==1{ print $0}'`

## 查看缓存的命令
``` yml
free -m
free -h   # 看内存是否已经释放掉了。
free -mh
```

## 清理缓存的命令　
``` yml
echo 1 > /proc/sys/vm/drop_caches
echo 2 > /proc/sys/vm/drop_caches
echo 3 > /proc/sys/vm/drop_caches
```

- 0：不释放（系统默认值）
- 1：释放页缓存
- 2：释放dentries和inodes
- 3：释放所有缓存

我们在清理缓存先要先把buffe中的数据先写入到硬盘中，sync命令

## 查看内存情况：
`more /proc/meminfo`

## 快速定位较大文件目录并清理硬盘
分以下步骤进行：
1. 查看磁盘信息：`df -lh`
2. 循环定位最大文件目录：`du -h --max-depth=1`
3. 定位最大文件：`ls -lhS`
4. 确认删除的文件是否仍被占用：`/usr/sbin/lsof | grep deleted`

最大的文件其实在 `~/.local/share/Trash` 下，而这个正是LInux下的垃圾箱(可以理解为windows回收站)  `sudo rm -rf ~/.local/share/Trash`
