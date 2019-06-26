
import "./index.scss";
import { NavBar, Icon,Card, WingBlank, WhiteSpace ,Button} from 'antd-mobile';
export class Details extends Component {
    goComment=()=>{
        this.props.history.push("/comment")
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                >食话</NavBar>
                <Button onClick={this.goComment}>添加评论</Button>
                <WingBlank size="sm">
                    <WhiteSpace size="sm" />
                    <Card>
                        <Card.Header
                            title="早餐三明治"
                            thumb="http://pic.ecook.cn/web/262886111.jpg!s4"
                            // extra={<span>this is extra</span>}
                            thumbStyle={{borderRadius:'0.2rem',height:'2rem',marginRight:'1rem'}}
                            style={{color:"red",lineHeight:0,fontSize:'0.5rem'}}
                        />
                        <Card.Body>
                            <div>春游踏青的时候做点饭团带上，方便又好吃。</div>
                        </Card.Body>
                        <Card.Footer content={<i className="iconfont icon-duihuakuang4"></i>} extra={<div>评论者: 妞妞妈美食</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}