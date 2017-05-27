<template>
  <div>
    element here
    {{type}}
    <div id="showhere">{{{ <type>阿西吧</type> }}}</div>
    <div class='wrap' @drop="test.drop($event)" @dragover="test.allowDrop($event)" id="wrap">
			<p class='test' >位置一</p><p class="test">位置二</p>
		</div>
		
  </div>
</template>

<script>
import io from '../assets/socket.io.js'
import store from '../vuex/store'
var temp;
export default {
  data() {
    return {
		
    }
  },
  props:["test","type"],
  created(){
		temp=document.createElement("p");
		temp.innerHTML="<span @click='co'>haha</span>"
		document.body.appendChild(temp);
		
  },
  mounted(){
  	
  },
  methods:{
		co(){
			alert("ok")
		}
  }
}
</script>

<style>
</style>