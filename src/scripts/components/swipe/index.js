import PropTypes from "prop-types";

export default class Swipe extends Component{
    render(){
        const {
            id,
            children
        } = this.props;
        return (
            <div className="swiper-container" id={id}>
                <div className="swiper-wrapper">
                    {
                        children&&children.map((child,index)=>{
                            return (child)
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
            
        )
    }
    componentDidMount(){
        let {id,options,children} = this.props;
        if(children.length>0){
            let mySwiper = new Swiper("#"+id,options);
        }
        
    }

    componentDidUpdate(){
        console.log("update ...." ) 
        let {id,options,children} = this.props;
        if(children.length>0){
            let mySwiper = new Swiper("#"+id,options);
        }
    }
}

Swipe.propTypes = {
    id:PropTypes.string.isRequired,
    options:PropTypes.object.isRequired
}

Swipe.item = (props)=>{
    return (
        <div className="swiper-slide">
            {props.children}
        </div>
    )
}