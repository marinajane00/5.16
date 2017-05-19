var io=require("socket.io");

//【创建一个Server实例】
function server(callback){
	//var result=io()
	var result=new io();
	callback;
}
//【Server可选参数】
function serverOp(){
	var result=io("7676",{serveClient:false,path:""})
	//var result=io().attach("localhost")
}
//server();
//serverOp();