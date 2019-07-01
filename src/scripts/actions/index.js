import axios from "@/utils/axios"

export const getFood = ({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return {
            type:"getFood",
            food:res.data.result
        }
    })
}

export const getFoodType = ({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return {
            type:"getFoodType",
            tabs:res.data.result
        }
    })
}

export const getFoodList = ({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return {
            type:"getFoodList",
            foodList:res.data.result
        }
    })
}

export const searchList=({url,params,cb})=>{
    return axios.get(url,{params}).then(res=>{
        cb();
        return {
            type:"searchList",
            searchList:res.data.result
        }
    })
}

export const getReverseFood = () =>{
    return {
        type:"getReverseFood"
    }
}

export const saveItem = (item) =>{
    return {
        type:"saveItem",
        item
    }
}

export const addInfo=({url,params,cb})=>{
    return axios.post(url,{params}).then(res=>{
        cb();
        return {
            type:"evaluate",
        }
    })
}

export const getInfo=({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return {
            type:"getInfo",
            getInfo:res.data.result
        }
    })
}

export const getCommentInfo=({url,params,cb})=>{
    return axios.get(url,{params}).then(res=>{
        cb();
        return {
            type:"getCommentInfo",
            commentInfo:res.data.result
        }
    })
}


//收藏

export const OBSERVEGAME = 'observeGame'
export const observeGame = ({url,params})=>{
  return axios.get(url,{params}).then(res=>{
    return {
      type:OBSERVEGAME,
      isObserve: true
    }
  })
}
//取消收藏

export const CANCELOBSERVE = "cancelObserve"
export const cancelObserve =({url,params})=>{
  return axios.get(url,{params}).then(res=>{
    return {
      type:CANCELOBSERVE,
      isObserve: false
    }
  })
}



//判断是否收藏
export const GETISOBSERVE = "getIsObserve"
export const getIsObserve = ({url,params}) => {
  return axios.get(url, {params}).then(res => {
    console.log(res.data.result)
    var flag = res.data.result == null ? false : true
    return {
      type: GETISOBSERVE,
      isObserve: flag
    }
  })
}