/**
 * Created by jerry on 2017/12/25.
 */
var redis = require("redis");
var client = redis.createClient();
var queue = require("./queue");//引入 queue.js
var logsQueue = new queue.Queue("logs",client);
var MAX = 5;
for (var i = 0;i<MAX;i++){
    logsQueue.push("Hello world #" +i);
}
console.log("Created "+MAX + " logs");//
client.quit();