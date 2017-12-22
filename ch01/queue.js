/**
 * Created by jerry on 2017/12/22.
 */
function Queue(queueName,redisClient) {//接收队列名和redis客户端对象作为参数
    this.queueName = queueName;//将对列名保存到属性中
    this.redisClient = redisClient;//保存redis客户端对象到属性中
    this.queueKey = 'queues:'+queueName;//设置Redis key名
    this.timeout = 0;//设置timeout属性为0，表示list命令执行后也不超时
}
Queue.prototype.size = function (callback) {
    this.redisClient.llen(this.queueKey,callback);

}