
import "./index.scss";
import { SearchBar, Button, WhiteSpace, WingBlank, Tabs } from 'antd-mobile';
import { searchList } from "../../actions";
import { connect } from "react-redux";
import { List } from "~/components/list";


@connect(
    state => ({
        ...state.searchList
    })
)
export class Search extends Component {
    state = {
        val: "搜菜谱",
        tabs: [
            { title: "搜菜谱" },
            { title: "搜厨友" }
        ],
        foods: [],
        flag:false
    }
    changeVal = (tab, index) => {
        this.setState({
            val: tab.title
        })
        console.log(tab)
    }
    getSearch = (val) => {
        const { dispatch } = this.props;
        if (this.state.val == "搜菜谱") {
            
            dispatch(searchList({
                url: "/react/searchList",
                params: {
                    keyword: this.word.state.value,
                },
                cb() { }
            }))
            // this.setState({
            //     flag:false
            // })
        } else {
            // this.setState({
            //     flag:true
            // })
            dispatch(searchList({
                url: "/react/searchListOne",
                params: {
                    keyword: this.word.state.value,
                },
                cb() { }
            }))
        }

    }
    render() {
        console.log("222")
        console.log(this.props)
        const { searchList } = this.props
        return (
            <div className="searchTop">
                <WingBlank size="sm">
                    <WhiteSpace />
                    <SearchBar
                        ref={el => this.word = el}
                        placeholder={this.state.val}
                        maxLength={8}
                        onClear={value => console.log(value, 'onClear')}
                        onFocus={() => console.log('onFocus')}
                        onBlur={this.getSearch}
                        onCancel={() => this.props.history.go(-1)}
                        showCancelButton
                        onChange={this.onChange}
                    />
                    <WhiteSpace />
                </WingBlank>
                {/* <Tabs tabs={this.state.tabs} tabBarActiveTextColor='orange' tabBarUnderlineStyle={{ border: '1.3px solid orange' }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2}
                />}
                    onChange={(tab, index) => { this.changeVal(tab, index) }}
                >
                    
                    <List 
                    searchList={searchList} 
                    >
                    </List>
                </Tabs> */}
                <Tabs tabs={this.state.tabs}
                    initialPage={0}
                    tabBarActiveTextColor='orange'
                    tabBarUnderlineStyle={{ border: '1.3px solid orange' }}
                    onChange={(tab, index) => { this.changeVal(tab, index) }}
                >
                    {
                        this.state.val == "搜菜谱" && <div style={{ backgroundColor: '#fff' }}>
                            <List
                                searchList={searchList}
                            >
                            </List>
                        </div>
                    }
                    {
                        <div style={{ backgroundColor: '#fff',display:this.state.val=='搜厨友'?'block':'none'}}>
                            <List
                                searchList={searchList}
                                style={{display:this.state.flag?'block':'none'}}
                            >
                            </List>
                        </div>
                    }
                </Tabs>
            </div>
        )
    }
}