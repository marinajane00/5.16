<template>
  <div>

  <h2>excel部分</h2>

  <!-- 拖入或选择excel -->
  <div id="drop">
	点击此处或者将文件拖至此处上传
	<input type="file" id="upload" name="" v-show="false" @change="file($event.target)">
  </div>
  <div id="table"></div>
  <div>

    <!-- <a href=".xlsx" id="download">下载样表</a> -->
  </div>
  
  </div>
  
</template>

<script>
import XLSX from "xlsx"
import store from '../vuex/store'

export default {
  data() {
    return {
    }
  },
  methods:{
	file(e){
		 console.log(window.URL.createObjectURL(e.files[0]))
	}
  },
  mounted(){
	console.log('excel.vue here')
	var self=this;
	//XLSX
	var drop = document.getElementById("drop"),
		upload = document.getElementById("upload"),
		tableC = document.getElementById("table"),
		X = XLSX,
		rAbs = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
	drop.addEventListener('click',handleClick,false);
	drop.addEventListener('dragover',handleDragOver,false);
	drop.addEventListener('dragleave',handleDragLeave,false);
	drop.addEventListener('mouseout',handleDragLeave,false);
	drop.addEventListener('drop',function(){
		handleDrop(function(data){
			makeTable(data);
		})
	},false);
	upload.addEventListener('change',function(){
		handleChange(function(data){
			makeTable(data);
		})
	},false);

function clearTable(){
	tableC.innerHTML = '';
}
function makeTable(data){
	clearTable();
	console.log(data)
	for(var index in data){ //遍历每个表
		self.$store.commit('changeTable',data[index],true)
		/*var table = document.createElement("table"),
			tr = document.createElement("tr"),
			td = document.createElement("td"),
			keys = Object.keys(data[index][0]);
		td.innerHTML = index + "数据";
		td.colspan = keys.length;
		tr.appendChild(td);
		table.appendChild(tr);
		tr = document.createElement("tr");
		for(var i=0,len=keys.length;i<len;i++){
			td = document.createElement("td");
			td.innerHTML = keys[i];
			tr.appendChild(td);
		}
		table.appendChild(tr);
		for(var i=0,len=data[index].length;i<len;i++){ //循环表中每条数据
			tr = document.createElement("tr")
			var item = data[index][i];
			for(var col in item){
				td = document.createElement("td");
				td.innerHTML = item[col];
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		tableC.appendChild(table);*/
	}
}
function handleFile(files,callback){
	var f = files[0],
		reader = new FileReader(),
		name = f.name;
		console.log(name)
	reader.onload = function(){
		var data = event.target.result,
			wb;
		if(rAbs){
			wb = X.read(data,{type : 'binary'});
		}else{
			var arr = fixData(data);
			wb = X.read(btoa(arr),{type : 'base64'});
		}
		callback && callback(to_json(wb));
	}
	if(rAbs){
		reader.readAsBinaryString(f)
	}else{
		reader.readAsArrayBuffer(f);
	}
	upload.value = '';
}
function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w))); o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w))); return o; } function to_json(workbook) { var result = {}; workbook.SheetNames.forEach(function(sheetName) { var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]); if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}
function handleClick(){
	upload.click();
}
function handleChange(callback){
	if(upload.value){
		handleFile(event.target.files,callback);
	}
}
function handleDrop(callback){
	event.preventDefault();
	event.stopPropagation();
	handleFile(event.dataTransfer.files,callback);
}
function handleDragOver(){
	event.preventDefault();
	event.stopPropagation();
	drop.className = 'active';
}
function handleDragLeave(){
	drop.className = '';
}

	}
}

</script>

<style>
#drop{
	width:6rem;
	height:6rem;
	margin:0 auto;
	border:2px dashed #888;
	cursor:pointer;
	display:flex;
	justify-content: center;
    align-items: center;
	color:#61accd;
}
</style>