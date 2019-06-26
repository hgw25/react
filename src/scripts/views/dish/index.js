import "./index.scss"
import { WingBlank, WhiteSpace, SearchBar } from 'antd-mobile';
import { searchList ,saveItem} from "../../actions"
import { connect } from "react-redux";
@connect(
    state => ({
        ...state.searchList
    })
)
export class Dish extends Component {
    // state = {}
    getSearch = (val) => {
        const { dispatch } = this.props;

        dispatch(searchList({
            url: "/react/searchList",
            params: {
                keyword: this.word.state.value,
            },
            cb() { }
        }))
    }
    goComment=(item)=>{
        const { dispatch } = this.props;
        dispatch(saveItem(item))
        this.props.history.push("/comment")
    }
    componentWillMount() {
        const { dispatch } = this.props;

        dispatch(searchList({
            url: "/react/searchList",
            cb() { }
        }))
    }
    render() {
        const { searchList } = this.props
        return (
            <div className="dish">
                <WingBlank size="sm">
                    <WhiteSpace />
                    <SearchBar
                        ref={el => this.word = el}
                        placeholder="搜 点评的菜名"
                        maxLength={8}
                        onClear={value => console.log(value, 'onClear')}
                        onFocus={() => console.log('onFocus')}
                        onBlur={this.getSearch}
                        onCancel={() => this.props.history.push("/comment")}
                        showCancelButton
                        onChange={this.onChange}
                    />
                    <WhiteSpace />
                </WingBlank>
                {/* <WingBlank> */}
                    <ul className="cl">
                        {
                            searchList.map((item, index) => {
                                return (
                                    <li  onClick={()=>{this.goComment(item)}} className="lili" key={index}>
                                        <img src={item.img} alt="" />
                                        <p className="sl">{item.title}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                {/* </WingBlank> */}
            </div>
        )
    }
}