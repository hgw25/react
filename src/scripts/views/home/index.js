import "./index.scss"
// import {Head} from "~/components/head"
import { SearchBar, Grid, List, Carousel, Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { getFood } from "../../actions";
import { saveItem } from "../../actions"
import { connect } from "react-redux";

const alert = Modal.alert;
@connect(
    state => {
        return {
            ...state.food
        }
    }
)
export class Home extends Component {
    state = {
        data: [
            {
                icon: "https://s1.c.meishij.net/wap6/images/v6/quanbunew.png",
                text: "热门菜谱"
            },
            {
                icon: "https://s1.c.meishij.net/wap6/images/v6/shipincaipunew.png",
                text: "美食视频"
            },
            {
                icon: "https://s1.c.meishij.net/wap6/images/v6/kuaishoucainew.png",
                text: "我的收藏"
            },
            {
                icon: "https://s1.c.meishij.net/wap6/images/v6/fujinnew.png",
                text: "每日签到"
            }
        ],
        images: [
            { img: "https://pic.ecook.cn/web/260030718.jpg!wl280" },
            { img: "https://pic.ecook.cn/web/262237083.jpg!wl280" },
            { img: "https://pic.ecook.cn/web/262226424.jpg!wl280" },
            { img: "https://pic.ecook.cn/web/257739499.jpg!wl280" },
        ]
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getFood({
            url: "/react/food",
            cb() { }
        }))
    }
    goDetails = (item) => {
        const { dispatch } = this.props;
        dispatch(saveItem(item))
        console.log(item)
        this.props.history.push("/foodDetails")
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
    render() {
        const {
            data,
            images,
        } = this.state;
        const Item = List.Item;
        console.log(this.props.food)
        console.log(this.props.food.filter((item, index) => index <= 3))
        const food1 = this.props.food.filter((item, index) => index <= 3);
        const food2 = this.props.food.filter((item, index) => index > 3 && index <= 7);
        const food3 = this.props.food.filter((item, index) => index > 7 && index <= 11);
        return (
            <div className="all">
                <div className="top">
                    <i className="iconfont left icon-addTodo-nav"></i>
                    <div className="search" onClick={() => this.props.history.push("/search")}>
                        <div className="head">
                            <i className="iconfont center icon-sousuo"></i>
                            搜索 菜谱
                            {/* <input className="input" type="text" placeholder="搜索 菜谱" /> */}
                        </div>
                    </div>
                    <i className="iconfont right icon-cailan" onClick={this.goBasket}></i>
                </div>
                <Grid onClick={this.goBasket} itemStyle={{ marginTop: '1rem' }} data={data} hasLine={false} />
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { this.props.history.push("/app/classify") }}>热门兴趣·家常菜</Item>
                </List>
                <div className="banner">
                    <ul className="nav cl">
                        {
                            food1.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => this.goDetails(item)}>
                                        <img style={{ height: "2.7rem" }} src={item.img} alt="" />
                                        <p className="p1 sl">{item.title}</p>
                                        <p className="p2">{item.author}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { this.props.history.push("/app/classify") }}>热门兴趣·早餐</Item>
                </List>
                <WingBlank>
                    <Carousel className="space-carousel"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.8}
                        autoplay
                        infinite
                        afterChange={index => this.setState({ slideIndex: index })}
                    >
                        {images.map((val, index) => (
                            <a
                                key={val}
                                // href=""
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    top: this.state.slideIndex === index ? -10 : 0,
                                    height: this.state.imgHeight,
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <img
                                    key={index}
                                    src={val.img}
                                    alt=""
                                    style={{ width: '100%', height: '3.3rem', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { this.props.history.push("/app/classify") }}>热门兴趣·面食</Item>
                </List>
                <div className="banner">
                    <ul className="nav cl">
                        {
                            food2.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => this.goDetails(item)}>
                                        <img style={{ height: "2.7rem" }} src={item.img} alt="" />
                                        <p className="p1 sl">{item.title}</p>
                                        <p className="p2">{item.author}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { this.props.history.push("/app/classify") }}>菜谱推荐</Item>
                </List>
                <ul className="list cl">
                    {
                        this.props.food.map((item, index) => {
                            return (
                                <li key={index} onClick={() => this.goDetails(item)}>
                                    <img style={{ height: "2.5rem" }} className="img" src={item.img} alt="" />
                                    <p className="p1 sl">{item.title}</p>
                                    <p className="p2 sl">{item.author}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div >
        )
    }
}