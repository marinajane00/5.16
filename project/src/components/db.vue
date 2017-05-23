<template>
  <div>
    <h2>数据库连接 || 接口部分</h2>
	<input v-model="url" />
	<input v-model="api" />
	<p>{{$store.state.myData}}</p>
  </div>
</template>

<script>
import io from '../assets/socket.io.js'
import store from '../vuex/store'

export default {
  data() {
    return {
		url:'http://localhost:7474',
		api:"articles"
    }
  },
  mounted(){
	var self=this;
	var socket = io.connect(self.url);
	
	socket.on('notification', function (data) {
		//数据库实时更新
		//self.$store.commit('changeTable',data[self.api])
	});
  }
}
</script>

<style>
</style>