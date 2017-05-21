<template>
  <div>
  
  <p>excel</p>
  <div>Loading ...</div>
  <!-- 拖入或选择excel -->
  <div id="drop">
	点击此处或者将文件拖至此处上传
	<input type="file" id="upload" name="">
  </div>
  <div id="table"></div>
  <div>
    <a href="sample.xls" target="_blank">下载样表</a>
    <time></time>
  </div>
  
  </div>
  
</template>

<script>
import XLSX from "xlsx"
export default {
  data() {
    return {
    }
  },
  mounted(){
	console.log('excel.vue here')
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

	}
}
function clearTable(){
	tableC.innerHTML = '';
}
function makeTable(data){
	clearTable();
	for(var index in data){ //遍历每个表
		var table = document.createElement("table"),
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
		tableC.appendChild(table);
	}
}
function handleFile(files,callback){
	var f = files[0],
		reader = new FileReader(),
		name = f.name;
	reader.onload = function(){
		var data = event.target.result,
			wb;
		if(rAbs){
			wb = X.read(data,{type : 'binary'});
		}else{
			var arr = fixData(data);
			wb = X.read(btoa(arr),{type : 'base64'});
		}
		console.log(JSON.stringify(to_json(wb).Sheet1))
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
</script>

<style>
#drop{
	width:600px;
	height:300px;
	border:2px dashed #333;
}
</style>