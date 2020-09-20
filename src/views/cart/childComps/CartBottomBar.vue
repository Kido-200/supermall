<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :value="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">
      合计: ￥{{totalPrice}}
    </div>
    <div class="calculate">去结算:({{checkedLength}})</div>
  </div>
</template>
 
<script>
import CheckButton from './CheckButton'

import {CHECK_CHANGE} from 'store/mutation-types'


import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
  data () {
    return {
    }
  },
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((pre,item)=>{
        return pre + item.price * item.count
      },0)
    },
    checkedLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length===0)
        return false
      // return this.cartList.filter(item => !item.checked).length === 0
      //这个找到就会停下,效率高
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      //原来都是选中的，  全部不选中
      //某些不选中， 全部选中
      if(this.isSelectAll)
      {
        for(let i in this.cartList)
        {
          this.$store.commit(CHECK_CHANGE,i)
        }
      }
      else{
        for(let i in this.cartList)
        {
          if(this.cartList[i].checked === false)
            this.$store.commit(CHECK_CHANGE,i)
        }
      }
    }
  }
}
</script>
  
<style scoped lang="less">
  .bottom-bar{
    height:40px;
    background-color: #eee;
    position:relative;
    bottom: 0px;
    line-height: 40px;
    display:flex;
  }
  .check-content{
    display: flex;
    align-items:center;
    margin-left:10px;
    width:60px;
    .check-button{
      width:22px;
      height:22px;
      line-height: 22px;
      margin-right:5px;
    }
   
  }
  .price{
    margin-left:40px;
    flex:1;
  }
  .calculate{
    width:90px;
    color:#fff;
    background-color: red;
    text-align: center;
  }
</style>