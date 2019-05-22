---
title: PHP文件缓存
description: PHP文件缓存类，用于文件缓存
featured_media: /icons/php.png
date: 2017-08-05 15:30:20
post: true
comments: true
humanize: false
tags:
- PHP
- Cache
---
# PHP文件缓存
一个简单的文件缓存类：
``` php
/**
 * 定义FileCache 类
 * 用于文件缓存
 * @package cache
 */

class FileCache
{
    public $cache_dir = '/cache';
    
    public static $self = null;
    public static function instance()
    {
    	if(self::$self == null)
	{
		self::$self = new self;
	}
	return self::$self;
    }

    /**
     * 写入缓存
     *
     * @param string $key
     * @param mixed $data
     * @param int $life_time  //半个小时
     */
    function set($key, $data,  $life_time = 1800)
    {
        $path = $this->path($key);

        $content = array(
            'expired' => time() + $life_time,
            'data'    => $data,
        );
        $content = '<!--?php return ' . var_export($content, true) . ';';

        // 写入缓存，并去掉多余空格
        file_put_contents($path, $content, LOCK_EX);
        @chmod($path, 0777);
        clearstatcache();
    }

    /**
     * 读取缓存，失败或缓存撒失效时返回 false
     * @param string $key
     * @return mixed
     */
    function get($key)
    {
	      $path = $this->path($key);

        if (!is_file($path)) { return false; }

        $data = include($path);
        if (!is_array($data) || !isset($data['expired'])) return false;

        return ($data['expired'] > time()) ? $data['data'] : false;
    }

    /**
     * 删除指定的缓存
     * @param string $key
     */
    function delete($key)
    {
        $path = $this->path($key);
        if (is_file($path)) { unlink($path); }
    }

    /**
     * 确定缓存文件名
     *
     * @param string $key
     *
     * @return string
     */
    function path($key)
    {
    	$this->cache_dir = rtrim($this->cache_dir, '/\'');
        return $this->cache_dir . DS . 'cache_' . md5($key) . '_data.php';
    }
}
```