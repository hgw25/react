import "./index.scss";
import { Head } from "~/components/head"
import { Card, WingBlank, WhiteSpace, ListView, Grid, List, Popover, NavBar, Icon } from 'antd-mobile';

const Item1 = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
export class My extends Component {
    state = {
        visible: false,
        selected: '',
        isLogin: false,
        username: "请登录",
        data: [
            {
                icon: "https://www.ecook.cn/resources/v2/images/1.png",
                text: "收藏"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/2.png",
                text: "兴趣"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/1.png",
                text: "作品"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/5.png",
                text: "课程"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/3.png",
                text: "菜篮"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/4.png",
                text: "会员"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/5.png",
                text: "钱包"
            },
            {
                icon: "https://www.ecook.cn/resources/v2/images/3.png",
                text: "厨币"
            },
        ]
    }
    onSelect = (opt) => {
        console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        if(opt.props.value=="button ct"){
            console.log("000000")
            window.localStorage.removeItem("loginname")
            this.setState({
                username: "请登录"
            })
        }
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    goLogin = () => {
        const { history } = this.props;
        history.push("/login")
    }
    componentWillMount() {
        var username = localStorage.getItem("loginname")
        if (username) {
            this.setState({
                username: username
            })
        }
    }
    render() {
        const {
            isLogin,
            data,
            username
        } = this.state;
        const Item = List.Item;
        return (
            <div>
                {/* <Head title="个人中心"></Head> */}
                {/* <div className="header cl">
                    <p className="icon">
                        <i className="iconfont icon-icon-p_xinfeng"></i>
                        <i className="iconfont icon-shezhi"></i>
                    </p>
                </div> */}
                <NavBar
                    mode="light"
                    rightContent={
                        <Popover mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item1 key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫一扫</Item1>),
                                (<Item1 key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>我的二维码</Item1>),
                                (<Item1 key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                                    <span style={{ marginRight: 5 }}>注销</span>
                                </Item1>),
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis" />
                            </div>
                        </Popover>
                    }
                >
                    个人中心
                </NavBar>
                <WingBlank size="lg" className="login">
                    <WhiteSpace size="lg" />
                    <div className="head cl">
                        <i></i>
                        <span onClick={this.goLogin}>{username}</span>
                    </div>
                    {/* <WhiteSpace size="lg" /> */}
                </WingBlank>
                <Grid className="grid" data={data} hasLine={false} />
                <List className="my-list">
                    <Item extra="" arrow="horizontal" onClick={() => { }}>厨币商城</Item>
                    <Item extra="" arrow="horizontal" onClick={() => { }}>任务奖励</Item>
                    <Item extra="" arrow="horizontal" onClick={() => { }}>商城订单</Item>
                    <Item extra="" arrow="horizontal" onClick={() => { }}>草稿箱</Item>
                    <Item extra="" arrow="horizontal" onClick={() => { }}>达人申请</Item>
                    <Item extra="" arrow="horizontal" onClick={() => { }}>联系客服</Item>
                </List>
            </div>
        )
    }
}