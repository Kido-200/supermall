import Toast from './Toast'
const obj = {}

//install会传入Vue构造函数,注意不是实例,不是对象
obj.install = function(Vue){

  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象 (create)
  const toast = new toastConstructor()

  //3.用mount将组件对象,手动挂载到某一个元素上 ,跟main.js里挂载到#app一样  (mount)
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是我们上面create出来的div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj