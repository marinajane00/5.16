import Vue from 'vue'
import App from './App.vue'

import io from './assets/socket.io.js'
//控制器空间
		console.log("这里是是指挥部，这里是指挥部，收到，收到")
	var self=this;
	
	
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
