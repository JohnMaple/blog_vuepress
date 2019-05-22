---
title: Python virtualenv 虚拟环境搭建
description: pip, virtualenv, fabric通称为pythoner的三大神器
featured_media: /icons/python.png
date: 2018-05-13 10:27:56
post: true
comments: true
humanize: false
tags:
- Python
- Virtualenv
---

# Python virtualenv 虚拟环境搭建
virtualenv------用来建立一个虚拟的python环境，一个专属于项目的python环境。用virtualenv 来保持一个干净的环境非常有用。

## virtualenv
### 安装
* 通过pip安装virtualenv
``` bash
pip install virtualenv
```

* 测试安装成功
``` bash
virtualenv --version
```

### 使用

* 为一个工程项目搭建一个虚拟环境
``` bash
cd my_project
virtualenv my_project_env
```

* 另外，如果存在多个python解释器，可以选择指定一个Python解释器（比如`python2.7`），没有指定则由系统默认的解释器来搭建
``` bash
virtualenv -p /usr/bin/python2.7 my_project_env
```

> 将会在当前的目录中创建一个名my_project_env的文件夹，这是一个独立的python运行环境，包含了Python可执行文件， 以及 pip 库的一份拷贝，这样就能安装其他包了，不过已经安装到系统Python环境中的所有第三方包都不会复制过来，这样，我们就得到了一个不带任何第三方包的“干净”的Python运行环境来。

* 启动虚拟环境
``` bash
source my_project_env/bin/activate
```

* 停用虚拟环境
``` bash
deactivate
```

> 停用后将回到系统默认的Python解释器

## virtualenvwrapper
提供了一系列命令使得和虚拟环境工作变得愉快许多。它把您所有的虚拟环境都放在一个地方。

- 将您的所有虚拟环境在一个地方。
- 包装用于管理虚拟环境（创建，删除，复制）。
- 使用一个命令来环境之间进行切换。

### 安装

#### 安装命令
> 安装（确保 virtualenv 已经安装了）
``` bash
sudo pip install virtualenvwrapper
```

virtualenvwrapper默认将所有的虚拟环境放在～/.virtualenvs目录下管理，可以修改环境变量WORKON_HOME来指定虚拟环境的保存目录。
#### 启动命令
使用如下命令来启动virtualenvwrapper
``` bash
source /usr/local/bin/virtualenvwrapper.sh
```
####  环境变量配置
还可以将该命令添加到`~/.bashrc`或`~/.profie`等shell启动文件中，以便登陆shell后可直接使用virtualenvwrapper提供的命令。

对于virtualenvwrapper的配置：
``` bash
if [ `id -u` != '0' ]; then

  export VIRTUALENV_USE_DISTRIBUTE=1        # <-- Always use pip/distribute
  export WORKON_HOME=$HOME/.virtualenvs       # <-- Where all virtualenvs will be stored
  source /usr/local/bin/virtualenvwrapper.sh
  export PIP_VIRTUALENV_BASE=$WORKON_HOME
  export PIP_RESPECT_VIRTUALENV=true

fi
```
将上面的配置添加到 `~/.bashrc` 的末尾，然后将下面的命令运行一次：

``` bash
source ~/.bashrc
```

::: tip
对于Windows，需要安装 virtualenvwrapper-win
`pip install virtualenvwrapper-win`
在windows系统环境变量里面增加WORKON_HOME变量，并指定虚拟环境的路径。
:::

### 使用

#### 创建虚拟环境
``` bash
mkvirtualenv env27
```

#### 创建指定解释器的虚拟环境
``` bash
mkvirtualenv -p python3.7 env37
```

#### 启动虚拟环境
``` bash
workon env27
```

#### 退出虚拟环境
``` bash
deactivate
```

#### 删除虚拟环境
``` bash
rmvirtualenv env27
```

#### 其他命令
``` bash
lsvirtualenv    #列举所有的环境。

cdvirtualenv    #导航到当前激活的虚拟环境的目录中，比如说这样您就能够浏览它的 site-packages。

cdsitepackages   # 和上面的类似，但是是直接进入到 site-packages 目录中。

lssitepackages     #显示 site-packages 目录中的内容。
```

## 其他

* 用`pip freeze`查看当前安装版本
``` bash
pip freeze
pip freeze > requirements.txt   # 生成模块和版本文件，便于环境搭建
```
> 这将会创建一个 `requirements.txt` 文件，其中包含了当前环境中所有包及各自的版本的简单列表。您可以使用 `pip list`在不产生requirements文件的情况下， 查看已安装包的列表。这将会使另一个不同的开发者在以后安装相同版本的相同包变得容易。
``` bash
pip install -r requirements.txt   # 安装各个模块
```