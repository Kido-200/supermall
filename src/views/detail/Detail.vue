<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav" 
    @titleClick="titleClick"
    ref="nav"
    />
    <scroll 
    ref="scroll"
    class="wrapper"
    :probe-type="3" 
    @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTop" />
   <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from 'common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {BACK_POSITION} from 'common/const'

export default {
  name:'Detail',
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
    }
  },
  created(){
    //从URL获取iid
    this.iid = this.$route.params.iid

    //请求网络数据
    getDetail(this.iid).then(res =>{
      const data = res.result
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      
      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo 
      
      //5.取出参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.取出评论的信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

    })

    //获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //4.给getThemeTopY赋值
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
    },100)
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  methods:{
    ...mapActions(['addCart']),
     imageLoad(){
       this.$refs.scroll.refresh()
       this.getThemeTopY()
     },
     titleClick(index){
       this.currentIndex = index
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
     },
     contentScroll(position){
       const positionY = -position.y

       //1.是否显示回到顶部
       this.isShowBackTop = positionY > BACK_POSITION
       //2.positionY比较主题中的值
       if(positionY<this.themeTopYs[1])
       {
         if(this.currentIndex == 0) return;
         this.currentIndex = 0
       }
       else if(positionY<this.themeTopYs[2]){
         if(this.currentIndex == 1) return;
         this.currentIndex = 1
       }
       else if(positionY<this.themeTopYs[3])
       {
         if(this.currentIndex == 2) return;
         this.currentIndex = 2
       }
       else
       {
         if(this.currentIndex == 3) return;
         this.currentIndex = 3
       }
       this.$refs.nav.currentIndex = this.currentIndex
     },
     addToCart(){
       //1.获取购物车需要栈是的信息
       const product = {}
       product.image = this.topImages[0]
       product.title = this.goods.title
       product.desc = this.goods.desc
       product.price = this.goods.realPrice
       product.iid = this.iid

       //2.将商品添加到购物车
       this.addCart(product).then(res => {
         this.$toast.show(res,1500)
       })

      //  this.$store.dispatch('addCart',product).then((res) => {
      //    console.log(res);
      //  })
     }

    
  },
  mounted(){
 
  },
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImageLoad)
  }
}
</script>

<style scoped>
  #detail{
    /* 因为tab-bar是absolute脱离文档流的，所以要用z-index才能把他盖住 */
    position: relative;
    z-index:9;
    background-color:#fff;
    height:100vh;
  } 

  .detail-nav{
    position:relative;
    z-index:9;
    background-color: #fff;
  }
  .wrapper{
    height:calc(100% - 102px);
  }
</style>