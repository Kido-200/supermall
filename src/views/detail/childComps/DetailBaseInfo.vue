<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span >{{goods.columns[0]}}</span>
      <span >{{goods.columns[1]}}</span>
      <span >{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="serves-wrap">
      <div v-for="index in goods.services.length-1" :key=index>
				<img :src="goods.services[index-1].icon" alt=""> 
        {{goods.services[index-1].name}}
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'DetailBaseInfo',
  data () {
    return {
    }
  },
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>
  
<style scoped lang="less">
  .info-title{
    font-size:14px;
    margin:10px 4px;
    line-height:20px;
  }
  .info-price{
    .n-price{
      margin:0 4px;
      color:var(--color-high-text);
      font-size:20px;
    }
    .o-price{
      color:#999;
      text-decoration:line-through;
      font-size:12px;
    }
    .discount{
      color:#fff;
      background-color: var(--color-high-text);
      padding:2px 4px;
      margin-left:3px;
      font-size:12px;
      border-radius:100px;
      vertical-align: top;

    }
  }
  .info-other{
    padding:10px 4px;
    color: #999;
		font-size: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ededed;
  }
  .serves-wrap{
    display: flex;
    padding:15px 4px;
    font-size: 12px;
    border-bottom:3px solid #ededed;
    justify-content: space-between;
    img{
      width: 12px;
			height: 12px;
			vertical-align: middle;
    }
  }
</style>