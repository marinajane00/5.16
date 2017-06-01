<template>
  <div>
    <h2>模板</h2>
	
	<!-- 下拉框方式 -->
	<div>
	<span>选择图表宽度新增一个图表：</span>
	<input list="browsers" id="chose" @change="chose($event.target.value)" value="30">
	<datalist id="browsers">
	  <option value="30"></option>
	  <option value="40"></option>
	  <option value="20"></option>
	  <option value="60"></option>
	  <option value="50"></option>
	</datalist>
	</div>
	
	<div>
	<span>填入新增元素的样式：</span>
	<input id="style" value="text-align:center" />
	</div>
	
	<div>
	<input id="title" value="标题" />
	<button @click="generate('h2')">生成h2元素</button>
	</div>
	
	<div>
	<textarea id="graph" placeholder="请输入段落" class="graph"></textarea>
	<button @click="generate('p')">生成p元素</button>
	</div>
	
	<div>
	<button @click="generate('div')">生成div元素</button>
	</div>
	
	<div>
	<button @click="generate('video')">生成video元素</button>...
	<input type="file" @change="file($event)" id="file" v-show="false" />
	</div>
	
	<div>
	<button @click="clear">清空所有！</button>
	</div>
	
	<div>
	<button @click="done">[完成]</button>
	</div>
	
	<!-- 最终作品的页面容器 -->
	<div class='wrap' @drop="test.drop($event)" @dragover="test.allowDrop($event)" id="wrap">
	<el :test="test" v-for="(item,index) in els" :els="els[index]" :index="index"></el>
	</div>
	
	<!-- 生成的页面元素都在下方 -->
	<!-- 这个元素用来克隆图表以及绑定的事件（一定条件下显示） -->
	<!--  <div class="added" draggable="true" v-show="child.length>1" @dragstart="test.drag($event)" @click="swing($event)" v-for="(i,index) in child" :id="'added'+index">
		<div :id="'main'+index" style="width:600px; height:300px;" ></div>
	</div> -->
	
	<ch class='' v-for="i in child" :test="test" :index="index"></ch>
	
  </div>
</template>

<script>
import echarts from 'echarts'
import echarts_gl from 'echarts-gl'
import store from '../vuex/store'
import io from '../assets/socket.io.js'
import el from './element.vue'
import ch from './chart.vue'

var URL="http://localhost:7474"
//记得url改变后再次调用
var socket = io.connect(URL);
console.log("!!!!!————————————————————————mould")

export default {
  data() {
    return {
		child:[0],
		els:[],
		index:0,
		src:""
    }
  },
  props:["test"],
  mounted(){
  /*
  	var main=echarts.init(document.getElementById('main'+(this.child.length-1)));
  	this.child.push(main)
  	main.setOption(store.state[store.state.types])
*/
  },
  methods:{
	  chose(size){
		//新增一个图表
	  
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
		this.els.length=0;
	  },
	  done(){
	  //上传到后台存储
	  //js部分
	  var strjs="";
	  //temp:
	  strjs+="if(document.getElementById('main"+(this.index-1)+"')){var main=echarts.init(document.getElementById('main"+(this.index-1)+"'));main.setOption("+JSON.stringify(store.state[store.state.types])+");}";
	  strjs+="if(video"+(this.index-1)+"){video"+(this.index-1)+".src='test.mp4';";
	  strjs+='var socket = io.connect("http://localhost:7676");'
	  strjs+='socket.on("clientServer",function(e){'+
		'video'+(this.index-1)+'.play()})}'
	  
	  //html部分
	  var str="";
	  str+="<!DOCTYPE html><html><head><meta charset='UTF-8'></head><style></style><body>";
	  str+=document.getElementById("wrap").innerHTML;
	  str+="<script src='../../lib/echarts.js'>";
	  str+="<\/script>";
	  str+="<script src='../../lib/echarts-gl.min.js'>";
	  str+="<\/script>";
	  str+="<script src='../src/assets/socket.io.js'><\/script>";
	  str+="<script src='test.js'>";
	  str+="<\/script><\/body><\/html>";
	  
	  socket.emit('news', str);	  
	  console.log("html down")
	  socket.emit('js', strjs);
	  console.log("js down")
			
	  },
	  swing(e){
			console.log(e.target)
			store.state.types=this.child[1].getOption().series[0].type;
			store.state[store.state.types]=this.child[1].getOption();
	  },
	  generate(e){
	  	if(e == 'video'){
			file.click();
		}else if(e == "h2"){
			this.els.push({type:e,text:title.value,style:style.value})
			style.value=""
		}else if(e == "p"){
			this.els.push({type:e,text:graph.value,style:style.value})
		}else{
			this.els.push({type:e,style:style.value})
			style.value=""
		}
		this.index++;
	  },
	  file(e){
		socket.emit('video', e.target.files[0]);	
		console.log("video down")
		this.els.push({type:"video",src:window.URL.createObjectURL(e.target.files[0]),style:style.value})
	  }
  },
  components: { el,ch }
}
</script>

<style>
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
.graph{
	height:3rem;
}
</style>