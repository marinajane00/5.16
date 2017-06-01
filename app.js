var app = require('http').createServer(handler),//http,socket,fs模块
  io = require('socket.io').listen(app),
  fs = require('fs'),
  connectionsArray = [];//连接的客户端数量
/*  mysql = require('mysql'),//数据库模块
  
  connection = mysql.createConnection({//1，连接的数据库
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3309
  }),*/
/*  MongoClient = require('mongodb').MongoClient,//得到mongo的客户端
  DB_CONN_STR = 'mongodb://123.207.222.219:27017/users',//mongo的ip及数据库
  POLLING_INTERVAL = 1000,//长轮询的时间
  pollingTimer;//长轮询
*/
//2， 检查数据库连接是否正常
/*connection.connect(function(err) {
  // 不出现错误信息，那表示数据库连接成功
  if(err){
	  console.log("出错信息如下")
	  console.log(err);
  }else{
	  console.log("数据库连接成功")
  }
});
*/
/*
function db(tb,operation,str,callback){
MongoClient.connect(DB_CONN_STR, function(err, db) {
	if(err)console.log(err);
    console.log("连接数据库："+DB_CONN_STR+"成功！");
	console.log("当前表为："+tb);
	console.log("当前操作为："+operation);
	
	var collection = db.collection(tb);//连接到表
	collection.find(str).toArray(function(err, result) {
		if(typeof (callback) =='function'){
		callback(result)
		db.close();
		}
	 });
});
}
db("video","find","{name:''}",function(data){
	console.log(data)
})
*/
//http处理
//启动HTTP服务，绑定端口8080
app.listen(7474);

/*
fs.readFile("https://marinajane00.github.io/node/my_http.js",function(err,data){
	if(err){
		console.log(err)
		return;
	}
	console.log(data)
})
*/

// 加载客户端首页
function handler(req, res) {
	res.writeHead(200,{"Access-Control-Allow-Origin":"*"});
    res.end();

}

/*
 * 这个就是实现主要功能的方法，间隔3秒去查询数据库表，有更新就推送给客户端
 */
//var pollingLoop = function() {
var pollingLoop = function(data) {
/*
  var query = connection.query('SELECT * FROM VIEW1'),//3，查询数据库
    articles = []; // 用于保存查询结果

  // 查询结果监听
  query
    .on('error', function(err) {
      // 查询出错处理
      console.log(err);
      updateSockets(err);
    })
    .on('result', function(user) {
      // 加入查询到的结果到articles数组
	  //console.log(user)
      articles.push(user);//4，存储到一个结果中
    })
    .on('end', function() {
      // 检查是否有客户端连接，有连接就继续查询数据库
      if (connectionsArray.length) {
        pollingTimer = setTimeout(pollingLoop, POLLING_INTERVAL);//长轮询

        updateSockets({
          articles: articles//5，将结果返回并进行数据库长轮询
        });
      }
    });
	*/
	
	//保存文件
	fs.writeFile("./project/public/test.html", data, function (err) {

	  if (err) throw err;
	  console.log('写入完成');
	});
	

};


// 创建一个websocket连接，实时更新数据
io.sockets.on('connection', function(socket) {

  console.log('当前连接客户端数量:' + connectionsArray.length);
  // 有客户端连接的时候才去查询，不然都是浪费资源
  if (!connectionsArray.length) {
	  
	socket.on('news', function (data) {
		
		//上传文件至服务器
		pollingLoop(data);
		console.log("写入html完成");
		//6，新的客户端连接后，将执行数据库轮询
		//pollingLoop();
		
	});
	
	socket.on('js', function (data) {
		fs.writeFile("./project/public/test.js", data, function (err) {
		  if (err) throw err;
		  console.log('写入js完成');
		});
	});
	
	socket.on('video', function (data) {
		fs.writeFile("./project/public/test.mp4", data, function (err) {
		  if (err) throw err;
		  console.log('写入video完成');
		});
	});
	
  }

  socket.on('disconnect', function() {
    var socketIndex = connectionsArray.indexOf(socket);
    console.log('socket = ' + socketIndex + ' disconnected');
    if (socketIndex >= 0) {
      connectionsArray.splice(socketIndex, 1);//客户端失去连接后从数组中“pop”该客户端出来
    }
  });

  console.log('有新的客户端连接!');
  connectionsArray.push(socket);//push新的客户端进数组

});

var updateSockets = function(data) {
  // 加上最新的更新时间
  data.time = new Date();
  // 推送最新的更新信息到所以连接到服务器的客户端
  connectionsArray.forEach(function(tmpSocket) {
    tmpSocket.volatile.emit('notification', data);//时间“交流”
  });
};