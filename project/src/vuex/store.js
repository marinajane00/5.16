<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  // 应用启动时，myData置为0
  myData: 0
}

const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  increment (state) {
      // 变更状态
      state.myData++
  }
}
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
=======
// vuex/store.js
import Vue from 'vue'  
import Vuex from 'vuex'  
import index from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({  
  // 组合各个模块
  modules: {
    index
  }
>>>>>>> d2903977f8dd920afde1f87fe5cc5de3b4851bcb
})