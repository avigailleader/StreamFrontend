import { BrowserRouter as Router, Route } from 'react-router-dom';

import Stream from './stream'
// import Viewers from './viewers';
function Routes(props) {
    return (
        <div>
            <Router>
                <Route path="/:roomId" component={Stream} />
                <Route exact path component={Stream} />
            </Router>
        </div>
    );
}

export default Routes;