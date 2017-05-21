<template>
  <div>
  <!-- 表格部分 -->
  <p>表格部分</p>
  <input :value="parentvalue[0][0]" @change="change(0,0,$event.target.value)" />
  <button @click="send">send</button>
  <span>{{tablevalue[0][0]}}</span>
  </div>
</template>

<script type="text/javascript">
import bus from '../assets/eventBus.js'

export default {
  data () {
    return {
      author: "marina",
	  fordata:[{name:1},{name:2},{name:3}]
    }
  },
  props:["parentvalue","tablevalue"],
  mounted(){
	var self=this;
	console.log('table.vue here')
  },
  methods:{
	send:function(){
		bus.$emit('test','test');
	},
	change:function(i,y,e){
	console.log(this.tablevalue)
		this.tablevalue[i][y]=e;
		console.log(e)
		console.log(this.tablevalue)
		this.$emit("changeparent",this.tablevalue)
	}
  }
}
</script>

<style>
</style>