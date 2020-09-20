import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'


export default{
  addCart(context,payload){
    let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid);
    //payload新添加的商品
   
    if(oldProduct)
    {
      context.commit(ADD_COUNTER,oldProduct)
      return '当前的商品数量+1'
    }
    else{
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
      return '添加了新的商品'
    }
  }
}