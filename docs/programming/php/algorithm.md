---
title: PHP常见算法或函数
description: PHP的一些常用算法或函数，比如：排序算法，字符串处理，多维数组处理等；这里做一些归纳，方便以后工作可能用得到。
featured_media: /icons/php.png
date: 2018-01-15 10:20:15
post: true
comments: true
humanize: false
tags:
- PHP
- Algorithm
---

# PHP常见算法或函数
PHP的一些常用算法或函数，比如：排序算法，字符串处理，多维数组处理等；这里做一些归纳，方便以后工作可能用得到。

## 排序算法
排序算法是学习编程语言，接触算法的基本算法，初级phper还是要掌握的。

### 冒泡排序
冒泡排序（Bubble Sort，台湾译为：泡沫排序或气泡排序）是一种简单的排序算法。它重复地走访过要排序的数列，依次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

#### 步骤

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

```php
function bubble_sort($arr) {
    $len = count($arr);
    // 该层循环控制 需要冒泡的轮数
    for($i = 0; $i < $len-1; $i++){
        // 该层循环用来控制每轮 冒出一个数 需要比较的次数
        for($j = $i+1; $j < $len; $j++) {
            if($arr[$j] < $arr[$i]) {
                $temp = $arr[$i];
                $arr[$i] = $arr[$j];
                $arr[$j] = $temp;
            }
        }
    }
    return $arr;
}
```

### 选择排序
选择排序(Selection sort)是一种简单直观的排序算法。它的工作原理如下。首先在未排序序列中找到最小元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小元素，然后放到排序序列末尾。以此类推，直到所有元素均排序完毕。

```php
function select_sort($arr) {
    // 实现思路 双重循环完成，外层控制轮数，当前的最小值。内层 控制的比较次数
    $len = count($arr);
    for($i = 0; $i < $len; $i++) {
        // 先假设最小的值的位置
        $k = $i;
        for($j = $i+1; $j < $len; $j++) {
            // $arr[$k] 是 当前已知的最小值
            if($arr[$j] < $arr[$k])
               $k = $j;   // 比较，发现更小的,记录下最小值的位置；并且在下次比较时，应该采用已知的最小值进行比较。
        }
        // 已经确定了当前的最小值的位置，保存到$p中。
        // 如果发现 最小值的位置与当前假设的位置$i不同，则位置互换即可
        if($k != $i) {
            $temp = $arr[$i];
            $arr[$i] = $arr[$k];
            $arr[$k] = $temp;
        }
    }
    return $arr;
}
```
### 插入排序
插入排序（Insertion Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

#### 步骤
1. 从第一个元素开始，该元素可以认为已经被排序
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
5. 将新元素插入到该位置中
6. 重复步骤2

```php
function insert_sort($arr) {
    $len = count($arr);
    for($i = 1; $i < $len; $i++) {
        // 获得当前需要比较的元素值。
        $tmp = $arr[$i];
        // 内层循环控制 比较 并 插入
        for ($j = $i - 1; $j >= 0; $j--) {
             // $arr[$i];//需要插入的元素; $arr[$j];//需要比较的元素
            if ($tmp < $arr[$j]) {
                // 发现插入的元素要小，交换位置
                // 将后边的元素与前面的元素互换
                $arr[$j + 1] = $arr[$j];
                // 将前面的数设置为 当前需要交换的数
                $arr[$j] = $tmp;
            } else {
                // 如果碰到不需要移动的元素
                // 由于是已经排序好是数组，则前面的就不需要再次比较了。
                break;
            }
        }
    }
    return $arr;
}
```

### 快速排序
快速排序是由东尼·霍尔所发展的一种排序算法。在平均状况下，排序 n 个项目要Ο(n log n)次比较。在最坏状况下则需要Ο(n2)次比较，但这种状况并不常见。事实上，快速排序通常明显比其他Ο(n log n) 算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来，且在大部分真实世界的数据，可以决定设计的选择，减少所需时间的二次方项之可能性。

#### 步骤
- 从数列中挑出一个元素，称为 “基准”（pivot），
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。
- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

```php
function quick_sort($arr) {
    if(!is_array($arr)) return false;
    $len = count($arr);
    // 递归出口:数组长度为1，直接返回数组
    if($len<=1) return $arr;
    // 数组元素有多个,则定义两个空数组
    $left_arr = $right_arr = [];
    $base = $arr[0];

    // 使用for循环进行遍历，把第一个元素当做比较的对象
    for($i = 1; $i < $n; $i++) {
        if($arr[$i] <= $base)
            $left_arr[] = $arr[$i];
        else
            $right_arr[] = $arr[$i];
    }

    // 递归调用
    $left_arr = quick_sort($left_arr);
    $right_arr = quick_sort($right_arr);
    // 将所有的结果合并
    return array_merge($left_arr, array($key), $right_arr);
}
```

### 归并排序
归并操作(merge)，也叫归并算法，指的是将两个顺序序列合并成一个顺序序列的方法。
如　设有数列{6，202，100，301，38，8，1}
初始状态：6,202,100,301,38,8,1
第一次归并后：{6,202},{100,301},{8,38},{1}，比较次数：3；
第二次归并后：{6,100,202,301}，{1,8,38}，比较次数：4；
第三次归并后：{1,6,8,38,100,202,301},比较次数：4；
总的比较次数为：3+4+4=11；
逆序数为14；
归并排序是稳定的排序，速度仅次于快速排序

```php
function all_merge_sort($array=[]){
    $count = count($array);
    // 递归结束条件,到达这步的时候,数组就只剩下一个元素了,也就是分离了数组
    if ($count<=1){
        return $array;
    }
    $mid = intval($count/2);

    // 拆分数组0-mid这部分给左边left_array
    $left_array = array_slice($array, 0, $mid);

    // 拆分数组mid-末尾这部分给右边right_array
    $right_array = array_slice($array, $mid);

    // 左边拆分完后开始递归合并往上走
    $left_array = all_merge_sort($left_array);

    // 右边拆分完毕开始递归往上走
    $right_array = all_merge_sort($right_array);

    // 合并两个数组,继续递归
    $return_array = merge_sort($left_array,$right_array);
    return $return_array;
}

// merge函数将指定的两个有序数组(arr1,arr2)合并并且排序
function merge_sort($left_array, $right_array){
    $return_array = [];
    while (count($left_array) && count($right_array)){
        // 这里不断的判断哪个值小,就将小的值给到arrC,但是到最后肯定要剩下几个值,
        // 不是剩下arrA里面的就是剩下arrB里面的而且这几个有序的值,肯定比arrC里面所有的值都大所以使用
        $return_array[] = $left_array[0] < $right_array[0] ? array_shift($left_array): array_shift($right_array);
    }
    return array_merge($return_array, $left_array, $right_array);
}

$array=[12,5,4,32,56,87,4,11,2,0];
print_r(json_encode(all_merge_sort($array)));
```

### 顺序查找
从数组的第一个元素开始一个一个向下查找，如果有和目标一致的元素，查找成功；如果到最后一个元素仍没有目标元素，则查找失败。

```php
function search($arr, $val){
    foreach ($arr as $k => $v) {
        if($v == $val) {
            return $k ;
        }
    }
    
    return -1 ;
}
```

### 二分查找
假设数据是按升序排序的，对于给定值x，从序列的中间位置开始比较，如果当前位置值等于x，则查找成功；若x小于当前位置值，则在数列的前半段中查找；若x大于当前位置值则在数列的后半段中继续查找，重复以上的步骤，直到找到为止。（数据量大的时候使用）

```php
// 递归查找
function bin_search($arr, $start, $end, $value) {
    if($start > $end)
        return false;
    else {
        $mid = floor(($start + $end)/2);
        if($value == $arr[$mid])
            return $mid;
        elseif($value < $arr[$mid])
            return bin_search($arr, $start, $mid-1, $value);
        else
            return bin_search($arr, $mid+1, $end, $value);
    }
}
```
```php
// 非递归查找
function bin_search($arr, $start, $end, $value) {
    while($start <= $end) {
        $mid = floor(($start + $end)/2);
        if($value == $arr[$mid])
            return $mid;
        elseif($value < $arr[$mid])
            $end = $mid-1;
        else
            $start = $mid+1;
    }
    return false;
}
```

## 工具函数
一些简单的功能封装成工具函数

### 无限极分类
```php
// 递归
function getTree($array, $pid =0, $level = 0){
    // 声明静态数组,避免递归调用时,多次声明导致数组覆盖
    static $list = [];
    foreach ($array as $key => $value){
        // 第一次遍历,找到父节点为根节点的节点 也就是pid=0的节点
        if ($value['pid'] == $pid){
            // 父节点为根节点的节点,级别为0，也就是第一级
            $value['level'] = $level;
            // 把数组放到list中
            $list[] = $value;
            // 把这个节点从数组中移除,减少后续递归消耗
            unset($array[$key]);
            // 开始递归,查找父ID为该节点ID的节点,级别则为原级别+1
            getTree($array, $value['id'], $level+1);
        }
    }
    return $list;
}
```
```php
// 引用
function generateTree($array){
    //第一步 构造数据
    $items = [];
    foreach($array as $value){
        $items[$value['id']] = $value;
    }
    //第二部 遍历数据 生成树状结构
    $tree = [];
    foreach($items as $key => $value){
        if(isset($items[$item['pid']])){
            $items[$item['pid']]['children'][] = &$items[$key];
        }else{
            $tree[] = &$items[$key];
        }
    }
    return $tree;
}
```

### 生成特定key的关联数组
```php
function array_under_reset($array, $key, $type=1){
    if (is_array($array)){
        $tmp = [];
        foreach ($array as $v) {
            if ($type === 1){
                $tmp[$v[$key]] = $v;
            }elseif($type === 2){
                $tmp[$v[$key]][] = $v;
            }
        }
        return $tmp;
    }else{
        return $array;
    }
}
```

### 获取客户端ip
```php
function get_client_ip() {
    $ip = false;
    // 客户端IP 或 NONE
    if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }
    // 多重代理服务器下的客户端真实IP地址（可能伪造）,如果没有使用代理，此字段为空
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
        if ($ip) {
            array_unshift($ips, $ip);
            $ip = false;
        }
        for ($i = 0; $i < count($ips); $i++) {
            preg_match("/^(10│172.16│192.168)./i", $ips[$i], $matchs);
            if (empty($matchs)) {
                $ip = $ips[$i];
                break;
            }
        }
    }

    // 客户端IP 或 (最后一个)代理服务器 IP
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}
```

### 生成随机字符串
```php
// 生成随机字符串
function generateNonceStr($length = 10) { 
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    $randomStr = ''; 
    for ($i = 0; $i < $length; $i++) { 
        $randomStr .= $characters[rand(0, strlen($characters) - 1)]; 
    } 
    return $randomStr; 
}
```