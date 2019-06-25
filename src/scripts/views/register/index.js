
import "./index.scss";
import axios from "@/utils/axios";
import { NavBar, Icon, InputItem, WhiteSpace, Button, WingBlank, Toast } from 'antd-mobile';
export class Register extends Component {
    state = {
        userflag: {
            // usernameflag: false,
            // usermobileflag: false,
            // userpwdflag: false,
            // userdbpwdflag: false
        },
        loginInfo: {},
        registerInfo: {},
    }

    userfouce = (val) => {
        var userReg = /^[a-z_$][0-9a-z_$]{5,9}$/gi;
        console.log(val)
        if (userReg.test(val) == true) {
            // this.setState({
            //     userflag.usernameflag:true
            // })
            this.state.userflag.usernameflag = true;
            this.state.registerInfo.username=val;
            console.log(this.state.userflag.usernameflag);
        } else {
            Toast.info('请输入由数字,字母_$组成的6-10位用户名,且首位为字母或_或$', 3);
        }
    }
    mobilefouce=(val)=>{
        var phoneReg = /^1[3456789][0-9]{9}$/g;
        if (phoneReg.test(val) == true) {
            this.state.userflag.usermobileflag = true;
            this.state.registerInfo.mobile=val;
        } else {
            Toast.info("请输入常见的手机号",2);
        }
    }
    pwdfouce=(val)=>{
        var pwdReg = /^[0-9a-z]{6,12}$/gi;
        if (pwdReg.test(val) == true) {
            this.state.userflag.userpwdflag = true;
        } else {
            Toast.info("请输入由6-12位数字和字母组成的密码",2);
        }
    }
    dbpwdfouce=(val)=>{
        if (this.refs.pwd.value == this.refs.dbpwd.value) {
            this.state.userflag.userdbpwdflag = true;
            this.state.registerInfo.pwd=val;
        } else {
            Toast.info("密码不相符",2);
        }
    }
    register=()=>{
        if (this.state.userflag.usernameflag && this.state.userflag.usermobileflag && this.state.userflag.userpwdflag && this.state.userflag.userdbpwdflag) {
            axios.post("/react/register", this.state.registerInfo).then(res => {
                if (res.data.type == 1) {
                    console.log("33333333")
                    console.log(this.props)
                    this.props.history.push("/login")
                } else {
                    // this.selected = "register";
                }
                this.registerInfo = {};
            });
        }
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >注册</NavBar>
                <WhiteSpace />
                <div className="logo">
                    <i className="iconfont icon-remen" style={{ fontSize: '3rem', color: 'orange' }}></i>
                </div>
                <InputItem
                    type="tel"
                    placeholder="请输入用户名"
                    onBlur={this.userfouce}
                    ref="username"
                >用户名</InputItem>
                <InputItem
                    type="tel"
                    placeholder="请输入手机号"
                    onBlur={this.mobilefouce}
                    ref="mobile"
                >手机号</InputItem>
                <InputItem
                    type="password"
                    placeholder="请输入密码"
                    ref="pwd"
                    onBlur={this.pwdfouce}
                >密码</InputItem>
                <InputItem
                    type="password"
                    placeholder="请再次输入密码"
                    onBlur={this.dbpwdfouce}
                    ref="dbpwd"
                >确认密码</InputItem>
                <WhiteSpace />
                <Button className="btn-2" type="primary" onClick={this.register}>立即注册</Button>
            </div>
        )
    }
}