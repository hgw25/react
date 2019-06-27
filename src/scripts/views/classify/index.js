import "./index.scss";
import { Head } from "~/components/head";
import { connect } from "react-redux";
import { getFoodType, getFoodList,saveItem } from "../../actions";
import { Tabs, WhiteSpace, List } from 'antd-mobile';



@connect(
    state => {
        return {
            ...state.food
        }
    }
)
export class Classify extends Component {
    goFoodDetails=(item)=>{
            const { dispatch } = this.props;
            dispatch(saveItem(item))
            console.log(item)
        this.props.history.push("/foodDetails")
    }
    renderContent = newTabs =>
        (console.log("99999"),
            console.log(this.props.foodList),
            <ul style={{ paddingBottom: "2rem", backgroundColor: '#fff' }}>
                {
                    this.props.foodList.filter((g) => g.type == newTabs.title).map((item, i) => {
                        return (
                            <li onClick={()=>this.goFoodDetails(item)} className="li cl" key={i}>
                                <img src={item.img} alt="" />
                                <div className="div">
                                    <h2 className="cl">{item.title}</h2>
                                    <p className="p1 sl">{item.pbm}</p>
                                    <p className="p2">{item.author}</p>
                                    <p className="p3">
                                        <span className="span1">{item.collectionNum}人收藏</span>
                                        <span className="span2">{item.commentNum}人点赞</span>
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>)
    goSearch = () => {
        this.props.history.push("/search")
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getFoodType({
            url: "/react/getFoodType",
            cb() { }
        }))
        dispatch(getFoodList({
            url: "/react/getFoodList",
            cb() { }
        }))
    }
    render() {
        console.log("2`2")
        console.log(this.props)
        const { tabs, foodList } = this.props;

        let newTabs = [];
        tabs.map((item, i) => {
            var obj = {};
            obj.title = item;
            newTabs.push(obj)

        })
        // let tabs = types.map((item)=>{
        //     item.title = item.text;
        //     return item;
        // })

        console.log(newTabs)
        console.log(foodList)
        return (
            <div>
                {/* <Head title="商品分类" show="true"></Head> */}
                <div className="topClassify">
                    <div onClick={this.goSearch} className="search">
                        <div className="head">
                            <i className="iconfont center icon-sousuo"></i>
                            <input className="input" type="text" placeholder="搜索 菜谱" />
                        </div>
                    </div>
                    <WhiteSpace />
                    <Tabs tabs={newTabs} tabBarActiveTextColor='orange' tabBarUnderlineStyle={{ borderColor: 'orange' }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
                        {this.renderContent}
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}
