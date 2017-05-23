<template>
  <div>
  
    <h1>单个chart 入口</h1>
	
	<div class='chartWrap'>
	
	<!-- 图表组件 -->
    <ch class='item' v-if="show.chart" :types="types" ></ch>
	
	<!-- excel组件 -->
	<ex class='item' v-if="show.excel"></ex>
	
	</div>
	
	<!-- 配置参数组件 -->
	<op class='item' v-if="show.option"></op>
	
	<!-- 表格组件 -->
	<ta class='item' v-if="show.table" @toSingle="toSingle"></ta>
	
	<!-- db组件 -->
	<db class='item' v-if="show.db"></db>
	
  </div>
</template>

<script>
import store from './vuex/store.js'
import ch from './components/chart.vue'
import op from './components/option.vue'
import ta from './components/table.vue'
import ex from './components/excel.vue'
import db from './components/db.vue'

export default {
  data () {
    return {
	  show:{
		chart:true,
		table:true,
		excel:true,
		db:true,
		option:true
	  },
	  types:'bar3D'
    }
  },
  mounted(){
  },
  methods:{
	toSingle:function(e){
		console.log("toSingle")
		console.log(e)
	}
  },
  components: { ch,op,ta,ex,db },
  store:store
}
</script>

<style scoped>
html,body,p{
	margin:0;
	padding:0;
}
.chartWrap{
	width:100%;
	height: 500px;
}
.item{
	border:1px solid #000;
	width:600px;
	height:300px;
	float:left;
}
</style>