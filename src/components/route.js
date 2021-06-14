import { BrowserRouter as Router, Route } from 'react-router-dom';

import StartVideo from './stream'
import Viewers from './viewers';
function Routes(props) {
    return (
        <div>
            <Router>
                <Route path="/:roomId" component={Viewers} />
                <Route exact path component={StartVideo} />
            </Router>
        </div>
    );
}

export default Routes;