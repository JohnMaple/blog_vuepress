---
title: Redis 队列案例
description: 
featured_media: /icons/redis.png
date: 2018-11-25 21:42:17
post: true
comments: true
humanize: false
tags:
- Nosql
- Redis
- PHP
---

# Redis 队列案例
那么关于Redis的队列和栈，理解就是队列是先进先出，而栈是先进后出。大家基本应该都知道。再形象点就是队列像管道两端都是通的，从头的一端进去，从尾部另一端出来，所以就是先进先出。而栈就像试管，从头进去后，另一端不是通的出不来，想要出来，就得等后面进来的都出去，才能出来，所以就是先进后出。

队列的运用，很多场合很有必要，可以将一些业务逻辑比较耗时的丢到队列中，一些业务耗性能的丢到队列中。比如公司活动，像用户群发邮件，再如抢购下单等，这些都会在并发情况下，耗时间也影响性能。

以下是一个从公司项目中提取出来的，可以看一下大概流程思想，不同业务场合固然业务逻辑不一样。

``` php
/**
 * 这是一个出队列与入队列的类
 */
class MQRedisService extends BaseService
{

    /**
     * @var MQRedisService
     */
    private static $self = NULL;

    /**
     * @static
     * @return MQRedisService
     */
    public static function instance()
    {
        if (self::$self == NULL) {
            self::$self = new self;
        }
        return self::$self;
    }

    /**
     * @var Redis
     */
    private $oRedis;

    /**
     * @var string
     */
    private $sQName = 'default';

    public function __construct()
    {
        if (!class_exists('Redis')) {
            throw new Exception('php-redis can not work',ErrorCodeEnum::STATUS_SUCCESS_DO_ERROR_KV);
        }

        $redisHost = Config::get('database.redis.default.host');
        $redisPort = Config::get('database.redis.default.port');

        $this->oRedis = new Redis();
        $this->oRedis->connect($redisHost, $redisPort);
    }

    /**
     * 设置一个队列要缓存的名字
     * @param $sName
     */
    public function setQName($sName)
    {
        $this->sQName = $sName;
    }

    /**
     * 入栈 顶（左）
     * @param $value
     * @return int
     */
    public function push($value)
    {
        return $this->oRedis->lPush($this->sQName, $value);
    }

    /**
     * 出栈 底（右）
     * @return string
     */
    public function pop()
    {
        return $this->oRedis->rPop($this->sQName);
    }

```
接下来是根据自己的业务逻辑来调用

``` php
/**
 * demo:
 * MailService::instance()->sendByMQ(
 * 'emails.welcome',
 * array('data' => array(1,2,3,'111111')),
 * '344238128@qq.com',
 * 'ethan',
 * 'Welcome!')
 *
 */
class MailService extends BaseService
{
    /**
     * @var MailService
     */
    private static $self = NULL;

    /**
     * @static
     * @return MailService
     */
    public static function instance()
    {
        if (self::$self == NULL) {
            self::$self = new self;
        }

        return self::$self;
    }

    /**
     * @var MQRedisService
     */
    private $oMQService = NULL;

    public function __construct()
    {

    }

    private function processMQService()
    {
        $this->oMQService = MQRedisService::instance();
        $this->oMQService->setQName('sendEmail');    //设置一个队列要缓存的名字  
    }

    /**
     * 直接发送
     * @param $sView
     * @param $aDataForView
     * @param $callback
     * @return mixed
     */
    public function send($sView, $aDataForView, $callback)
    {
        return Mail::send($sView, $aDataForView, $callback);
    }

    /**
     * 塞入队列
     * @param $sView
     * @param $aDataForView
     * @param $sMailToEmail
     * @param $sMailToName
     * @param $sSubject
     * @return mixed
     */
    public function sendByMQ($sView, $aDataForView, $sMailToEmail, $sMailToName, $sSubject)
    {
        self::processMQService();

        $rawParams = array(
            'sView'        => $sView,
            'aDataForView' => $aDataForView,
            'sMailToEmail' => $sMailToEmail,
            'sMailToName'  => $sMailToName,
            'sSubject'     => $sSubject,
        );
        $request = VO_Bound::Bound($rawParams, NEW VO_Request_SendEmail());    //绑定数据格式为对象，可以不绑定

        return $this->oMQService->push(serialize($request));                   //序列化数据并从头部塞入数据
    }

    /**
     * 运用队列发送
     * @return mixed
     *
     * @todo log it
     */
    public function processMailWithMQ()
    {
        self::processMQService();

        while (TRUE) {
            $result = self::_getMailPop();

            if (!$result) return TRUE;

            self::send($result->sView, $result->aDataForView, function ($m) use ($result) {
                $m->to($result->sMailToEmail, $result->sMailToName)->subject($result->sSubject);
                $array = array(
                    'data'=>$result->sMailToEmail
                );
                LogService::instance()->setLog('debug','发送邮件:',$array);    //记录日志
            });
        }

        return TRUE;
    }

    /**
     * @return VO_Request_SendEmail
     */
    private function _getMailPop()
    {
        $result = $this->oMQService->pop();     //从尾部获取一个
        if (!$result) return FALSE;

        return unserialize($result);           //反序列化数据
    }
```