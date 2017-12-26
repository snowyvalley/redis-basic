/**
 * Created by jerry on 2017/12/26.
 */
var redis = require("redis");
var client = redis.createClient();

function saveLink(id,author,title,link) {
    //使用hmset建立一个保存多个域的hash
    client.hmset("link:"+id,"author",author,"title",title,"link",link,"score",0);
}

function upVote(id) {
    client.hincrby("link:"+id,"score",1);//将票数加1
}

function downVote(id) {
    client.hincrby("link:"+id,"score",-1);//将票数减1，在hash中没有hdecryb方法，可以通过传递负值的方式实现该功能

}

function showDetails(id) {
    client.hgetall("link:"+id,function (err,replies) {
        console.log("Title:"+replies['title']);
        console.log("Author:"+replies['author']);
        console.log("Link:"+replies['link']);
        console.log("Score:"+replies['score']);
        console.log("---------------------------------------")
    });
}

saveLink(111,"jerry","jerry test link abc","http://www.abc.cn/jerry");
upVote(111);
upVote(111);
saveLink(112,"petter","How to driver a car","http://www.abc.cn/driver");
upVote(112);
upVote(112);
downVote(112);
showDetails(111);
showDetails(112);
client.quit();




























