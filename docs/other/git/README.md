---
title: Git 基本命令
description: Git是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理
featured_media: /icons/git.png
date: 2017-05-25 21:53:15
post: true
comments: true
humanize: false
tags:
- Git
---

# Git 基本命令

## 概述
Git是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。

### git与svn
#### svn
SVN是集中式版本控制系统，版本库是集中放在中央服务器的，开发时需要先从中央服务器更新下最新的版本，开发完后需要提交到中央服务器；一旦断网，就不能实时同步版本了。
#### git
git是一个分布式版本控制系统，没有中心服务器，每个人的电脑就是一个版本库，可以本地多次提交版本，然后再同步到远程与其他人同步版本。

>分布式相比于集中式的最大区别在于开发者可以提交到本地，每个开发者通过克隆（git clone），在本地机器上拷贝一个完整的Git仓库。

## 下载
[Download Git](https://git-scm.com/)

### 选择OS版本
![](/icons/git/git_download.png "OS版本")

### 安装
[文档](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)

## 基本命令
### 配置
使用下面两条命令对当前电脑进行身份设置

```yml
git config --global user.name "username"
git config --global user.email "youremail"
```

> 这里的<font color=red>username</font>可以是github的用户名或随便设置，<font color=red>email</font>可以是github注册邮箱或随便设置

### git init （初始本地仓库）
创建一个空的Git仓库或重新初始化一个现有仓库

![git init](/icons/git/git_init.png "git初始化")

初始化成功后，会在当前目录下创建一个.git文件夹

![git init](/icons/git/git_init_down.png ".git目录")

### git add （添加代码到本地仓库）
将文件内容添加到索引(将修改添加到暂存区)。也就是将要提交的文件的信息添加到索引库中。
>`git add <path>`

```yaml
$ git add .  # 将所有修改添加到暂存区
$ git add *  # Ant风格添加修改
$ git add *Controller   # 将以Controller结尾的文件的所有修改添加到暂存区
$ git add Hello*   # 将所有以Hello开头的文件的修改添加到暂存区 例如:HelloWorld.txt,Hello.java,HelloGit.txt ...
$ git add Hello?   # 将以Hello开头后面只有一位的文件的修改提交到暂存区 例如:Hello1.txt,HelloA.java 如果是HelloGit.txt或者Hello.java是不会被添加的
```

`git add -u [<path>]`: 把`<path>`中所有跟踪文件中被修改过或已删除文件的信息添加到索引库。它不会处理那些不被跟踪的文件。省略`<path>`表示` . `,即当前目录。

`git add -A [<path>]`: 把`<path>`中所有跟踪文件中被修改过或已删除文件和所有未跟踪的文件信息添加到索引库。省略`<path>`表示` . `,即当前目录。

### git commit （提交代码到本地仓库）
用于将更改记录(提交)到存储库。将索引的当前内容与描述更改的用户和日志消息一起存储在新的提交中。
```yaml
$ git commit -m "the commit message"
```
>这里的<font color=red>-m</font>就是你提交的注释，记得以后写一定要使用注释！这是一个好习惯！

### git status （查看状态）
用于显示工作目录和暂存区的状态。使用此命令能看到那些修改被暂存到了, 哪些没有, 哪些文件没有被Git tracked到。

### git diff （比较两次修改的差异）
用于显示提交和工作树等之间的更改。此命令比较的是工作目录中当前文件和暂存区域快照之间的差异,也就是修改之后还没有暂存起来的变化内容。
```yaml
git diff <file> # 比较当前文件和暂存区文件差异 git diff

git diff <id1><id1><id2> # 比较两次提交之间的差异

git diff <branch1> <branch2> # 在两个分支之间比较
git diff --staged # 比较暂存区和版本库差异

git diff --cached # 比较暂存区和版本库差异

git diff --stat # 仅仅比较统计信息原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/git/git_diff.html
```

### git log （显示所有提交过的版本信息）
用于显示提交日志信息

>git log --pretty=oneline

![git log](/icons/git/git_log.png "git log")

### git reflog （所有分支的所有操作记录）
这个命令是告诉你所有操作的版本信息

![git reflog](/icons/git/git_reflog.png "git reflog")

### git reset （版本回滚）
用于将当前HEAD复位到指定状态。一般用于撤消之前的一些操作(如：git add,git commit等)。

```yaml
git reset --hard a0ca311
git reset --hard HEAD^
git reset --hard HEAD~50
```



