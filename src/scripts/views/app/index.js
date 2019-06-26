
import {Route,Switch,Redirect} from "react-router-dom"
import { Home } from "../home";
import { Classify } from "../classify";
import { Details } from "../details";
import { My } from "../my";
// import {Foot} from "@/scripts/components/foot"
import {MFoot} from "@/scripts/components/mFoot"

export class App extends Component{
    render (){
        return (
            <div>
                <Switch>
                    <Route path="/app/home" component={Home}/>
                    <Route path="/app/classify" component={Classify}/>
                    <Route path="/app/details" component={Details}/>
                    <Route path="/app/my" component={My}/>
                    <Route render={()=>(<Redirect to="/app/home"/>)}/>
                </Switch>
                {/* <Foot></Foot> */}
                <MFoot/>
            </div>
        )
    }
}