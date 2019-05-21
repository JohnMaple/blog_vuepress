---
title: Git 日常操作
description: 日常使用git，多分支操作，多人合作开发...
featured_media: /icons/git.png
date: 2017-05-26 20:20:10
post: true
comments: true
humanize: false
tags:
- Git
---

# Git 日常操作

## git使用步骤

### 远端克隆项目
``` yml
git clone url    # url 可以使http/ssh
```
### 已存在目录下初始化项目
``` yml
git init    # 初始化已存在的项目
git add demo.txt    # 添加文件
git commit -m "新建文件"    # 提交到本地暂存区git仓库

git remote add origin https://github.com/JohnMaple/repo-test.git    # 关联远程git仓库，ssh路径：git@github.com:JohnMaple/repo-test.git
git push -u origin master   # 推送到远程仓库
```
>由于远程库是空的，我们第一次推送master分支时，加上了<font color=red> –u </font>参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。使用 `git push origin master`

## 分支操作
在版本回滚与更新中，git都是用master分支作为主线，通过时间顺序进行更新或者回滚
### 创建分支
``` yml
git checkout -b dev    # 创建并切换分支

# 等效下面两句命令
git branch dev    # 创建分支
git checkout dev  # 切换分支

git branch    # 查看当前分支
```
### 合并分支
``` yml
git merge 分支名

# 比如：合并dev分支
git merge dev
```

### 删除分支
合并完后，便可以删除分支
``` yml
git branch -d dev
```

### 分支策略
``` yml
1.创建一个dev分支。
2.修改demo.txt内容。
3.添加到暂存区。
4.切换回主分支(master)。
5.合并dev分支，使用命令 git merge –no-ff -m "注释" dev
6.查看历史记录
```
具体命令如下：
``` yml
git checkout -b dev
git add demo.txt
git commit -m "add merge"
git merge --no-ff -m "merge with no-ff" dev
git log 或者 git log --graph --pretty=oneline --abbrev-commit
```
::: tip
分支策略：首先master主分支应该是非常稳定的，也就是用来发布新版本，一般情况下不允许在上面干活，干活一般情况下在新建的dev分支上干活，干完后，比如上要发布，或者说dev分支代码稳定后可以合并到主分支master上来。
:::

### 命令总结
``` yml
查看分支：git branch
创建分支：git branch name
切换分支：git checkout name
创建+切换分支：git checkout -b name
合并某个分支到当前分支：git merge name
删除某个分支：git branch -d name
```

### 拉取冲突
如果拉取出现下面的错误
> error: Your local changes to the following files would be overwritten by merge:

#### 方法1
如果你想保留刚才本地修改的代码，并把git服务器上的代码pull到本地（本地刚才修改的代码将会被暂时封存起来）

``` yml
git stash
git pull origin master
git stash pop
```
如此一来，服务器上的代码更新到了本地，而且你本地修改的代码也没有被覆盖，之后使用add，commit，push 命令即可更新本地代码到服务器了。

#### 方法2
如果你想完全地覆盖本地的代码，只保留服务器端代码，则直接回退到上一个版本，再进行pull

``` yml
git reset --hard
git pull origin master
```

## git去除输入用户和密码

1. linux，在~/下， touch创建文件 .git-credentials, 用vim编辑此文件，输入内容格式：

``` yml
touch .git-credentials

vim .git-credentials

https://{username}:{password}@github.com

```

2. 在终端下执行  git config --global credential.helper store
3. 可以看到~/.gitconfig文件，会多了一项：
``` yml
[credential]
    helper = store
```
这样就已经设置好了。