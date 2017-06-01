<template>
  <div>
    <h2 v-if="els.type=='h2'" style="cursor:pointer;" :style="els.style" draggable="true" @dragstart="test.drag($event)" :id="'h2'+index" v-text="els.text"></h2>
	<p v-if="els.type=='p'" style="cursor:pointer;" :style="els.style" draggable="true" @dragstart="test.drag($event)" :id="'p'+index" v-text="els.text"></p>
	<video v-if="els.type=='video'" style="width:100%;" :src="els.src" controls="controls" draggable="true" @dragstart="test.drag($event)" :id="'video'+index"></video>
	<div v-if="els.type=='div'" class='wrap' style="box-sizing:border-box;" :style="els.style" @drop="test.drop($event)" @dragover="test.allowDrop($event)" :id="'div'+index"></div>
  </div>
</template>

<script>
import io from '../assets/socket.io.js'
import store from '../vuex/store'

export default {
  data() {
    return {
		
    }
  },
  props:["test","els","index"],
  mounted(){
  },
  methods:{
	
  }
}
</script>

<style>
//这里的style不会出现在最终的作品中
.wrap{
	border:1px dashed #f00;
	border-radius:5px;
}
</style>