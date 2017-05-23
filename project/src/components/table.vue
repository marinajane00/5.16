<template>
  <div>
  <!-- 表格部分 -->

  <h2>表格部分</h2>
  <p>vuex table</p>
  <input type="text" v-model="myData" />
        <button @click="save()">保存</button>

  </div>
</template>

<script type="text/javascript">
import bus from '../assets/eventBus.js'

export default {
  data () {
    return {
      author: "marina",

	  fordata:[{name:1},{name:2},{name:3}],
	  myData:'myData'

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

	save:function(){
		let value = this.myData
		this.$store.commit('increment')
	},
	toApp:function(){
		this.$emit("toApp",{do:"从子组件传值到父组件"})

	}
  }
}
</script>

<style>
</style>