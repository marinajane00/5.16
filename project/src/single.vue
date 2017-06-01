<template>
  <div>	
	<!-- 有过渡动画 -->
    <button class="toggle" @click="show.option = !show.option">显示配置项</button>
	<button class="toggle" @click="show.data = !show.data">显示数据</button>
	
	<div class="itemWrap">
	
	<!-- 模板组件 -->
	<mo class='item' v-if="show.mo" :test="test" ></mo>
	
	<!-- 图表组件 -->
    <!-- <ch class='item mould' v-if="show.chart" :test="test"></ch> -->
	
	<transition name="slide-fade">
	<!-- 配置参数组件 -->
	<!-- <op class='item' v-if="show.option" v-model='text'></op> -->
	<op class='item option' v-if="show.option"></op>
	</transition>
	
	<transition name="slide-fade">
	<div v-if="show.data" class="data">
	<!-- 表格组件 -->
	<ta class='item table' v-if="show.table || $store.state.types != 'globe'" ></ta>
	
	<!-- excel组件 -->
	<ex class='item' v-if="show.excel"></ex>
	
	<!-- db组件 -->
	<db class='item' v-if="show.db"></db>
	</div>
	</transition>
	
	</div>
  </div>
</template>

<script>
import store from './vuex/store.js'
import io from './assets/socket.io.js'
//import ch from './components/chart.vue'
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
		mo:true,
		data:true
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
	/*
	var socket = io.connect("http://localhost:7676");
	
	socket.on("clientServer",function(e){
		console.log("event~~~~~~~~~~~~~~~~~~~~~~~~~~~"+e)
		console.log(document.getElementById("video0"))
		//触发事件：ie
		//document.getElementById("fire").fireEvent(e);
		//document.getElementById("fire")[e]();
	})
	*/
  },
  methods:{
	
  },
  components: { op,ta,ex,db,mo },
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
.table{
	height:15rem;
	overflow:auto;
}
.itemWrap{
	position:relative;
}
.option,.data{
	position:absolute;
	top:0;
	background:rgba(255,255,255,1);
}
.toggle{
	border:1px dashed #61accd;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(10px);
  opacity: 0;
}
</style>