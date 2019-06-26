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