
import "./index.scss";
import { NavBar, Icon, Card, WingBlank, WhiteSpace, Button ,Modal} from 'antd-mobile';
import { getInfo } from "../../actions";
import { connect } from "react-redux";
const alert = Modal.alert;
@connect(
    state => ({
        ...state.evaluate,
    })
)
export class Details extends Component {
    goComment = () => {
        this.props.history.push("/comment")
    }
    componentWillMount() {
        let username = localStorage.getItem("loginname")
        if (username) {
            const { dispatch } = this.props
            dispatch(getInfo({
                url: "/react/getInfo",
                cb() { }
            }))
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
    render() {
        console.log(this.props)
        const { getInfo } = this.props
        console.log(getInfo)
        return (
            <div>
                <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', zIndex: 10 }}>
                    <NavBar
                        mode="light"
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={
                            <p onClick={this.goComment}>添加食话</p>
                        }
                    >食话</NavBar>
                </div>
                <div style={{ paddingTop: '1rem' }}></div>
                <WingBlank size="sm">
                    <WhiteSpace size="sm" />
                    <Card>
                        <Card.Header
                            title="早餐三明治"
                            thumb="http://pic.ecook.cn/web/262886111.jpg!s4"
                            thumbStyle={{ borderRadius: '0.2rem', height: '2rem', marginRight: '1rem' }}
                            style={{ color: "red", lineHeight: 0, fontSize: '0.5rem' }}
                        />
                        <Card.Body>
                            <div>春游踏青的时候做点饭团带上，方便又好吃。</div>
                        </Card.Body>
                        <Card.Footer content={<i className="iconfont icon-duihuakuang4"></i>} extra={<div>评论者: 妞妞妈美食</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>

                {
                    getInfo.map((item, index) => {
                        return (
                            <WingBlank key={index} size="sm">
                                <WhiteSpace size="sm" />
                                <Card>
                                    <Card.Header
                                        title={item.title}
                                        thumb={item.img}
                                        thumbStyle={{ borderRadius: '0.2rem', height: '2rem', marginRight: '1rem' }}
                                        style={{ color: "red", lineHeight: 0, fontSize: '0.5rem' }}
                                    />
                                    <Card.Body>
                                        <div>{item.content}</div>
                                    </Card.Body>
                                    <Card.Footer content={<i className="iconfont icon-duihuakuang4"></i>} extra={<div>评论者: {localStorage.getItem("loginname")}</div>} />
                                </Card>
                                <WhiteSpace size="lg" />
                            </WingBlank>
                        )
                    })
                }
                <div style={{ paddingBottom: '1rem' }}></div>
            </div>
        )
    }
}