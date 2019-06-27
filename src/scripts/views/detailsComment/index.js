import "./index.scss"
import { NavBar, Icon,Button } from 'antd-mobile';
import { StarMarking } from "@/scripts/components/setStar"
import { connect } from "react-redux";
import axios from "@/utils/axios"

@connect(
    state => ({
        ...state.item,
    })
)
export class DetailsComment extends Component {
    state={
        score:""
    }
    changeMarkingScores=(item)=>{
        this.setState({
            score:item.score
        })
    }
    foodDetails=()=>{
        var commentInfo={};
        commentInfo=this.props.item;
        commentInfo.content=this.refs.word.value;
        commentInfo.score=this.state.score;
        commentInfo.username=localStorage.getItem("loginname");
        console.log(commentInfo)
        console.log(this.refs.word.value)
        axios.post("/react/addCommentInfo",{commentInfo}).then(res=>{
        })
        this.props.history.push("/foodDetails")
    }
    render() {
        const { item } = this.props
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push('/foodDetails')}
                    style={{ position: 'fixed', left: 0, top: 0, width: "100%" }}
                >添加评论</NavBar>
                <div style={{ paddingBottom: '1rem' }}></div>
                <div className="cl" style={{ padding: "0.1rem 0.2rem", backgroundColor: '#fff' }}>
                    <div className="cl">
                        <img style={{ borderRadius: "0.2rem", width: "2rem", float: "left", marginRight: '0.3rem' }} src="http://pic.ecook.cn/web/262871043.jpg!s4" alt="" />
                        <div style={{ fontSize: "0.3rem", color: '#000', fontWeight: '550', padding: "0.2rem 0.2rem 0.4rem" }}>
                            <span style={{ marginLeft: '0.1rem' }}>美味level评价</span>
                        </div>
                        <StarMarking style={{ marginLeft: '0.3rem' }} changeMarkingScores={(item) => {this.changeMarkingScores(item)}}></StarMarking>
                    </div>
                    <div style={{marginTop:'0.2rem',borderTop:'1px solid #eee'}}>
                        <div style={{ backgroundColor: '#fff',marginBottom:'0.2rem'}}>
                            <p style={{ fontSize: '0.3rem', color: '#000', fontWeight: '550', margin: '0.2rem 0' }}>评价内容</p>
                            <textarea ref="word" cols="30" rows="10" style={{ width: "96%", padding: '2%', fontSize: '0.3rem', color: '#000', borderRadius: '0.2rem' }}>  
                            </textarea>
                        </div>
                        <Button onClick={this.foodDetails} type="ghost" size="small" style={{ marginRight: '4px' ,float:'right'}}>提交评论</Button>
                    </div>
                </div>
            </div>
        )
    }
}