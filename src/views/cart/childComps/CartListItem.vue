<template>
  <div class="shop-item">
   <div class="item-selector">
     <CheckButton @click.native="checkClick"  v-model="product.checked"></CheckButton>
   </div>
   <div class="item-img">
     <img :src="product.image" alt="">
   </div>
   <div class="item-info">
     <div class="item-title">{{product.title}}</div>
     <div class="item-desc">商品描述: {{product.desc}}</div>
     <div class="info-bottom">
       <div class="item-price left">¥{{product.price}}</div>
       <div class="item-count right">x{{product.count}}</div>
     </div>
   </div>
  </div>
</template>
 
<script>
import CheckButton from './CheckButton'

import {CHECK_CHANGE} from '../../../store/mutation-types'


export default {
  name: 'CartListItem',
  components:{
    CheckButton
  },
  data () {
    return {
      checked:false
    }
  },
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    },
    index:{
      type:Number
    }
  },
  methods:{
    checkClick(){
      //因为是vuex里的state要改变，必须要用mutations
      this.$store.commit(CHECK_CHANGE,this.index)
      //下面这种虽然能用,但插件无法监听是否改变
      // this.product.checked = !this.product.checked
    }
  },
}
</script>
  
<style scoped lang="less">
  .shop-item{
    width:100%;
    display:flex;
    font-size:0;
    padding:5px;
    border-bottom:1px solid #ccc;
    .item-selector{
      width:14%;
      display:flex;
      justify-content: center;
      align-items:center;
    }

    .item-img{
      padding:5px;
      img{
        width:80px;
        height:100px;
        display:block;
        border-radius:5px;
      }
    }

    .item-info{
      font-size:17px;
      color:#333;
      padding:5px 10px;
      position:relative;
      overflow:hidden;
      .item-title, .item-desc{ 
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .item-desc {
        font-size: 14px;
        color: #666;
        margin-top: 15px;
      }
      .info-bottom{
        margin-top:10px;
        position:absolute;
        bottom:10px;
        left:10px;
        right:10px;
        .item-price{
          color:orangered;
        }
      }
    }
     

  }
</style>