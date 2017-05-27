<template>
  <div>
    <h2>模板</h2>
	
	<!-- 选择元素属性后新增元素 -->
	<!-- 下拉框方式 -->
	<input list="browsers" id="chose" @change="chose($event.target.value)">
	<datalist id="browsers">
	  <option value="30"></option>
	  <option value="40"></option>
	  <option value="20"></option>
	  <option value="60"></option>
	  <option value="50"></option>
	</datalist>
	<!-- 值域方式 -->
	<input type="range" min="0" max="100" v-model="range">
	<p>值域值：{{range}}</p>
	
	<button @click="shownow=true">show</button>
	<p v-if="shownow">nononono</p>
	<button @click="generate">生成元素</button>
	
	<!-- 这个元素用来克隆绑定的事件 -->
	<div class="added" draggable="true" v-show="child.length>1" @dragstart="test.drag($event)" @click="swing($event)" v-for="(i,index) in child" :id="'added'+index">
		<div :id="'main'+index" style="width:600px; height:300px;" ></div>
	</div>
	<button @click="clear">清空</button>
	
	<!--<p draggable="true" @dragstart="test.drag($event)" @click="swing($event)">测试，可以将我拖动到下方或者图表区域</p>-->
	<!-- 页面容器 -->
	<div class='wrap' @drop="test.drop($event)" @dragover="test.allowDrop($event)" id="wrap">
	<p class='test' >位置一</p><p class="test">位置二</p>
	</div>
	<button @click="done">完成</button>
	<el v-if="show" :test="test" v-for="(item,index) in el" :type="type"></el>
  </div>
</template>

<script>
import echarts from 'echarts'
import echarts_gl from 'echarts-gl'
import store from '../vuex/store'
import io from '../assets/socket.io.js'
import el from './element.vue'

var URL="http://localhost:7474"
//记得url改变后再次调用
var socket = io.connect(URL);
console.log("!!!!!————————————————————————mould")

export default {
  data() {
    return {
		show: true,
		range:50,
		child:[0],
		shownow:false,
		el:[0],
		type:"p"
    }
  },
  props:["test"],
  mounted(){
  	var main=echarts.init(document.getElementById('main'+(this.child.length-1)));
  	this.child.push(main)
  	main.setOption(store.state[store.state.types])
  },
  methods:{
	  chose(size){
	  
		var main=echarts.init(document.getElementById('main'+(this.child.length-1))).setOption(store.state[store.state.types]);
		document.getElementsByClassName("added")[this.child.length-1].style.width=size+'px';
		this.child.push(this.child.length)
		
		/*
		var para=document.getElementsByClassName("added")[0].cloneNode(true);
		var chart=para.firstChild;
		//para.style.width=size;
		//生成图表
		para.id="added"+i;
		chart.id="main"+i;
		*/
		
		/*
		var element=document.getElementById("wrap");
		element.appendChild(para);
		*/
	  },
	  clear(){
		this.child.splice(1,this.child.length);
	  },
	  done(){
	  //上传到后台存储
	  //js部分
	  var strjs="";
	  strjs+="var main=echarts.init(document.getElementById('main1'));main.setOption("+JSON.stringify(store.state[store.state.types])+");"
	  
	  //html部分
	  var str="";
	  str+="<!DOCTYPE html><html><head><meta charset='UTF-8'></head><style></style><body>";
	  str+=document.getElementById("wrap").innerHTML;
	  str+="<script src='../../lib/echarts.js'>";
	  str+="<\/script>";
	  str+="<script src='../../lib/echarts-gl.min.js'>";
	  str+="<\/script>";
	  str+="<script src='test.js'>";
	  str+="<\/script><\/body><\/html>";
	  
	  socket.emit('js', strjs);
	socket.emit('news', str);
	
	    socket.on('my other event', function (data) {
			console.log(data);
	    });
	  	console.log("文件写入完成")
			
	  },
	  swing(e){
			console.log(e.target)
			store.state.types=this.child[1].getOption().series[0].type;
			store.state[store.state.types]=this.child[1].getOption();
	  },
	  callback(){
	  },
	  generate(e){
	  	this.el.push(this.el.length)
	  	this.type="div"
	  }
  },
  components: { el }
}
</script>

<style lang="less">
.wrap{
	padding:10px;
	border:3px dashed #000;
}
.test{
	margin:10px;
	border:1px solid #f00;
}
.five{
	width:50%;
}
</style>