<template>
  <div>
	<div class="pannel login" v-if="!pass" >
		<p><input v-model="loginName" /></p>
		<p><input v-model="loginPassword" type="password" /></p>
		<button @click="pass='true'">登陆</button>
	</div>
	<div v-if="pass" class="pannel">
	<router-link to="single">选择图表面板&nbsp;</router-link>
	<router-link to="mould">&nbsp;选择模板</router-link>
	<hr/>
	<!--
	<div class='charts'>
	<div><img src="http://tushuo.baidu.com/dt-ui/asset20160411/common/core/img/addChart/pie1.png" /></div>
	<div><img src="http://echarts-gallery.bj.bcebos.com/xSJUxZ-c6x.png?v=1491894510351" /></div>
	<div><img src="blob:http://localhost:8080/55551b07-727c-46f6-b223-79ba42e5dfd6" /></div>
	</div>
	-->
	<div>
	<button @click="$store.state.types='scatter3D'">三维散点图</button>
	<button @click="$store.state.types='bar3D'">三维柱形图</button>
	<button @click="$store.state.types='pie'">二维饼图</button>
	<button @click="$store.state.types='globe'">三维地球</button>
	<span>&nbsp;或：</span>
	<button @click="changeType">切换图表类型</button>
	</div>
	
	
	<router-view></router-view>
	</div>
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
		loginPassword:"jnoos",
		pass:true
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

<style>
//@import "style.css"
html,body,p{
	margin:0;
	padding:0;
	text-align:center;
}
a{
	text-decoration:none;
	color:#4C7685;
}
.router-link-exact-active.router-link-active{
	font-size:1.2rem;
}
.pannel{
	width:90%;
	padding:1rem;
	margin:0 auto;
	text-align:center;
	border:2px dashed #888;
	border-radius:5px;
}
input,button,textarea{
	text-decoration:none;
	background:rgba(255,255,255,0.1);
	border-radius:2px;
	border:none;
	box-shadow:1px 1px 2px #888;
	color:#61accd;
	padding:.2rem;
	margin-bottom:.5rem;
}
button{
	cursor:pointer;
	font-size:1rem;
}
.login{
	margin-top:20%;
}
.login input,.login button{
	margin-bottom:.5rem;
	font-size:1.5rem;
}

</style>