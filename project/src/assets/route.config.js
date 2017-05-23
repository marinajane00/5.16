import single from '../single.vue';    //引入页面

//当然真正应用的路由不会这么简单，vue-router也提供动态路由，嵌套路由等等，详见vue-router文档
export default [
  { path: '/single', component: single }
];