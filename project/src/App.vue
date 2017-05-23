<template>
  <div>
    <h1>APP 入口</h1>
		<input type="text" v-model="loginName" />
		<input type="password" v-model="loginPassword" />
		<button @click="login">登录</button>
	<div>to single</div>
	<single></single>
  </div>
</template>

<script>
import single from './single.vue'


export default {
  data () {
    return {
		loginName:"聚鸟科技",
		loginPassword:"jnoos"
    }
  },
  mounted(){
  },
  methods:{
	login(){
		this.$http.jsonp('localhost:7373/login',{ credentials: true }).then((response) => {
			// 响应成功回调
			console.log(response)
			console.log("以上是请求成功数据")
		}, (response) => {
			// 响应错误回调
			console.log(response)
			console.log("出错了~~~~(>_<)~~~~")
		});
	}
  },
  components: { single }
}
</script>

<style scoped>
html,body,p{
	margin:0;
	padding:0;
}
</style>