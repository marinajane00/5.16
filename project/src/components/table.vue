<template>
  <div>
  
  <h2>表格部分</h2>
	
	<div>
	<span v-for="(i,index) in $store.state[$store.state.types].series[0].data">
		<input v-for="(y,yndex) in i" :value="y" @change="changed($event.target.value,index,yndex)" />
	</span>
	</div>
	
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
  mounted(){
	var self=this;
	console.log('table.vue here')
  },
  methods:{
	send(){
		//组件间传值
		bus.$emit('test','test');
	},
	changed(e,i,y){
		console.log(e,i,y)
		store.state[store.state.types].series[0].data[i][y]=e;
		this.$store.commit('changeTable',true);
	}
  }
}
</script>

<style>
</style>