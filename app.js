var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  mysql = require('mysql'),
  connectionsArray = [],
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3309
  }),
  POLLING_INTERVAL = 1000,
  pollingTimer;

// 检查数据库连接是否正常
connection.connect(function(err) {
  // 不出现错误信息，那表示数据库连接成功
  if(err){
	  console.log("出错信息如下")
	  console.log(err);
  }else{
	  console.log("数据库连接成功")
  }
});

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
var pollingLoop = function() {

  // 查询数据库
  var query = connection.query('SELECT * FROM test'),
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
      articles.push(user);
    })
    .on('end', function() {
      // 检查是否有客户端连接，有连接就继续查询数据库
      if (connectionsArray.length) {
        pollingTimer = setTimeout(pollingLoop, POLLING_INTERVAL);

        updateSockets({
          articles: articles
        });
      }
    });

};


// 创建一个websocket连接，实时更新数据
io.sockets.on('connection', function(socket) {

  console.log('当前连接客户端数量:' + connectionsArray.length);
  // 有客户端连接的时候才去查询，不然都是浪费资源
  if (!connectionsArray.length) {
    pollingLoop();
  }

  socket.on('disconnect', function() {
    var socketIndex = connectionsArray.indexOf(socket);
    console.log('socket = ' + socketIndex + ' disconnected');
    if (socketIndex >= 0) {
      connectionsArray.splice(socketIndex, 1);
    }
  });

  console.log('有新的客户端连接!');
  connectionsArray.push(socket);

});

var updateSockets = function(data) {
  // 加上最新的更新时间
  data.time = new Date();
  // 推送最新的更新信息到所以连接到服务器的客户端
  connectionsArray.forEach(function(tmpSocket) {
    tmpSocket.volatile.emit('notification', data);
  });
};