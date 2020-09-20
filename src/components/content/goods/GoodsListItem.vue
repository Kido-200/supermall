<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="图片" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imgLoad(){


      this.$bus.$emit('itemImageLoad')

      // if(this.$route.path.indexOf('/home'))
      //  {
      //   this.$bus.$emit('itemImageLoad')
      //  }
      //  else if(this.$route.path.indexOf('/detail'))
      //  {
      //    this.$bus.$emit('detailItemImgLoad')
      //  }
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item{
  padding-bottom:40px;
  position:relative;

  width:48%;
}
.goods-item img{
  width:100%;
  border-radius:5px;
}
.goods-info{
  font-size:12px;
  position:absolute;
  bottom:5px;
  left:0;
  right:0;
  overflow:hidden;
  text-align:center;
}


  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

.goods-info p{
  overflow:hidden;
  /* 用省略号来表示overflow的文字 */
  text-overflow:ellipsis;
  white-space:nowrap;
  margin-bottom:3px;
}
.goods-info .collect{
  position:relative;
}
.goods-info .collect::before{
  content:'';
  position:absolute;
  left:-15px;
  top:-1px;
  width:14px;
  height:14px;
  /* /前面px是图片里的位置,后面px是图片大小 */
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>