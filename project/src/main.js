import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'


Vue.use(VueResource)


import io from './assets/socket.io.js'
new Vue({
  el: '#app',
  render: h => h(App)
})

// 创建websocket连接
var chat = io.connect('http://localhost:7676/chat')
    , news = io.connect('http://localhost:7676/news');
chat.on('connect', function () {
	chat.emit('hi!');
});
chat.on('ha',function(e){
	console.log(e)
})
news.on('news', function () {
	news.emit('woot');
});


var socket = io.connect('http://localhost:7575');
// 把信息显示到div上
socket.on('notification', function (data) {
	/*console.log(data.articles);
	console.log(data.time);*/
});