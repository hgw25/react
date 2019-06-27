import "./index.scss"
import { NavBar, Icon, Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from "react-redux";
import { getCommentInfo } from "../../actions";
import {Star} from "@/scripts/components/star"

@connect(
    state => ({
        ...state.item,
        ...state.evaluate
    })
)
export class FoodDetails extends Component {
    goDetailsComment = () => {
        this.props.history.push("/detailsComment")
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCommentInfo({
            url: "/react/getCommentInfo",
            cb() { }
        }))
    }
    render() {
        console.log(this.props)
        const { item, commentInfo } = this.props
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push('/app/classify')}
                    style={{ position: 'fixed', left: 0, top: 0, width: "100%" }}
                >详情</NavBar>
                <div style={{ width: "100%", backgroundColor: '#fff', paddingTop: '1rem' }}>
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
                    <Card>
                        <Card.Header
                            className="sl"
                            title={item.title}
                            thumb={item.img}
                            thumbStyle={{ borderRadius: '0.2rem', height: '1rem', marginRight: '0.3rem' }}
                            extra={<span>this is extra</span>}
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
                                        title={item.title}
                                        thumb={item.img}
                                        thumbStyle={{ borderRadius: '0.2rem', height: '1rem', marginRight: '0.3rem' }}
                                        extra={<Star name={commentInfo.score}></Star>}
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
                        <li>
                            <i className="iconfont icon-dianzan"></i>
                            <span>点赞</span>
                        </li>
                        <li>
                            <i className="iconfont icon-star" style={{ fontSize: '0.24rem' }}></i>
                            <span>收藏</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}