import "./index.scss"
import { Item } from "../item";
import {PullToRefresh} from "antd-mobile";
import {connect} from "react-redux"
import { getReverseFood } from "../../actions";


@connect(
    state=>({
        ...state.searchList
    })
)
export class List extends Component{

    state = {
        refreshing:false,
        down:true,  // 下拉 
    }
    

    // componentDidMount(){
    //     const {type,allGoods} =this.props;
    //     if(allGoods){
    //         var data =  allGoods.filter(g=>g.type.value==type.value);
    //         console.log(data);
    //         this.setState({
    //             data
    //         })
    //     }
        
    // }

    render(){
        const {
            searchList,
        } = this.props;
        console.log("888888")
        console.log(this.props)
        return (
            <div>
                <ul>
                    <PullToRefresh
                        damping={50}
                        ref={() =>"loadmore"}
                        indicator={  { deactivate: '下拉刷新' }}
                        direction={  'down' }
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }); // 正在刷新
                            setTimeout(() => {
                                console.log(this.props);
                              this.props.dispatch(getReverseFood());

                            this.setState({ refreshing: false });  // 刷新结束 
                            }, 1000);
                          }}
                    >
                        {
                            searchList.map((food,i)=>{
                                return (
                                    <li key={i}>
                                        <Item food={food}/>
                                    </li>
                                )
                            })
                        }
                    </PullToRefresh>
                </ul>
            </div>
        )
    }
}