import {ADD_COUNTER,ADD_TO_CART,CHECK_CHANGE} from './mutation-types'

export default{
    //mutations唯一的目的就是修改state中的状态
    //mutattions中的每个方法尽可能完成的事件少一点
    [ADD_COUNTER](state,payload){
      payload.count++
    },
    [ADD_TO_CART](state,payload){ 
      payload.checked = true
      state.cartList.push(payload)
    },
    [CHECK_CHANGE](state,payload){
      state.cartList[payload].checked = !state.cartList[payload].checked
    }
}