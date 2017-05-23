<template>
  <div>
  <!-- 表格部分 -->

  <h2>表格部分</h2>
  <button @click="save()">保存</button>
<div><span v-for="i in $store.state[$store.state.types].series[0].data"><input v-for="y in i" :value="y" /></span></div>
  </div>
</template>

<script type="text/javascript">
import bus from '../assets/eventBus.js'
import store from '../vuex/store'

export default {
  data () {
    return {
		
    }
  },
  props:["parentvalue","tablevalue"],
  mounted(){
	var self=this;
	console.log('table.vue here')
  },
  methods:{
	send:function(){
		//组件间传值
		bus.$emit('test','test');
	},

	save:function(){
		//组件数据同步
		this.$store.commit('increment')
	},
	toApp:function(){
		//子组件传送至父组件
		this.$emit("toApp",{do:"从子组件传值到父组件"})

	}
  }
}
</script>

<style>
</style>