<template>
  <div>

	<h2>图表部分</h2>
	
	<div style="padding:30px;" @drop="drop($event)" @dragover="allowDrop($event)"></div>
	<!-- iframe -->
	<div class='drag' id="div1" @drop="drop($event)" @dragover="allowDrop($event)">
	  <img src="http://www.w3school.com.cn/i/eg_dragdrop_w3school.gif" draggable="true" @dragstart="drag($event)" id="drag1" />
	  <img src="http://www.w3school.com.cn/i/eg_dragdrop_w3school.gif" draggable="true" @dragstart="drag($event)" id="drag2"/>
	</div>
	
	<input list="browsers" id="chose" @change="chose($event.target.value)">
	<datalist id="browsers">
	  <option value="30%"></option>
	  <option value="40%"></option>
	  <option value="20%"></option>
	  <option value="60%"></option>
	  <option value="50%"></option>
	</datalist>
	<p draggable="true" @dragstart="drag($event)" id="p1">hei</p>
	<div class='added' @drop="drop($event)" @dragover="allowDrop($event)" contenteditable data-item="0"></div>
	
	<div class='drag' @drop="drop($event)" @dragover="allowDrop($event)" contenteditable id="wraps">
	<img src="http://s16.sinaimg.cn/middle/54aebfe7g93929b77781f&690" />
	</div>
	<div id='main' style="width:600px; height:300px;" draggable="true" @dragstart="drag($event)" ></div>
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
  methods:{
  chose(size){
	var para=document.getElementsByClassName("added")[0].cloneNode(true);
	para.style.width=size;

	var element=document.getElementById("wraps");
	element.appendChild(para);
  },
	allowDrop(ev)
	{
		ev.preventDefault();
	},
	drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);

},
drop(ev)
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
  },
  watch: {
		"$store.state.types" () {
			main=echarts.init(document.getElementById("main"));
			main.setOption(store.state[store.state.types])
		}
	}
}
</script>

<style lang="less">
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