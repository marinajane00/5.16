<template>
  <div>
	<button onclick="alert('hei')" id="fire">fire</button>
	
	<!-- 有过渡动画 -->
    <button @click="show.chart = !show.chart">Toggle render</button>
    <transition name="slide-fade">
	<!-- 图表组件 -->
    <ch class='item' v-if="show.chart" :test="test"></ch>
	</transition>
	
	<!-- 模板组件 -->
	<mo class='item' v-if="show.mo" :test="test" ></mo>
	
	<!-- excel组件 -->
	<ex class='item' v-if="show.excel"></ex>
	
	<!-- 配置参数组件 -->
	<!-- <op class='item' v-if="show.option" v-model='text'></op> -->
	<op class='item' v-if="show.option" ></op>
	
	<!-- 表格组件 -->
	<ta class='item' v-if="show.table"></ta>
	
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
import mo from './components/mould.vue'
import db from './components/db.vue'

export default {
  data () {
    return {
	  show:{
		chart:true,
		table:true,
		excel:true,
		db:true,
		option:true,
		mo:true
	  },
	  types:'bar3D',
	  test:{
			allowDrop:function(ev)
		{
			ev.preventDefault();
		},
		drag:function(ev)
		{
		ev.dataTransfer.setData("Text",ev.target.id);

		},
		drop:function(ev)
		{
		ev.preventDefault();

		var e = event || window.event;
					

					
		var data=ev.dataTransfer.getData("Text");
		/*
		//iframe 不可用
		console.log(e.clientX,e.clientY);
		document.getElementById(data).style.left=e.clientX+"px"
		*/
		console.log(ev.target)
		ev.target.appendChild(document.getElementById(data));

		}
	  }
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
	
  },
  components: { ch,op,ta,ex,db,mo },
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>