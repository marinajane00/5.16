var http = require('http'), io = require('socket.io');
//创建server
var server = http.createServer(function(req, res){ 
  // Send HTML headers and message
  res.writeHead(200,{ 'Content-Type': 'text/html' }); 
  res.end('<h1>Hello Socket Lover!</h1>');
});
var i=0;
//端口8000
server.listen(7676);
//创建socket
var main = io.listen(server);

main.sockets.on('connection', function(socket) {
	console.log("请求次数"+i)
	  //1,控制器正发送id
	  socket.on("client",function(e){
		  //2,让模板识别id
		  console.log("监听client"+e)
		  
		  socket.broadcast.emit("clientServer",e)
	  });
	  
	i++;
});
//命名空间
/*
var main = io.listen(server);
//添加连接监听
var chat = main
  .of('/chat')
  .on('connection', function (socket) {
	  chat.emit('ha',{ma:'ma'})
	  
	  
	  //1,控制器正发送id
	  chat.on("sid",function(e){
		  //theId=e;
		  //2,让模板识别id
		  console.log("监听sid")
		  chat.emit("tid",e)
	  });
	  //5,控制器发送指令
	  chat.on("do",function(e){
		  console.log("监听tdo")
		  chat.emit("tdo",e)
	  })
	  //3,模板识别之后
	  chat.on("checkedId",function(e){
		  console.log("监听checkedId")
		  if(e == true){
			  //4,告诉控制器
			  chat.emit("result",true)
		  }
	  })
	 
	  
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });

    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = main
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
 */
 
 
/*
io.on('connection', function (socket) {
  socket.on('message', function () { console.log("message")});
  socket.on('disconnect', function () {console.log("disconnect") });

var mysql = require('mysql'),
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
var pollingLoop = function(data,names) {
console.log(names)
  // 查询数据库
  console.log("insert into test("+names[0]+","+names[1]+")values ("+data[0][names[0]]+","+data[0][names[1]]+");")
  var query = connection.query("insert into test("+names[0]+","+names[1]+")values ('"+data[0][names[0]]+"','"+data[0][names[1]]+"');");
    //articles = []; // 用于保存查询结果

  // 查询结果监听
  query
    .on('error', function(err) {
      // 查询出错处理
      console.log(err);
    })
    .on('result', function(user) {
      // 加入查询到的结果到articles数组
	  console.log(user)
    })
    .on('end', function() {
      // 检查是否有客户端连接，有连接就继续查询数据库
      if (connectionsArray.length) {
        console.log("此处可进行DB长轮询")
      }
    });

};
});
*/