

import "./index.scss";
import { NavBar, Icon, ImagePicker, List, TextareaItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from "react-redux";
import axios from "@/utils/axios"
// import {addInfo} from "../../actions"
const data = [{
    url: 'http://pic.ecook.cn/web/260253468.jpg!s4',
}]
@connect(
    state => ({
        ...state.item,
    })
)
class Comment1 extends Component {
    
    state = {
        files: data,
    }
    
    onAddImageClick = (e) => {
        e.preventDefault();
        this.props.history.push("/dish")
        this.setState({
            files: this.state.files.splice(0, 1, {
                url: this.props.item.img,
            }),
        });
    };
    onTabChange = (key) => {
        console.log(key);
    };
    goDish = () => {
        this.props.history.push("/dish")
    }
    goDetails=()=>{
        var allInfo={};
        allInfo=this.props.item;
        allInfo.content=this.refs.word.state.value;
        console.log(allInfo)
        console.log(this.refs.word.state.value)
        axios.post("/react/addInfo",{allInfo}).then(res=>{

        })
        
        this.props.history.push("/app/details")
    }
    render() {
        const { getFieldProps } = this.props.form;
        console.log(this.props)
        const { files } = this.state;
        console.log(this.props.item)
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/app/details")}
                >点评</NavBar>
                <div className="cl" style={{ padding: '0 0.1rem',margin:'0.1rem 0',backgroundColor:"#fff"}}>
                    <img src={this.props.item.img} style={{ width: '2rem', float: 'left', borderRadius: '0.2rem', marginRight: '0.1rem' }} alt="" />
                    <i className="iconfont icon-addTodo-nav" onClick={this.goDish} style={{ fontSize: '1.8rem', color: '#aaa', border: '2px solid #aaa', borderRadius: '0.2rem' }}></i>
                </div>
                <List renderHeader={() => '点评'}>
                    <TextareaItem
                        {...getFieldProps('count', {
                            initialValue: '',
                        })}
                        rows={5}
                        count={100}
                        ref="word"
                    />
                </List>
                <WhiteSpace />
                <Button onClick={this.goDetails} type="ghost" inline size="small" style={{ marginRight: '4px' ,float:'right'}}>提交</Button>
            </div>
        )
    }
}
export const Comment = createForm()(Comment1);