<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
      </div>
      <i class="arrow-right"></i>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>
 
<script>
import {formatDate} from 'common/utils'

export default {
  name: 'DetailCommentInfo',
  props:{
    commentInfo:{
      type:Object
    }
  },
  filters:{
    showDate:function(value){
      let date = new Date(value*1000);
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
  
<style scoped lang="less">
  .comment-info{
    padding:5px 12px;
    color:#333;
    border-bottom:5px solid #f2f5f8;
    .info-header{
      height:50px;
      line-height:50px;
      border-bottom:1px solid rgba(0,0,0,.1);
      .header-title{
        float:left;
        font-size:15px;
      }
      .header-more{
        float:right;
        margin-right:10px;
        font-size:13px;
      }
    }
    .info-user{
      padding:10px 0 5px;
      img{
        width:42px;
        height:42px;
        border-radius:50%;
      }
      span{
        position:relative;
        font-size:15px;
        margin-left:12px;
        top:-12px;
      }
    }
    .info-detail{
      padding:0 5px 15px;
      p{
        font-size:14px;
        color:#777;
        // 为font-size的1.5倍
        line-height:1.5;
      }
      .info-other{
        font-size:12px;
        color:#999;
        margin-top:10px;
        .date{
          margin-right:8px;
        }
      }

    }
    .info-imgs {
        margin-top:10px;
        img{
         width:70px;
         height:70px;
         margin-right:5px;
        }
     
      }

   
  }
</style>