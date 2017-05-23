<template>
  <div>

  <h2>配置项部分</h2>
  <p>symbolSize</p>
<!-- <div><span v-for="i,index in $store.state[$store.state.types]">{{i}}++++++++++{{index}}</span></div> -->
  </div>
</template>

<script>
import store from '../vuex/store'

export default {
  data() {
    return {
	options:store.state[store.state.types]
    }
  },
  mounted(){
  
  console.log("option here ++++++++")
	/*var options=store.state[store.state.types]
for(var key in person){
console.log(person[key]);
}*/
  }
}
</script>

<style>
</style>