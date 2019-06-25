import "./index.scss";
import { Head } from "~/components/head"
import { Card, WingBlank, WhiteSpace, ListView, Grid, List } from 'antd-mobile';

export class My extends Component {
    state = {
        isLogin: false,
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
    goLogin = () => {
        const { history } = this.props;
        history.push("/login")
    }
    render() {
        const {
            isLogin,
            data
        } = this.state;
        const Item = List.Item;
        return (
            <div>
                {/* <Head title="个人中心"></Head> */}
                <div className="header cl">
                    <p className="icon">
                        <i className="iconfont icon-icon-p_xinfeng"></i>
                        <i className="iconfont icon-shezhi"></i>
                    </p>
                </div>
                <WingBlank size="lg" className="login">
                    <WhiteSpace size="lg" />
                    <div className="head cl">
                        <i></i>
                        <span onClick={this.goLogin}>请登录</span>
                    </div>
                    <WhiteSpace size="lg" />
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
                {/* <h2>he - he - he</h2>
                <div style={{display:isLogin?'block':'none'}}>
                    <h2>你的账户 == {13212341234}</h2>
                    <img src={require('@/assets/images/photo.png')} alt=""/>
                </div>
                <Button onClick={this.goLogin} style={{display:!isLogin?'inline-block':'none'}} type="warning" inline>马上登录</Button> */}
            </div>
        )
    }
}