<template>
  <div>
    <h1>{{ msg }}</h1>
	<!-- 显示数据选项 -->
	<div class='block' @click="show.data= show.data==true ? false : true">
		<p class='show'>数据</p>
		<div v-if="show.data">
		<p @click="show.table=true" :class="show.table==true ? 'active' : ''">显示数据</p>
		<p @click="show.excel=true" :class="show.excel==true ? 'active' : ''">拖入excel</p>
		<p @click="show.db=true" :class="show.db==true ? 'active' : ''">连接数据库</p>
		</div>
	</div>
	
	<!-- 显示配置参数 -->
	<div class='option' @click="show.option= show.option==true ? false : true">
		<p class='show'>参数</p>
	</div>
	
	<!-- 图表组件 -->
    <ch :parentvalue="parent" :tablevalue="table"></ch>
	<!-- excel组件 -->
	<div class='excel'><ex></ex></div>
	
	<!-- 配置参数组件 -->
	<op v-if="show.option"></op>
	
	<!-- 表格组件 -->
	<!-- <ta :parentvalue="parent" @changeparent="change"></ta> -->1
	<ta :parentvalue="parent" :tablevalue="table" @changeparent="change"></ta>
	
  </div>
</template>

<script>
//import store from './vuex/store'
import ch from './components/chart.vue'
import op from './components/option.vue'
import ta from './components/table.vue'
import ex from './components/excel.vue'

export default {
  data () {
    return {
      msg: 'App Vue!',
	  show:{
		data:false,
		table:false,
		excel:false,
		db:false,
		option:false
	  },
	  parent:[[1,2],[2,3]],
	  table:[[1,2],[2,3]]
    }
  },
  mounted(){
	console.log('App.vue here')
	//组件间通讯
  },
  methods:{
	change:function(e){
		console.log("this is app")
		this.table=e
	}
  },
  components: { ch,op,ta,ex }
}
</script>

<style scoped>
html,body,p{
	margin:0;
	padding:0;
}
.block,.option{
	display: inline-block;
	float:left;
}
.option{
	float:right;
}
.show{
	padding:.5rem .5rem;
	border:1px solid #333;
	box-shadow: 10px 10px 5px #888888;
}
.show p{
	cursor:pointer;
}
.active{
	color:#ccc;
}
.excel{
	width:600px;
	height: 300px;
}
</style>