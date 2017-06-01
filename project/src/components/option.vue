<template>
  <div>

  <h2>控制配置项部分</h2>
  
  <span v-if="$store.state[$store.state.types].grid3D">自动旋转：</span>
  <button v-if="$store.state[$store.state.types].grid3D" v-text="$store.state[$store.state.types].grid3D.viewControl.autoRotate" @click="$store.state[$store.state.types].grid3D.viewControl.autoRotate=!$store.state[$store.state.types].grid3D.viewControl.autoRotate;changed()" ></button>
  
  <span v-if="$store.state[$store.state.types].grid3D" v-text="'透明度：'+$store.state[$store.state.types].series[0].itemStyle.opacity"></span>
  <input v-if="$store.state[$store.state.types].grid3D" type="range" min='0' max='10' :value="$store.state[$store.state.types].series[0].itemStyle.opacity*10" @change="changed($event.target.value)" />
</div>
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
  methods:{
  	changed(e){
		//不同图表类型的不同配置项
		if(store.state[store.state.types].grid3D){
			if(e){store.state[store.state.types].series[0].itemStyle.opacity=e/10;}
			this.$store.commit('changeOptions',store.state[store.state.types],true)
		}
  	}
  },
  mounted(){
    var self=this;
    console.log("option here ++++++++")
    console.log(this.options)
	//动态生成的配置项
	/*
	var str="";
	var t=/^[0-9]*$/
	var newOptions=[];
	function out(obj){
			for(var key in obj){
			var temp=Object.prototype.toString.call(obj[key])
				if(t.test(key) || temp == "[object Object]" || obj[key] instanceof Array){
				}else{
				
				newOptions.push({[key]:obj[key]})
				}
				if( temp == "[object Object]" || temp == "[object Array]" ){
					
					out(out[key])
				}
			}
	}
	out(self.options)
	console.log(newOptions);
	*/
  }
}

</script>

<style>
.indent{
	margin-left: 10px;
}
</style>