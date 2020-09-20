import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import store from './store'


import toast from 'common/toast'

//安装toast插件,会去执行toast的install函数
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
