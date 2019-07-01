

import { Modal } from 'antd-mobile';
import history from "@/utils/history"
const alert = Modal.alert;
export class LikeBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: this.props.like * 1,
            liked: 'null',
        };
    }
    islike = () => {
        let username = localStorage.getItem("loginname")
        if (username) {
            let liked = this.state.liked;
            if (liked) {
                if (liked === 'like') {
                    this.setState({ liked: null })
                    this.setState({ like: this.state.like - 1 });
                }
                else {
                    this.setState({ liked: 'like' });
                    this.setState({ like: this.state.like + 1, });
                }
            }
            else {
                this.setState({
                    like: this.state.like + 1,
                });
                this.setState({ liked: 'like' });
            }
        } else {
            alert('未登录', '是否去登陆?', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                    text: '确定',
                    onPress: () =>
                        new Promise((resolve) => {
                            history.push('/login')
                            setTimeout(resolve, 500);
                        }),
                },
            ])
        }
    };
    render() {
        // console.log(this.props)
        console.log(this.state.like)
        return (
            <div onClick={this.islike} type='like' style={{ color: this.state.liked === 'like' ? 'orange' : '' }}>
                <i className="iconfont icon-dianzan"></i>
                <span>{this.state.liked === 'like' ? '取消点赞' : '点赞'}({this.state.like})</span>
            </div>
        );
    }
}

