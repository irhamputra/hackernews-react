import React, {Component} from 'react';
import { Switch, Route} from "react-router";
import '../styles/App.css';
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import Login from './Login';

class App extends Component {
    render() {
        return (
            <div className="center w85">
                <Header/>
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={LinkList}/>
                        <Route exact path="/create" component={CreateLink}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
