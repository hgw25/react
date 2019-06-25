import axios from "@/utils/axios"

export const getBanner = ({url,cb})=>{
    return axios.get(url).then(res=>{
        cb();
        return {
            type:"getFood",
            food:res.data.result
        }
    })
}