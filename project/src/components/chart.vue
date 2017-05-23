<template>
  <div>

	<h2>图表部分</h2>
	<div id="drag" style="padding:20px; border:1px solid #000" draggable="true"><div id='main' style="width:600px; height:300px;"></div></div>
	<span>图表类型{{types}}</span>
	<p draggable="true">store: {{$store.state.types}}</p>

  </div>
</template>

<script>
import echarts from 'echarts'
import echarts_gl from 'echarts-gl'
import bus from '../assets/eventBus.js'
import store from '../vuex/store'

var main;

export default {
  data() {
    return {
		option:{}
    }
  },

  props:["types"],

  mounted(){
	console.log('chart.vue here')
	
	//路由传参 ||  props传参
	console.log(store.state.myData)
	this.option=store.state[this.types];
	
	//生成图表
	main=echarts.init(document.getElementById("main"));
	main.setOption(this.option);
	console.log(document.getElementById("main"))
	
	//组件间通讯
	/*bus.$on('changeparent',function(d){
		this.parentvalue=d
	})*/
  },
  watch: {
		"$store.state.types" () {
			main.setOption(store.state[store.state.types])
		}
	}
}
</script>

<style>
#main{
	width:50%;
	height:30%;
	margin:0 auto;
}
</style>