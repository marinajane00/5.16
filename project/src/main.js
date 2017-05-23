import Vue from 'vue'
import App from './App.vue'

//vue网络请求
import VueResource from 'vue-resource'
Vue.use(VueResource)

//路由配置
import VueRouter from 'vue-router'
import single from './single.vue'
import mould from './mould.vue'
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
  routes:[
  	{ name:'single', path: '/single', component: single },
  	{ name:'mould', path: '/mould', component: mould }
  ]
})
 
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

//websocket连接
import io from './assets/socket.io.js'

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