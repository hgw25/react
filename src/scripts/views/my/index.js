import "./index.scss";
import { Head } from "~/components/head"
import { Card, WingBlank, WhiteSpace, ListView, Grid, List, Popover, NavBar, Icon, Modal } from 'antd-mobile';
const alert = Modal.alert;
const Item1 = Popover.Item;

import axios from "@/utils/axios"

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
document.addEventListener("plusready", plusReady, false);

function plusReady() {
    // 			getNetWork();
    getAuthServices()

}
// 获取第三方登录的服务列表 
function getAuthServices() {
    plus.oauth.getServices((services) => {
        auths = services;
        console.log(JSON.stringify(auths));
    }, (e) => {
        plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));
    })
}
export class My extends Component {
    state = {
        visible: false,
        selected: '',
        userImg: "",
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
    seen() {
        this.state.userImg = localStorage.imgUrl
    }
    updateimg() {
        console.log("上传图片");

        this.$refs.one.click();
    }

    // 将头像显示
    shangchuan = (e) => {
        let $target = e.target || e.srcElement
        let file = $target.files[0];

        console.log(this.refs.one);
        let data = new FormData();    // 构建表单数据对象  
        data.append('avatar', file);  // 需要上传到 服务器 的数据
        data.append("like", 'wh1901');
        const instance = axios.create({
            withCredentials: true
        })
        instance.post('/react/upload-avatar', data).then(res => {
            console.log(res)
            localStorage.imgUrl = res.data.imgUrl.replace(/public/, axios.url);
            this.setState({
                userImg: res.data.imgUrl.replace(/public/, axios.url)
            })
        })
    }


    onSelect = (opt) => {
        console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        if (opt.props.value == "button ct") {
            // if (auths) {
            //     for (var s in auths) {
            //         auths[s].logout(function (e) {
            //             plus.nativeUI.alert("注销登录认证成功!");
            //         }, function (e) {
            //             plus.nativeUI.alert("注销登录认证失败: ");
            //         });
            //     }
            // }
            console.log("000000")
            window.localStorage.removeItem("loginname")
            this.setState({
                username: "请登录"
            })
        }
        if (opt.props.value == "special") {
            console.log("111111111")
            this.props.history.push("/material")
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
    goBasket = () => {
        let username = localStorage.getItem("loginname")
        if (username) {
            this.props.history.push("/basket")
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
        var username = localStorage.getItem("loginname")
        if (username) {
            this.setState({
                username: username
            })
        }
        var imgurl = localStorage.imgUrl;
        console.log(imgurl);
        this.setState({
            userImg: imgurl
        })
    }
    render() {
        const {
            isLogin,
            data,
            username,
            userImg
        } = this.state;
        const Item = List.Item;
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={
                        <Popover mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item1 key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫一扫</Item1>),
                                (<Item1 key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>编辑质料</Item1>),
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
                        <div style={{ width: "100%", textAlign: "center" }}>
                            <div id="photo" className="my-top" onClick={this.seen}><img src={userImg} onClick={this.updateimg} className="touxiang" /></div>
                            <div style={{float:'left'}}>
                                <p onClick={this.goLogin}>{username}</p>
                                <input type="file" ref="one" accept="image/*" onChange={this.shangchuan} className="hiddenInput" style={{ display: "block",  marginTop: "4px" ,marginLeft:'5px',border:"none", width:'1.1rem',height:'0.3rem'}} />
                            </div>

                        </div>

                    </div>
                    {/* <WhiteSpace size="lg" /> */}
                </WingBlank>
                <Grid onClick={this.goBasket} className="grid" data={data} hasLine={false} />
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