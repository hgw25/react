

import "./index.scss";
import Swipe from "@/scripts/components/swipe"

const Item = Swipe.item

export class Guide extends Component{
    state = {
        imgs:[
            require("@/assets/images/1.jpg"),
            require("@/assets/images/2.png"),
            require("@/assets/images/3.jpg"),
            require("@/assets/images/slide4.png"),
        ]
    }
    gotoApp(id){
        const {history} = this.props;
        if(id==this.state.imgs.length-1){
            history.push("/app/home")
        }
    }
    render(){
        return (
            <Swipe id="guide" options={{loop:false,pagination : '.swiper-pagination'}}>
                {
                    this.state.imgs.map((item,id)=>{
                        return (
                            <Item key={id}>
                                <img src={item} alt=""
                                className="g-img" onClick={()=>this.gotoApp(id)}/>
                            </Item>
                        )
                    })
                }
            </Swipe>
        )
    }
}