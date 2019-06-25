import "./index.scss"
// import {Head} from "~/components/head"
import { SearchBar, Button, WhiteSpace, WingBlank, Grid, List, Carousel } from 'antd-mobile';
import { connect } from "react-redux";
import { getFood } from "../../actions";


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
    render() {
        // console.log("11111")
        // console.log(this.props)
        const {
            data,
            images,
        } = this.state;
        const Item = List.Item;
        return (
            <div className="all">
                <div className="top">
                    <i className="iconfont left icon-addTodo-nav"></i>
                    <div className="search">
                        <div className="head">
                            <i className="iconfont center icon-sousuo"></i>
                            <input className="input" type="text" placeholder="搜索 菜谱" />
                        </div>
                    </div>
                    <i className="iconfont right icon-cailan"></i>
                </div>
                <Grid className="grid" data={data} hasLine={false} />
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { }}>热门兴趣·家常菜</Item>
                </List>
                <div className="banner">
                    <ul className="nav cl">
                        <li>
                            <img src="https://pic.ecook.cn/web/258718661.jpg!wl280" alt="" />
                            <p className="p1">猪皮炒大头菜</p>
                            <p className="p2">食尚煮易</p>
                        </li>
                        <li>
                            <img src="https://pic.ecook.cn/web/260012912.jpg!wl280" alt="" />
                            <p className="p1">西葫芦炒海米</p>
                            <p className="p2">爱吃兔儿</p>
                        </li>
                        <li>
                            <img src="https://pic.ecook.cn/web/258991105.jpg!wl280" alt="" />
                            <p className="p1">五花肉炒青椒</p>
                            <p className="p2">俏厨娘悠佳儿</p>
                        </li>
                        <li>
                            <img src="https://pic.ecook.cn/web/257732721.jpg!wl280" alt="" />
                            <p className="p1">孜然蘑菇</p>
                            <p className="p2">美食计划</p>
                        </li>
                    </ul>
                </div>
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { }}>热门兴趣·早餐</Item>
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
                                href=""
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    top: this.state.slideIndex === index ? -10 : 0,
                                    height: this.state.imgHeight,
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <img
                                    src={val.img}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
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
                    <Item extra="更多" arrow="horizontal" onClick={() => { }}>热门兴趣·面食</Item>
                </List>
                <div className="banner">
                    <ul className="nav cl">
                        <li>
                            <img src="https://pic.ecook.cn/web/258718661.jpg!wl280" alt="" />
                            <p className="p1">猪皮炒大头菜</p>
                            <p className="p2">食尚煮易</p>
                        </li>
                        <li>
                            <img src="https://pic.ecook.cn/web/260012912.jpg!wl280" alt="" />
                            <p className="p1">西葫芦炒海米</p>
                            <p className="p2">爱吃兔儿</p>
                        </li>
                        <li>
                            <img src="https://pic.ecook.cn/web/258991105.jpg!wl280" alt="" />
                            <p className="p1">五花肉炒青椒</p>
                            <p className="p2">俏厨娘悠佳儿</p>
                        </li>
                        <li>
                            <img src="https://pic.ecook.cn/web/257732721.jpg!wl280" alt="" />
                            <p className="p1">孜然蘑菇</p>
                            <p className="p2">美食计划</p>
                        </li>
                    </ul>
                </div>
                <List className="my-list">
                    <Item extra="更多" arrow="horizontal" onClick={() => { }}>菜谱推荐</Item>
                </List>
                <ul className="list cl">
                    {
                        this.props.food.map((item, index) => {
                            return (
                                <li key={index}>
                                    <img className="img" src={item.img} alt="" />
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