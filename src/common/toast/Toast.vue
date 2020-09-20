<template>
  <div class="toast" v-show="display">
    <div >{{message}}</div>
  </div>
</template>
 
<script>
export default {
  name: 'Toast',
  // props:{
  //   message:{
  //     type:String,
  //     default:''
  //   },
  //   show:{
  //     type:Boolean,
  //     default:false
  //   }
  // },
  data(){
    return {
      message:'',
      display:false
    }
  },
  methods:{
    show(message,duration = 1500){
      this.display = true
      this.message = message
      setTimeout(()=>{
        this.display = false
        this.message = ''
      },duration)
    }
  }
}
</script>
  
<style scoped lang="less">
  .toast{
    z-index: 999;
    position:fixed;
    top:50%;
    left:50%;
    color:#fff;
    padding:8px 10px;
    background-color: rgba(0,0,0,.6);
    transform:translate(-50%,-50%);
  }
</style>