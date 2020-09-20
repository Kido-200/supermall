<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style>

.nav-bar{
  display: flex;
  height:44px;
  line-height: 44px;
  text-align:center;
  box-shadow:0 1px 1px rgba(100,100,100,.1);
  
}

.left,.right{
  width: 60px;

}

.center{
  /* 等价flex:1 1 auto;  开启了伸缩，使得宽度充满整个父元素，即剩下的全部给了center*/
  height:100%;
  flex:1;
}

</style>