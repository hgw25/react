

import "./index.scss";
import { NavBar, Icon, ImagePicker, List, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from "react-redux";

const data = [{
    url: 'http://pic.ecook.cn/web/260253468.jpg!s4',
  }]
  
@connect(
    state => ({
        ...state.item
    })
)
class Comment1 extends Component {
    state = {
        files: data,
    }
    // onChange = (files, type, index) => {
    //     console.log(files, type, index);
    //     this.setState({
    //         files,
    //     });
    // };
    onAddImageClick = (e) => {
        e.preventDefault();
        this.props.history.push("/dish")
        this.setState({
            files: this.state.files.splice(0,1,{
                url: this.props.item.img,
              }),
        });
    };
    onTabChange = (key) => {
        console.log(key);
    };
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
                <div>
                    <ImagePicker
                        files={files}
                        // onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 5}
                        onAddImageClick={this.onAddImageClick}
                    />
                </div>
                <List renderHeader={() => '评论'}>
                    <TextareaItem
                        {...getFieldProps('count', {
                            initialValue: '',
                        })}
                        rows={5}
                        count={100}
                    />
                </List>
            </div>
        )
    }
}
export const Comment = createForm()(Comment1);