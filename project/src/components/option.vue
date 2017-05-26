<template>
  <div>

  <h2>配置项部分</h2>
  <p id="outs">symbolSize</p>
  <!-- <div contenteditable="true"
         v-html="innerText"
         @input="changeText"></div> -->
<!-- <div><div v-for="i,index in $store.state[$store.state.types]"><input v-model="index" /><p>{{i}}</p></div></div> -->
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
    var self=this;
    console.log("option here ++++++++")
	//var options=store.state[store.state.types]
	
	var str="";
	var t=/^[0-9]*$/
	function out(obj){
		for(var key in obj){
		var temp=Object.prototype.toString.call(obj[key])
			if(t.test(key) || temp == "[object Object]" || obj[key] instanceof Array){
			}else{
			
			str+="<p>"+key+"<input value='"+obj[key]+"'/></p>"
			}
			if( temp == "[object Object]" || temp == "[object Array]" ){
				
				out(obj[key])
			}
			
			
		}
	}
	out(self.options)
	outs.innerHTML=str;
  }
}

/*
//模拟v-model
export default {
        props: ['value'],
        data(){
            return {innerText:this.value}
        },
        methods:{
            changeText(){
                console.log(this.innerText)
				console.log(this.$el)
				this.innerText = this.$el.innerHTML;
				console.log(this.innerText)
                //this.$emit('input',this.innerText);
            }
        }
    }
*/
</script>

<style>
</style>