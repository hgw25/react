

import "./index.scss";
import {link,NavLink} from "react-router-dom";
import {Badge} from "antd-mobile"

export const foots=[
    {txt:"首页",path:"/app/home",name:"home",icon:"icon-chushimao"},
    {txt:"分类",path:"/app/classify",name:"classify",icon:"icon-fenlei"},
    {txt:"食话",path:"/app/cart",name:"cart",icon:"icon-duihuakuang4"},
    {txt:"我的",path:"/app/my",name:"my",icon:"icon-wode"}
]
export const Foot=()=>{
    return (
        <footer>
            {
                foots.map((item,i)=>{
                    return (
                        <div key={i}>
                            <NavLink to={item.path}                             activeClassName="nav-active">
                                <i className={"iconfont icon "+item.icon}></i>
                                <span>{item.txt}</span>
                                {i==2&&<Badge className="hot" text={8} style={{marginLeft:12}}></Badge>}
                            </NavLink>
                        </div>
                    )
                })
            }
        </footer>
    )
}


