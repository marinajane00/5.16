<template>
  <div>
  <p>路由会刷新啊</p>
  <p @click="count++">点击之后：{{count}}</p>
  </div>
</template>

<script type="text/javascript">
import bus from '../assets/eventBus.js'
import store from '../vuex/store'

export default {
  data () {
    return {
		count:0
    }
  },
  mounted(){
	
  },
  methods:{
	
  }
}
</script>

<style>
</style>