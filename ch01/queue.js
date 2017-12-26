/**
 * Created by jerry on 2017/12/22.
 */
function Queue(queueName,redisClient) {//接收队列名和redis客户端对象作为参数
    this.queueName = queueName;//将对列名保存到属性中
    this.redisClient = redisClient;//保存redis客户端对象到属性中
    this.queueKey = 'queues:'+queueName;//设置Redis key名
    this.timeout = 0;//设置timeout属性为0，表示list命令执行后也不超时
}
Queue.prototype.size = function (callback) {//prototype返回Queue的原型引用，和其他编程语言
// 中类的解决方案类似，为Queue建立一个size方法，该方法接收callback作为参数
    this.redisClient.llen(this.queueKey,callback);//由于Redis客户端是异步的，需要传递为llen函数callback作为参数

};
Queue.prototype.push = function (data) {//接收任何字符串
    this.redisClient.lpush(this.queueKey,data);//加入到list的头部
};

Queue.prototype.pop = function (callback) {//
    this.redisClient.brpop(this.queueKey,this.timeout,callback);// 从尾部移除数据
};
exports.Queue = Queue;//将queue.js开放给其他模块调用




