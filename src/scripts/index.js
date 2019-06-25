


import ReactDOM, {render} from "react-dom";  //  ReactDOM.render
import { IndexView } from "./views";


const rootEle = document.getElementById("app");

// const hotRender = ()=>{
//     render(
//         <IndexView/>,
//         rootEle
//     )
// }

// hotRender();
import {Provider} from  "react-redux"
import store from "./store"
const hotRender = ()=>{
    render(
        <Provider store={store} >
            <IndexView/>
        </Provider> ,
        rootEle
    )
}


hotRender();

// ReactDOM.render(<IndexView/>,rootEle)
