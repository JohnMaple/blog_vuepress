---
title: PHP验证类-常用数据安全验证
description: PHP验证类，验证数据的安全性，一切前端的提交到服务端的数据都是不安全的，所以需要服务器对各种数据进行验证。
featured_media: /icons/php.png
date: 2017-04-20 20:12:35
post: true
comments: true
humanize: false
tags:
- PHP
---

# PHP验证类-常用数据安全验证
我们知道框架里面基本都会包含有最基本的安全验证，那么平时在做项目中，不一定都是用到的是某种框架，可能是某种自定义的方法，随着自己的业务编写出来的一种MVC模式框架，那么很多类库以及方法都是在业务中不断去完善。所以以下这个验证类，当你用的不是某种框架自带的安全验证，也可以参照以下的方式，作为一些数据的基本验证。

## 说明
此验证类库支持验证用户名、数字、邮箱、url、中文、长度、密码、日期和时间等，你可以很方便的应用到表单提交，作为数据安全验证。以上这么验证规则，一样可以照搬到js中最为前端的验证

## 代码

```php
class Verify{
    public $msg = '';
    /**
     * 是否为空值
     */  
    public function isEmpty($str){
        $str = trim($str);    
        $res =  empty($str) ? true : false;
        $this->msg = $res ? '不能为空！' : '';
        return $res;
    }
    /**
     * 数字验证
     * param:$flag : int是否是整数，float是否是浮点型
     */      
    public function isNum($str,$flag = 'float'){
        if($this->isEmpty($str)) return false;
        if(strtolower($flag) == 'int'){
            $res =  ((string)(int)$str === (string)$str) ? true : false;
        }else{
            $res =  ((string)(float)$str === (string)$str) ? true : false;
        }
        $this->msg = $res ? '' : $str.'不是数字！';
        return $res;
    } 
    /**
     * 名称匹配，如用户名，目录名等
     * @param:string $str 要匹配的字符串
     * @param:$chinese 是否支持中文,默认支持，如果是匹配文件名，建议关闭此项（false）
     * @param:$charset 编码（默认utf-8,支持gb2312）
     */  
    public function isName($str,$chinese = true,$charset = 'utf-8'){
        if($this->isEmpty($str)) return  false;
        if($chinese){
            $match = (strtolower($charset) == 'gb2312') ? "/^[".chr(0xa1)."-".chr(0xff)
            ."A-Za-z0-9_-]+$/" : "/^[x{4e00}-x{9fa5}A-Za-z0-9_]+$/u";
        }else{
            $match = '/^[A-za-z0-9_-]+$/';
        }
        $res =  preg_match($match,$str) ? true : false;
        $this->msg = $res ? '' : $str.'不是一个合法的名字';
        return $res;
    }
    /**
     * 邮箱验证
     */      
    public function isEmail($str){
        if($this->isEmpty($str)) return false;
        $res =  preg_match("/([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?/i",$str) ? true : false;
        $this->msg = $res ? '' : $str.'不是合法邮箱！';
        return $res;
    }
     
    //手机号码验证
    public function isMobile($str){
        if($this->isEmpty($str)) return false;
        $exp = "/^1[3|4|5|7|8][0-9]{9}$/";
        if(preg_match($exp,$str)){
            $res =  true;
        }else{
            $res =  false;
        }
        $this->msg = $res ? '' : $str.'手机号码格式不对！';
        return $res;
    }
    /**
     * URL验证，纯网址格式，不支持IP验证
     */      
    public function isUrl($str){
        if($this->isEmpty($str)) return false;
        $res =  preg_match('#(http://|https://)?(www.)?(\w+\.)+\w+#i',$str) ? true : false;
        $this->msg = $res ? '' : $str.'URL格式不对！';
        return $res;
    }
    /**
     * 验证中文
     * @param:string $str 要匹配的字符串
     * @param:$charset 编码（默认utf-8,支持gb2312）
     */  
    public function isChinese($str,$charset = 'utf-8'){
       if($this->isEmpty($str)) return false;
        $match = (strtolower($charset) == 'gb2312') ? "/^[".chr(0xa1)."-".chr(0xff)."]+$/" : "/^[x{4e00}-x{9fa5}]+$/u";
        $res =  preg_match($match,$str) ? true : false;  
        $this->msg = $res ? '' : $str.'不是一个中文！';
        return $res;    
    }
    /**
     * UTF-8验证
     */      
    public function isUtf8($str){
        if($this->isEmpty($str)) return false;
        $res =  (preg_match("/^([".chr(228)."-".chr(233)."]{1}[".chr(128)."-".chr(191)."]{1}[".chr(128)."-".chr(191)."]{1}){1}/",$word)
        == true || preg_match("/([".chr(228)."-".chr(233)."]{1}[".chr(128)."-".chr(191)."]{1}[".chr(128)."-".chr(191)."]{1}){1}$/",$word)
        == true || preg_match("/([".chr(228)."-".chr(233)."]{1}[".chr(128)."-".chr(191)."]{1}[".chr(128)."-".chr(191)."]{1}){2,}/",$word)
        == true) ? true : false;
        $this->msg = $res ? '' : $str.'不是uft8编码！';
        return $res;  
    }
    /**
     * 验证长度
     * @param: string $str
     * @param: int $type(方式，默认min <= $str <= max)
     * @param: int $min,最小值;$max,最大值;
     * @param: string $charset 字符
    */
    public function length($str,$type=3,$min=0,$max=0,$charset = 'utf-8'){
        if($this->isEmpty($str)) return false;
        $len = mb_strlen($str,$charset);
        switch($type){
            case 1: //只匹配最小值
                $res =  ($len >= $min) ? true : false;
                $this->msg = $res ? '' : "{$str}长度最小必须{$min}个字符";
                break;
            case 2: //只匹配最大值
                $res =  ($max >= $len) ? true : false;
                $this->msg = $res ? '' : "{$str}长度最大必须{$max}个字符";
                break;
            default: //min <= $str <= max
                $res =  (($min <= $len) && ($len <= $max)) ? true : false;
                $this->msg = $res ? '' : "{$str}长度必须在{$min}到{$max}个字符之间";
        }
        return $res;
    }

    /**
     * 验证用户名
     * @param string $value
     * @param int $length
     * @$res =  boolean
     */
    public function isNames($value, $minLen=2, $maxLen=16, $charset='ALL'){
         if($this->isEmpty($value)) return false;
        switch($charset){
            case 'EN': $match = '/^[_\w\d]{'.$minLen.','.$maxLen.'}$/iu';
                break;
            case 'CN':$match = '/^[_\x{4e00}-\x{9fa5}\d]{'.$minLen.','.$maxLen.'}$/iu';
                break;
            default:$match = '/^[_\w\d\x{4e00}-\x{9fa5}]{'.$minLen.','.$maxLen.'}$/iu';
        }
        $res =  preg_match($match,$value);
        $this->msg = $res ? '' : $value.'不是一个合理的用户名！';
        return $res; 
    } 
 
    /**
     * 匹配日期
     * @param string $value
     */      
    public function checkDate($str){
        if($this->isEmpty($str)) return false;
        $dateArr = explode("-", $str);
        if (is_numeric($dateArr[0]) && is_numeric($dateArr[1]) && is_numeric($dateArr[2])) {
            if (($dateArr[0] >= 1000 && $timeArr[0] <= 10000) && ($dateArr[1] >= 0 && $dateArr[1] <= 12) && ($dateArr[2] >= 0 && $dateArr[2] <= 31))
                $res =  true;
            else
                $res =  false;
        }else{
            $res =  false;
        }
        $this->msg = $res ? '' : $str.'不是一个合理的日期格式！';
        return $res; 
    }
    /**
     * 匹配时间
     * @param string $value
     */      
    public function checkTime($str){
        if($this->isEmpty($str)) return false;
        $timeArr = explode(":", $str);
        if (is_numeric($timeArr[0]) && is_numeric($timeArr[1]) && is_numeric($timeArr[2])) {
        if (($timeArr[0] >= 0 && $timeArr[0] <= 23) && ($timeArr[1] >= 0 && $timeArr[1] <= 59) && ($timeArr[2] >= 0 && $timeArr[2] <= 59))
            $res =  true;
        else
            $res =  false;
        }else{
             $res =  false;
        }
        $this->msg = $res ? '' : $str.'不是一个合理的时间格式！';
        return $res; 
    } 

    /**
     * 错误返回
     */
    public function getError(){
        return $this->msg;
    }
}
```

## 使用
```php
$verify  = new Verify(); 
$mobile  = '1008611';  
if(!$verify->isMobile($mobile)){ 
    die($verify->getError()); 
}else{
    echo '正确';
} 
```