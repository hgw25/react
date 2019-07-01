import "./index.scss"
import { NavBar, Icon, ImagePicker, WingBlank, SegmentedControl, List, InputItem, WhiteSpace, Picker, PickerView,Toast} from 'antd-mobile';


const data = [];
const sex = [
    [{
        label: "女",
        value: "女"
    },
    {
        label: "男",
        value: "男"
    }]
]
export class Material extends Component {

    state = {
        files: data,
        sValue: ["女"]
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    save = () => {
        Toast.info("保存成功",0.3)
        this.props.history.push("/app/my")
    }
    render() {
        const { files } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={
                        <div onClick={this.save}>保存</div>
                    }
                >个人资料</NavBar>
                <div>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 5}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                    />
                </div>
                <WhiteSpace />

                <List renderHeader={() => '个人信息'}>
                    <InputItem
                        placeholder="输入昵称"
                        ref={el => this.nickName = el}
                    ><div>昵称</div></InputItem>
                </List>
                <Picker
                    data={sex}
                    title="选择性别"
                    cascade={false}
                    extra="请选择"
                    value={this.state.sValue}
                    onChange={v => this.setState({ sValue: v })}
                    onOk={v => this.setState({ sValue: v })}
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <InputItem
                    placeholder="输入城市名"
                    ref={el => this.city = el}
                ><div>城市</div></InputItem>
                <InputItem
                    placeholder="请输入专长"
                    ref={el => this.expertise = el}
                ><div>厨艺专长</div></InputItem>
                <div style={{ backgroundColor: '#fff', padding: "15px" }}>
                    <p style={{ fontSize: '0.35rem', color: "#000", marginBottom: "0.2rem" }}>简介</p>
                    <textarea cols="30" rows="10" placeholder="请添加您的个人简历"
                        style={{ width: "94%", backgroundColor: '#eee', borderRadius: '0.2rem', border: "none", padding: '3%', fontSize: "0.3rem" }}
                        ref={el=>this.brief=el}
                    ></textarea>
                </div>
            </div>
        )
    }
}