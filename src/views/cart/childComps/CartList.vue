<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
     <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" :index="index"/>
    </scroll>

  </div>
</template>
 
<script>
import {mapGetters} from 'vuex'
import Scroll from 'common/scroll/Scroll'

import CartListItem from './CartListItem'



export default {
  name: 'CartList',
  components:{
    Scroll,
    CartListItem
  },
  data () {
    return {
    }
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>
  
<style scoped lang="less">
.cart-list{
  height:calc(100% - 133px);
  .content{
    height:100%;
    overflow: hidden;
  }

}
</style>