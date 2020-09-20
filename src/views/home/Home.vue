<template>
  <div id="home">
    <nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick"
    ref="tabControl1"
    class="tab-control"
    v-show="isTabFixed"
    ></tab-control>

    <scroll class="wrapper" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" 
      @swiperImageLoad="swiperImageLoad" 
      v-if="banners.length"
      />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {BACK_POSITION} from 'common/const'




export default {
  name:'Home',
  mixins:[itemListenerMixin,backTopMixin],
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  data(){
    return {
      banners: [],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted(){
  },
  methods:{

    
    //事件监听方法
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
   
    },
    contentScroll(position){
      //决定BackTop是否显示
      this.isShowBackTop = -position.y > BACK_POSITION
      //决定tabControl是否吸顶
      this.isTabFixed = this.tabOffsetTop && (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    },
    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    }).catch(err => console.log(err))
    },
    getHomeGoods(type){
      //去data里查看目前的page,这样以后每次调用都会得到下一页数据
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++;

        this.$refs.scroll.finishPullUp()
      }).catch(err => console.log(err))
    },
   
    
  },


}
</script>

<style scoped>
#home{
  /* padding-top:44px; */
  height:100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
/*   
  position:fixed;
  top:0;
  left:0;
  right:0;
  */
    z-index:9; 

}

.wrapper{
  overflow:hidden;
  position:absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}
/* }
.wrapper{
  height:calc(100% - 93px );
  overflow: hidden;
  margin-top:46px;
} */

.tab-control{
  position:relative;
  /* z-index必须有position才能起作用 */
  z-index:9;
  background-color: #fff;
}
</style>