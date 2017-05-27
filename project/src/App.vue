<template>
  <div>
	<router-link to="single">选择图表面板</router-link>
	<router-link to="mould">选择模板</router-link>
	<!-- client DB -->
	<!-- <input type="text" v-model="loginName" />
	<input type="password" v-model="loginPassword" />
	<button @click="login">登录</button> -->
	
	<p @click="changeType">改变图表类型</p>
	<p @click="生成页面"></p>
	<router-view></router-view>
  </div>
</template>

<script>
//client DB
//import io from './assets/socket.io.js'
import store from './vuex/store'

export default {
  data () {
    return {
		loginName:"聚鸟科技",
		loginPassword:"jnoos"
    }
  },
  mounted(){
	//路由
	const flag=true;
  	if(flag){
  		this.$router.push('\single');
  	}else{
  		this.$router.push('\mould');
  	}
  },
  methods:{
		login(){
			//client DB
		    /*
			this.$http.get('http://localhost:7474').then((response) => {
				// 响应成功回调
				console.log(response)
				console.log("以上是请求成功数据")
			}, (response) => {
				// 响应错误回调
				console.log(response)
				console.log("出错了~~~~(>_<)~~~~")
			});
			*/
		},
		changeType:function(){
			//组件数据同步
			this.$store.commit('changeTypes',"pie")
		}
  },
  components: {  },
  store:store
}
</script>

<style scoped>
html,body,p{
	margin:0;
	padding:0;
}
</style>