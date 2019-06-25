import "./index.scss"

import {WingBlank,WhiteSpace } from "antd-mobile";
import {Link} from "react-router-dom"
export class Item extends Component{
    render(){
        const {
            food
        } = this.props;
        return (
            <div className="move-in item">
                <Link to={"/food/detail/"+food._id+"?name="+food.title } >
                    <WhiteSpace/>
                    <WingBlank>
                        <img src={food.img} alt="" style={{width:"100%",height:260}}/>
                        <h2 style={{color:"yellowgreen",fontSize:".4rem"}}>
                            {food.title} === RMB --- {food.commentNum} - type={food.type}
                        </h2>
                    </WingBlank> 
                </Link>
            </div>
        )
    }
}