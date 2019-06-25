
import "./index.scss";
import { NavBar, Icon, Tabs, WhiteSpace, WingBlank, List, InputItem, Button ,Toast} from 'antd-mobile';
import axios from "@/utils/axios"
const mobileReg = /^1(3|5|7|8|9)\d{9}$/;
const codeReg = /^\d{4}$/;
var timer = null;
export class Login extends Component {

    state = {
        toggle: true,
        mobileDis: true,
        flag: true,
        count: 60,
        txt: "获取验证码",
        loginInfo:{}
    };

    checkMobile = (mobile) => {
        console.log(mobile);
        if (mobileReg.test(mobile)) {
            this.setState({
                mobileDis: false
            })
        } else {
            this.setState({
                mobileDis: true
            })
        }
        if (this.state.flag) {
            this.setState({
                mobileDis: !mobileReg.test(mobile)
            })
        }
    }

    startTime = () => {
        console.log('uuu')
        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: this.state.count + ' s 后继续'
                })

            } else {
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt: "获取验证码",
                    mobileDis: false,
                    flag: true,
                    count: 60
                })
            }
        }, 1000)
    }

    getCode = () => {
        console.log("sss");

        axios.post("/react/sendCode", {
            mobile: this.refs.mobile.state.value
        }).then(res => {
            console.log(res);
        })

        this.setState({
            mobileDis: true,
            flag: false
        })
        // ajax 
        this.startTime();


    }

    checkCode = (val) => {
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle: !(codeReg.test(val) && mobileReg.test(mobile))
        })
    }

    autoLogin = () => {
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.code.state.value;

        axios.post("/react/testCode", {
            mobile,
            code
        }).then(res => {
            console.log(res);
            if (!!res.data.type) {
                this.props.history.push("/app/my");
                var userInfo = {
                    token: res.data.token
                }
                sessionStorage.userInfo = JSON.stringify(userInfo)
            } else {
                delete sessionStorage['userInfo']
            }
        })
    }
    goRegister = () => {
        const { history } = this.props;
        history.push("/register")
    }
    login=()=>{
        this.state.loginInfo.username=this.refs.username.state.value;
        this.state.loginInfo.pwd=this.refs.pwd.state.value;
        console.log(this.state.loginInfo)
        if (this.state.loginInfo.username && this.state.loginInfo.pwd) {
            axios.post("/react/login", this.state.loginInfo).then(res => {
                if (!!res.data.type) {
                    window.localStorage.setItem("loginname", this.state.loginInfo.username);
                    this.props.history.push("/app/my");
                }
            });
        } else {
            Toast.info("账号或密码不正确",2)
        }
    }
    render() {
        const tabs = [
            { title: '密码登录' },
            { title: '验证码登录' }
        ];
        const party = [
            { name: "QQ", icon: "icon-QQ" },
            { name: "微信", icon: "icon-weixin" },
            { name: "新浪微博", icon: "icon-qunfengxinlangweibo" },
            { name: "支付宝", icon: "icon-zhifubao" }
        ];
        const {
            toggle,
            mobileDis,
            txt
        } = this.state
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >登录</NavBar>
                <WhiteSpace />
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarUnderlineStyle={{ border: "1.2px solid orange" }}
                    tabBarActiveTextColor="orange"
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
                        <WingBlank>
                            <List>
                                <WhiteSpace />
                                <InputItem
                                    type="tel"
                                    placeholder="请输入用户名/手机号"
                                    onChange={this.checkMobile}
                                    ref="username"
                                >用户名</InputItem>
                                <WhiteSpace />
                                <InputItem
                                    type="password"
                                    placeholder="请输入密码"
                                    ref="pwd"
                                    onChange={this.checkCode}
                                >密码</InputItem>
                                <WhiteSpace />
                                <Button className="btn-2" type="primary" onClick={this.login}>马上登录</Button>
                                <Button className="btn-3" onClick={this.goRegister}>没有账号,立即注册</Button><WhiteSpace />
                                <div className="loginbottom">
                                    <div className="loginbottom-top">
                                        <div className="line"></div>
                                        <span className="party">第三方登录</span>
                                        <div className="line"></div>
                                    </div>
                                    <ul className="cl">
                                        {
                                            party.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <i className={"iconfont threelogin " + item.icon}></i>
                                                        <p>{item.name}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </List>
                        </WingBlank>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
                        <WingBlank>
                            <List>
                                <WhiteSpace />
                                <InputItem
                                    type="tel"
                                    placeholder="请输入手机号"
                                    onChange={this.checkMobile}
                                    ref="mobile"
                                >手机号</InputItem>
                                <WhiteSpace />
                                <InputItem
                                    type="tel"
                                    placeholder="请输入验证码"
                                    ref="code"
                                    className="input"
                                    onChange={this.checkCode}
                                >验证码</InputItem>

                                <Button className="l-btn" ref="btn" inline size="small" type="warning" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                                <WhiteSpace />
                                <Button className="btn-2" type="primary" disabled={toggle} onClick={this.autoLogin}>马上登录</Button>
                                {/* <Button className="btn-3">没有账号,立即注册</Button><WhiteSpace /> */}
                                <div className="loginbottom">
                                    <div className="loginbottom-top">
                                        <div className="line"></div>
                                        <span className="party">第三方登录</span>
                                        <div className="line"></div>
                                    </div>
                                    <ul className="cl">
                                        {
                                            party.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <i className={"iconfont threelogin " + item.icon}></i>
                                                        <p>{item.name}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </List>
                        </WingBlank>
                    </div>
                </Tabs>
                <WhiteSpace />
            </div >
        )
    }
}