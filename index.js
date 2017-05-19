
function xhr(url,callback){
	xmlHttp=new XMLHttpRequest();
	var my_url=url;
	xmlHttp.open("GET",my_url+"?done",false);
	xmlHttp.send(null);
	callback(xmlHttp.responseText);
	return xmlHttp.responseText;
}

            // 跟 ECharts 一样的方式初始化
			console.log(document.getElementById('main'))
            var myChart = echarts.init(document.getElementById('main'));
			myChart.showLoading();
			xhr('lib/flights.json',done);
			
			
	function done(data){
		var markPointStyle = {
            normal: {
                color: 'red'
            }
        }
		console.log(data.length)
		var option = {
                    tooltip: {
                        show: true
                    },
					toolbox:{
						show:true
					},
                    legend: {
                        data:['销量']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"销量",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        }
                    ]
                };
		myChart.setOption(option)
		myChart.hideLoading();			
		console.log(data.length-100)
        // Airport: [name, city, country, longitude, latitude]
        /*var airports = data.airports.map(function (item) {
            return {
                itemStyle: markPointStyle,
                geoCoord: [item[3], item[4]]
            }
        });

        // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
        var routesGroupByAirline = {};
        data.routes.forEach(function (route) {
            var airline = data.airlines[route[0]];
            var airlineName = airline[0];
            if (!routesGroupByAirline[airlineName]) {
                routesGroupByAirline[airlineName] = [];
            }
            routesGroupByAirline[airlineName].push(route);
        })

        var opts = {
            title: {
                text: 'World Flights',
                subtext: 'Data from openflights.org',
                sublink: 'http://openflights.org/data.html',
                x:'center',
                y:'top',
                textStyle: {
                    color: 'white'
                }
            },
            legend: {
                show: true,
                data: data.airlines.map(function (item) {
                    // Airline name
                    return item[0];
                }),
                selected: {},
                x: 'left',
                orient: 'vertical',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                formatter: '{b}'
            },
            series: [{
                type: 'map3d',
                mapType: 'world',
                baseLayer: {
                    backgroundColor: '',
                    backgroundImage: 'asset/earth.jpg'
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: 'yellow',
                        areaStyle: {
                            color: 'rgba(0, 0, 0, 0)'
                        }
                    }
                },
                markPoint: {
                    effect: {
                        shadowBlur: 0.2
                    },
                    large: true,
                    symbolSize: 3,
                    data: airports
                }
            }]
        };

        opts.legend.data.forEach(function (name) {
            if (name.indexOf('American Airlines') >= 0) {
                opts.legend.selected[name] = true;
            } else {
                opts.legend.selected[name] = false;
            }
        });

        data.airlines.forEach(function (item) {
            var airlineName = item[0];
            var routes = routesGroupByAirline[airlineName];
            if (routes) {
                opts.series.push({
                    type: 'map3d',
                    name: airlineName,
                    markLine: {
                        effect: {
                            show: true
                        },
                        data: routes.map(function (item) {
                            return [{
                                // Source airport
                                geoCoord: airports[item[1]].geoCoord
                            }, {
                                // Destination Airport
                                geoCoord: airports[item[2]].geoCoord
                            }]
                        })
                    }
                });
            }
        });

        myChart.setOption(opts);

        myChart.hideLoading();
		*/
			}
			
	//++++++++++++++++++++++++++++++++++++++++++++
	var drop = document.getElementById("drop"),
            upload = document.getElementById("upload"),
            tableC = document.getElementById("table");
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
				xhrPOST("http://localhost:7171")
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
		
		//+++++++++++++++++++++++++++++将xlsx存入数据库
		//post
		function xhrPOST(url,data){
			xmlHttp=new XMLHttpRequest();
			xmlHttp.open("POST",url,false);
			xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
			xmlHttp.send(data || null);
			console.log(xmlHttp.responseText);
			return xmlHttp.responseText;
		}
		
		
        // 创建websocket连接
        var socket = io.connect('http://localhost:8080');
        // 把信息显示到div上
        socket.on('notification', function (data) {
        var articlesList = "<dl>";
        $.each(data.articles,function(index,article){
            articlesList += "<dt></dt>\n" +
                         "<dd>" + article.id + "\n" +
                         "<dd>" + article.name + "\n"
                         "</dd>";
        });
        articlesList += "</dl>";
        $('#container').html(articlesList);
		
        $('time').html('最后更新时间:' + data.time);
      });