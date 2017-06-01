<template>
  <div>
    <h2>数据库连接 || 接口部分</h2>
	
	<div><input v-model="url" /></div>
	<div><input v-model="api" /></div>
	<button @click="connect">连接</button>
	
  </div>
</template>

<script>
import io from '../assets/socket.io.js'
import store from '../vuex/store'

var URL="http://localhost:7474"
//记得url改变后再次调用
//var socket = io.connect(URL);

export default {
  data() {
    return {
		url:URL,
		api:"articles"
    }
  },
  mounted(){
	var self=this;
	
	/*
	socket.on('notification', function (data) {
		console.log(data)
		//数据库实时更新
		self.$store.commit('changeTable',data[self.api],true)
	});
	*/
	
  },
  methods:{
	connect(){
		//连接数据库：
	}
  }
}
</script>

<style>
</style>