<template>
  <div>

	<h2>图表部分</h2>
	<div id='main' style="width:600px; height:300px;"></div>
	<span>图表类型{{types}}</span>
	<p>vuex frome table</p>
	
	<p>{{ $store.state.myData }}</p>

  </div>
</template>

<script>
import echarts from 'echarts'
import echarts_gl from 'echarts-gl'
import bus from '../assets/eventBus.js'

export default {
  data() {
    return {
		msg:'me',
		option:{
			grid3D: {},
			xAxis3D: {},
			yAxis3D: {},
			zAxis3D: {},
			series: [{
				type: 'scatter3D',
				symbolSize: 50,
				data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
				itemStyle: {
					opacity: 1
				}
			}]
		}
    }
  },

  props:["types"],

  mounted(){
	console.log('chart.vue here')
	var self=this;
	
	var test=echarts.init(document.getElementById("main"));
		test.setOption(this.option);
	
	//组件间通讯
	/*bus.$on('changeparent',function(d){
		this.parentvalue=d
	})*/
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