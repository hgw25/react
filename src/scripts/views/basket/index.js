
import { NavBar, Icon, Button } from 'antd-mobile';
import axios from "@/utils/axios"
import "./index.scss"
import { connect } from "react-redux";
import {saveItem,cancelObserve } from "../../actions";
@connect(
    state => {
        return {
            ...state.food
        }
    }
)
export class Basket extends Component {
    state = {
        myCollection: []
    }
    goFoodDetails = (item) => {
        const { dispatch } = this.props;
        dispatch(saveItem(item))
        console.log(item)
        this.props.history.push("/foodDetails")
    }
    removeCollection = (item) => {
        const { dispatch } = this.props;
        const collectionId = item.collectionId;
        const username = localStorage.getItem("loginname")
        dispatch(cancelObserve({
            url:"/react/cancelobserve",
            params:{
                username,
                collectionId,
            }
        }).then(res=>{
            axios.post("/react/getCollection", { username }).then(res => {
                this.setState({
                    myCollection: res.data.result
                })
            })
        }))
    }
    componentWillMount() {
        let username = localStorage.getItem("loginname")
        console.log(username)
        axios.post("/react/getCollection", { username }).then(res => {
            this.setState({
                myCollection: res.data.result
            })
            console.log(res.data.result)
        })
    }
    render() {
        const { myCollection } = this.state;
        console.log(myCollection)
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >我的收藏</NavBar>
                <ul style={{ backgroundColor: '#fff' }}>
                    {
                        myCollection.map((item, i) => {
                            return (
                                <li className="li cl" key={i} style={{ position: 'relative' }}>
                                    <div onClick={() => this.goFoodDetails(item)}>
                                        <img src={item.img} alt="" />
                                        <div className="div">
                                            <h2 className="cl">{item.title}</h2>
                                            <p className="p1 sl">{item.pbm}</p>
                                            <p className="p2">{item.author}</p>
                                            <div className="p3" style={{ lineHeight: '0.2rem' }}>
                                                <span className="span1">{item.collectionNum}人收藏</span>
                                                <span className="span2">{item.commentNum}人点赞</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{
                                        position: "absolute", right: "0.2rem", bottom: "0.2rem", width: '1rem', height: '0.5rem',
                                        backgroundColor: "rgba(255,0,0,.5)", textAlign: "center", lineHeight: '0.5rem', borderRadius: "0.2rem", color: '#fff', fontSize: '0.24rem'
                                    }} onClick={() => this.removeCollection(item)}>删除</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}