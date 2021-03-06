import Vue from 'vue'
import Vuex from 'vuex'
import line3D from '../assets/line3D.json'
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态

var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
var days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

function getAirportCoord(idx) {
	return [line3D.airports[idx][3], line3D.airports[idx][4]];
}
var routes = line3D.routes.map(function(airline) {
	return [
		getAirportCoord(airline[1]),
		getAirportCoord(airline[2])
	];
});

var arr=["bar3D","scatter3D","pie","globe"];
var i=0;

const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  increment (state) {
      // 变更状态
      state.myData++
  },
  changeTypes(state,val){
	  i++;
	  if(i>=arr.length) i=0;
	  state.types=arr[i]
	  console.log(state.types)
  },
  changeTable(state,val,bool){
	  state[state.types].series[0].data=val;
	  state.dataChanged=bool;
  },
  changeData(state,val){
	  state[state.types].series[0].data=val;
  },
  changeOptions(state,val,bool){
	  state[state.types]=val
	  state.move=bool;
  }
}

const state = {
	types:arr[i],
	move:false,
	dataChanged:false,
	globe:{
		globe: {
			baseTexture: "../src/assets/globe.jpg",
			displacementScale: 0.04,
			shading: 'realistic',
			realisticMaterial: {
				roughness: 0.9
			},
			postEffect: {
				enable: true
			}
		},
		series: {

            type: 'lines3D',

            coordinateSystem: 'globe',

            blendMode: 'lighter',

            lineStyle: {
                width: 1,
                color: 'rgb(50, 50, 150)',
                opacity: 0.1
            },

            data: routes
        }		
	},
    scatter3D:{
		grid3D: {
			viewControl:{
				autoRotate:"true"
			}
		},
		xAxis3D: {},
		yAxis3D: {},
		zAxis3D: {},
		series: [{
			type: 'scatter3D',
			symbolSize: 50,
			data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
			itemStyle: {
				opacity: 1
			}
		}]
	},
	bar3D:{
		visualMap: {
			max: 20,
			inRange: {
				color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
			}
		},
		xAxis3D: {
			type: 'category',
			data: hours
		},
		yAxis3D: {
			type: 'category',
			data: days
		},
		zAxis3D: {
			type: 'value'
		},
		grid3D: {
			boxWidth: 200,
			boxDepth: 80,
			light: {
				main: {
					intensity: 1.2
				},
				ambient: {
					intensity: 0.3
				}
			},
			viewControl:{
				autoRotate:true
			}
		},
		series: [{
			type: 'bar3D',
			data: data.map(function (item) {
				return {
					value: [item[1], item[0], item[2]]
				}
			}),
			shading: 'color',

			label: {
				show: false,
				textStyle: {
					fontSize: 16,
					borderWidth: 1
				}
			},
			
			itemStyle: {
				opacity: 0.4
			},

			emphasis: {
				label: {
					textStyle: {
						fontSize: 20,
						color: '#900'
					}
				},
				itemStyle: {
					color: '#900'
				}
			}
		}]
	},
	pie:{
		title : {
			text: '某站点用户访问来源',
			subtext: '纯属虚构',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {
					show: true, 
					type: ['pie', 'funnel'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'left',
							max: 1548
						}
					}
				},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		series : [
			{
				name:'访问来源',
				type:'pie',
				radius : '55%',
				center: ['50%', '60%'],
				data:[
					{value:335, name:'直接访问'},
					{value:310, name:'邮件营销'},
					{value:234, name:'联盟广告'},
					{value:135, name:'视频广告'},
					{value:1548, name:'搜索引擎'}
				]
			}
		]
	}
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})