<template>
  <div>
    <h1>I am a title.</h1>
    <a> written by {{ author }} </a>
	<button @click='send'>send</button>
  </div>
</template>

<script type="text/javascript">
import bus from '../assets/eventBus.js'

export default {
  data () {
    return {
      author: "微信公众号 jinkey-love"
    }
  },
  methods:{
	send:function(){
		bus.$emit('data',{name:'marina'});
	}
  }
}
</script>

<style>
</style>