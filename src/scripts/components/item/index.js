import "./index.scss"

import { WingBlank, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom"
export class Item extends Component {
    render() {
        const {
            food
        } = this.props;
        return (
            <div className="move-in item">
                <Link to={"/food/detail/" + food._id + "?name=" + food.title} >
                    {/* <WhiteSpace/> */}
                    <div className="cl" style={{ padding: '2%' }}>
                        <img src={food.img} alt="" style={{ width: "40%", height: '2rem', borderRadius: '0.2rem',float:'left'}} />
                        <div style={{ padding: '1% 2%',width: '60%',float: 'left',textAlign: 'left'}}>
                            <h2 style={{ fontSize:'0.3rem',fontWeight:550,color:'#000'}}>{food.title}</h2>
                            <p className="sl" style={{ margin: '5% 0',color:'#000'}}>{food.pbm}</p>
                            <p>{food.author}</p>
                            <p style={{marginTop:'12%'}}>
                                <span style={{marginRight: '0.2rem'}}>{food.collectionNum}人收藏</span>
                                <span>{food.commentNum}人点赞</span>
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}