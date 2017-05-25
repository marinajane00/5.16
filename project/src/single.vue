<template>
  <div>
	<button onclick="alert('hei')" id="fire">fire</button>
	<!-- 图表组件 -->
    <ch class='item' v-if="show.chart" :types="types" ></ch>
	
	<!-- excel组件 -->
	<ex class='item' v-if="show.excel"></ex>
	
	<!-- 配置参数组件 -->
	<!-- <op class='item' v-if="show.option" v-model='text'></op> -->
	<op class='item' v-if="show.option" ></op>
	
	<!-- 表格组件 -->
	<ta class='item' v-if="show.table" @toSingle="toSingle"></ta>
	
	<!-- db组件 -->
	<db class='item' v-if="show.db"></db>
	
  </div>
</template>

<script>
import store from './vuex/store.js'
import io from './assets/socket.io.js'
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
	//控制器空间
	console.log("这里是空军部，这里是空军部，请指挥，请指挥")
	// 创建websocket连接
	var self=this;
	var socket = io.connect("http://localhost:7676");
	
	//socket.emit("sid",133);

	socket.on("tid",function(e){
		console.log("event"+e)
		//只有ie支持 = =|||
		//document.getElementById("fire").fireEvent(e);
		
	})
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


//拖拽
</script>

<style scoped>
html,body,p{
	margin:0;
	padding:0;
}
.item{
	border:1px solid #000;
}
</style>