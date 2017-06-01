<template>
  <div>

	<h2>图表部分</h2>
	
	<!-- <div class='drag' @drop="test.drop($event)" @dragover="test.allowDrop($event)" contenteditable id="wraps"> -->
	<div class="drag">
		<div :id="'main'+index" style="width:600px; height:300px;" draggable="true" @dragstart="test.drag($event)" ></div>
	</div>
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
props:["test","index"],
  mounted(){
	console.log('chart.vue here')
	
	//路由传参 ||  props传参
	console.log(store.state.myData)
	this.option=store.state[store.state.types];
	
	//生成图表
	main=echarts.init(document.getElementById("main"+this.index));
	main.setOption(this.option);
	
	//组件间通讯
	/*bus.$on('changeparent',function(d){
		this.parentvalue=d
	})*/
  },
  methods:{
  
  },
  watch: {
		"$store.state.types" () {
			main=echarts.init(document.getElementById("main"+this.index));
			main.setOption(store.state[store.state.types])
		},
		"$store.state.move" () {
			main=echarts.init(document.getElementById("main"+this.index));
			main.setOption(store.state[store.state.types])
			store.state.move=false;
		},
		"$store.state.dataChanged" () {
			console.log("dataChanged")
			console.log(store.state[store.state.types])
			main=echarts.init(document.getElementById("main"+this.index));
			main.setOption(store.state[store.state.types])
			store.state.dataChanged=false;
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
.drag{
	padding:10px;
	border:3px dashed #000;
	img{
		border:1px solid #000;
	}
}
</style>