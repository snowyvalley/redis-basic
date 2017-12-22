/**
 * Created by jerry on 2017/12/21.
 */
var redis = require("redis");
var client = redis.createClient();
function upVote(id) {
    var key = "article:"+id+":votes";
    client.incr(key);
}

function downVote(id) {
    var key = "article:"+id+":votes";
    client.decr(key);
}

function showResults(id) {
    var articleKey = "article:"+id+":java";
    var voteKey = "article:"+id+":votes";
    client.mget([articleKey,voteKey],function (err,replies) {
        console.log('The article[ '+replies[0]+'] has',replies[1],'votes');
    });
}

upVote(1001);
upVote(1002);
upVote(1003);
upVote(1001);
upVote(1001);
upVote(1003);
downVote(1001);
showResults(1001);
showResults(1002);
showResults(1003);
client.quit();