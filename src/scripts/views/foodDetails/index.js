import "./index.scss"
import { NavBar, Icon, Card, WingBlank, WhiteSpace ,Modal} from 'antd-mobile';
import { connect } from "react-redux";
import { getCommentInfo, observeGame, cancelObserve, getIsObserve } from "../../actions";
import { Star } from "@/scripts/components/star";
import { LikeBtn } from "@/scripts/components/likeBtn";
const alert = Modal.alert;
@connect(
    state => ({
        ...state.item,
        ...state.evaluate,
        ...state.collection
    })
)
export class FoodDetails extends Component {
    goDetailsComment = () => {
        let username = localStorage.getItem("loginname")
        if (username) {
            this.props.history.push("/detailsComment")
        } else {
            alert('未登录', '是否去登陆?', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                    text: '确定',
                    onPress: () =>
                        new Promise((resolve) => {
                            this.props.history.push('/login')
                            setTimeout(resolve, 500);
                        }),
                },
            ])
        }
        
    }

    changeObserve = () => {
        let username = localStorage.getItem("loginname")
        if (username) {
            const { dispatch, item, isObserve } = this.props;
            const collectionId = item._id;
            const username = localStorage.getItem("loginname")
            if (!isObserve) {
                dispatch(observeGame({
                    url: "/react/observegame",
                    params: {
                        title: item.title,
                        img: item.img,
                        author: item.author,
                        commentNum: item.commentNum,
                        collectionNum: item.collectionNum,
                        pbm: item.pbm,
                        username: username,
                        collectionId: collectionId
                    }
                }
                ))
            } else {
                dispatch(cancelObserve({
                    url: "/react/cancelobserve",
                    params: {
                        username,
                        collectionId,
                    }
                }
                ))
            }
        } else {
            alert('未登录', '是否去登陆?', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                    text: '确定',
                    onPress: () =>
                        new Promise((resolve) => {
                            this.props.history.push('/login')
                            setTimeout(resolve, 500);
                        }),
                },
            ])
        }
       
    }
    componentWillMount() {
        console.log(this.props.item)
        const { dispatch } = this.props;
        const foodId = this.props.item._id;
        console.log(foodId)
        const username = localStorage.getItem("loginname")
        const collectionId = this.props.item._id;
        dispatch(getCommentInfo({
            url: "/react/getCommentInfo",
            params: { foodId: foodId },
            cb() { }
        }))
        dispatch(getIsObserve({
            url: "/react/getisobserve",
            params: {
                username,
                collectionId
            }
        }
        ))
    }
    render() {
        console.log(this.props)
        const { item, commentInfo, isObserve } = this.props
        const like = item.commentNum
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    style={{ position: 'fixed', left: 0, top: 0, width: "100%", zIndex: 10 }}
                >详情</NavBar>
                <div style={{ width: "96%", backgroundColor: '#fff', padding: '1rem 2% 0' }}>
                    <img style={{ width: "100%", height: '5rem', borderRadius: '0.2rem' }} src={item.img} alt="" />
                </div>
                <div style={{ backgroundColor: '#fff', padding: '0.4rem 0.2rem' }}>
                    <p style={{ fontSize: '0.4rem', color: '#000', fontWeight: '500' }}>{item.title}</p>
                    <div style={{ margin: '0.3rem 0' }}>
                        <span style={{ marginRight: '0.5rem', fontSize: '0.24rem' }}>{item.collectionNum}人收藏</span>
                        <span>{item.commentNum}人点赞</span>
                    </div>
                    <div style={{ paddingBottom: '0.2rem' }}>
                        <i className="iconfont icon-remen" style={{ fontSize: '0.5rem', color: 'orange' }}></i>
                        <span style={{ fontSize: '0.3rem', color: '#000', marginLeft: '0.1rem' }}>{item.author}</span>
                        <p style={{ lineHeight: '0.4rem', float: 'right', backgroundColor: "#fcefa6", color: 'orange', borderRadius: '0.2rem', padding: '0 0.15rem 0 0.15rem', marginTop: '0.1rem' }}>
                            <i style={{ fontSize: '0.24rem', marginRight: '0.1rem' }} className="iconfont icon-gerenzhongxin"></i>
                            <span style={{ fontSize: '0.24rem' }}>关注</span>
                        </p>
                    </div>
                    <p className="sl-2" style={{ fontSize: '0.3rem', paddingTop: '0.3rem', borderTop: '1px solid #eee' }}>{item.pbm}</p>
                </div>
                <WingBlank size="sm">
                    <WhiteSpace size="sm" />
                    <p style={{ fontSize: '0.3rem', color: '#000', margin: '0.2rem 0' }}>评论区 :</p>
                    <Card>
                        <Card.Header
                            className="sl"
                            title={<div><p style={{ lineHeight: "0.3rem", marginBottom: '0.2rem' }}>{item.title}</p>
                                <p style={{ float: 'left', lineHeight: '0.3rem', marginRight: '0.1rem' }}>美味level : </p>
                                <Star name={item.score * 2}></Star>
                            </div>}
                            thumb={item.img}
                            thumbStyle={{ borderRadius: '0.2rem', height: '1rem', marginRight: '0.3rem' }}
                            // extra={<span>this is extra</span>}
                            style={{ color: "red", lineHeight: 0, fontSize: '0.3rem' }}
                        />
                        <Card.Body>
                            <div>春游踏青的时候做点饭团带上，方便又好吃。</div>
                        </Card.Body>
                        <Card.Footer content={<i className="iconfont icon-duihuakuang4"></i>} extra={<div>评论者: 妞妞妈美食</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
                {
                    commentInfo.map((item, index) => {
                        return (
                            <WingBlank key={index} size="sm">
                                <WhiteSpace size="sm" />
                                <Card>
                                    <Card.Header
                                        className="sl"
                                        title={<div><p style={{ lineHeight: "0.3rem", marginBottom: '0.2rem' }}>{item.title}</p>
                                            <p style={{ float: 'left', lineHeight: '0.3rem', marginRight: '0.1rem' }}>美味level : </p>
                                            <Star name={item.score * 2}></Star>
                                        </div>}
                                        thumb={item.img}
                                        thumbStyle={{ borderRadius: '0.2rem', height: '1rem', marginRight: '0.3rem' }}
                                        // extra={<Star name={item.score*2}></Star>}
                                        style={{ color: "red", lineHeight: 0, fontSize: '0.3rem' }}
                                    />
                                    <Card.Body>
                                        <div>{item.content}</div>
                                    </Card.Body>
                                    <Card.Footer content={<i className="iconfont icon-duihuakuang4"></i>} extra={<div>评论者: {item.username}</div>} />
                                </Card>
                                <WhiteSpace size="lg" />
                            </WingBlank>
                        )
                    })
                }
                <div style={{ paddingBottom: '1rem' }}></div>
                <div>
                    <ul className="detailsFoot cl">
                        <li onClick={this.goDetailsComment}>
                            <i className="iconfont icon-duihuakuang4"></i>
                            <span>评论</span>
                        </li>
                        <li className="sl">
                            <LikeBtn like={like}></LikeBtn>
                        </li>
                        <li className="sl">
                            <div onClick={this.changeObserve} style={{ color: isObserve ? 'orange' : '' }}>
                                <i className="iconfont icon-star" style={{ fontSize: '0.24rem' }}></i>
                                <span>{isObserve ? '取消收藏' : '收藏'}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}