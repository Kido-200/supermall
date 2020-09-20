<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar  />
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //两种用法
    //一.用getters的名字  数组
    //...mapGetters(['cartLength','cartList'])

    //自定义新名字  对象
    ...mapGetters({
      length : 'cartLength',
    })

  }


}
</script>

<style scoped lang="less">
.cart{
  height:100vh;
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
  }
}
</style>