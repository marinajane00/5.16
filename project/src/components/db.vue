<template>
  <div>
    <h2>数据库连接 || 接口部分</h2>
	<input v-model="url" />
	<input v-model="api" />
	<p>{{$store.state.myData}}</p>
	<input v-model="dynamic" /><button @click="done">done</button>
	<iframe id="player" width="854" height="480" src="about:blank" frameborder="0" allowfullscreen></iframe>
	
  </div>
</template>

<script>
//import io from '../assets/socket.io.js'
import store from '../vuex/store'

var URL="http://localhost:7474"
//记得url改变后再次调用
//var socket = io.connect(URL);

export default {
  data() {
    return {
		url:URL,
		api:"articles",
		dynamic:0
    }
  },
  mounted(){
	var self=this;
	
	/*
	socket.on('notification', function (data) {
		console.log(data)
		//数据库实时更新
		//self.$store.commit('changeTable',data[self.api])
	});
	*/
		
		
	
  },
  methods:{
	done:function(){
	var player = document.getElementById('player');
var iframeDocument = player.contentDocument || player.contentWindow.document;
var iframeContent = iframeDocument.getElementsByTagName('body');
		var div = document.createElement('div');
		div.id = 'newDiv';
		div.style.fontSize = '50px';
		console.log(this.dynamic)
		div.innerHTML = this.dynamic;
		var injected_script = 'console.log("window.id ==", window.id)';
		var el = document.createElement('script');
		el.text = injected_script;
		if (iframeDocument) {
			
			console.log(iframeContent);
			iframeContent[0].appendChild(el);
			iframeContent[0].appendChild(div);
		}
		/*
		socket.emit('news', document.getElementById("wraps").innerHTML);
	    socket.on('my other event', function (data) {
			console.log(data);
	    });
		*/
	}
  }
}
</script>

<style>
</style>