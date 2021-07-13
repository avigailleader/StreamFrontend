import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header/header'
import Stream from '../stream/stream'
import NotExist from '../notExist/notExist.js'

import { createBrowserHistory } from "history";
import AfterVideo from '../video/afterVideo/afterVideo'
const history = createBrowserHistory();

function Routes(props) {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route exact path="admin/:userName" component={Stream} history={history} />
                    <Route exact path="/notExist" component={NotExist} history={history} />
                    <Route path="/AfterVideo" component={AfterVideo} history={history} />
                    <Route path="/:userName" component={Stream} history={history} />
                    <Route path="/admin" component={Header} history={history} />
                </Switch>
            </Router>
        </div>
    );
}

export default Routes;