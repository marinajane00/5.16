<template>
  <div>
	<div id='main'></div>
	<span v-html='msg'></span>
  </div>
</template>

<script>
import exgl from 'echarts-gl'

import bus from '../assets/eventBus.js'
console.log(exgl)

export default {
  data() {
    return {
		msg:'me'
    }
  },
  mounted(){
	var self=this;
	bus.$on('data',function(d){
		self.msg=d.name;
	})
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