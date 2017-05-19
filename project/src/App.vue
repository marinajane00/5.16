<template>
  <div>
    <h1>{{ msg }}</h1>
    <chart></chart>
	<op></op>
	<ta></ta>
	<da></da>
  </div>
</template>

<script>
import chart from './components/chart.vue'
import op from './components/option.vue'
import ta from './components/table.vue'
import da from './components/data.vue'

export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  components: { chart,op,ta,da }
}
</script>

<style scoped>
* {
  margin: 0; 
  padding: 0;
  box-sizing: border-box;
}
.box {
  padding: 10px;
}
</style>