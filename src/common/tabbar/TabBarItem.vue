<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
       <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path: String,
    activeColor:{
      type:String,
     default: 'red'
    }
  },
  data(){
    return {
      //isActive:true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !=-1
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
 .tab-bar-item{
    text-align:center;
    flex:1;
    /* 一般移动端都是49 */
    height:49px;
    font-size:14px;
  }

  .tab-bar-item img{

    width:25px;
    height:25px;
    margin-top:3px;
    vertical-align: middle;
    margin-bottom:2px;
  }

</style>