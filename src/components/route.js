import { BrowserRouter as Router, Route } from 'react-router-dom';

import StartVideo from './startVideo'
import Viewers from './viewers';
import Wrap from './wrap';
import Admin from './chat/admin/adminChat'
import User from './chat/user/userChat'
function Routes(props) {
    return (
        <div>
            <Router>
                <Route path="/:roomId" component={Viewers} />
                <Route path="/admin/:userName" component={Admin} />
                <Route exact path="/:userName" component={User} />
                <Route exact path="/" component={Wrap} />
                <Route exact path="/" component={StartVideo} />
            </Router>
        </div>
    );
}

export default Routes;