
const staricongrey = require('@/assets/images/xx0.png');
const stariconblue = require('@/assets/images/xx1.png');

export class Star extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.name)
        this.state = {
            //接到页面传过来的值    
            //因为当前页面显示五颗星，而分数是十分所以要去平均值，
            num: this.props.name / 2,
            //根据页面当中的星星的数量来设置默认值
            arr: [1, 2, 3, 4, 5]
        }
    }
    render() {
        return (

            <span style={{ marginTop: 20 }}>
                {
                    this.state.arr.map((ele, index) => {
                        return (
                            <span key={index} >
                                {ele > this.state.num ? <img src={staricongrey} alt="" style={{ width: 14, float: "left", paddingLeft: 1 }} /> : <img src={stariconblue} alt="" style={{ width: 14, float: "left" , paddingLeft: 1}} />}
                            </span>
                        )
                    })
                }
            </span>
        )
    }
}
