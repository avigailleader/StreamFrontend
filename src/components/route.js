import { BrowserRouter as Router, Route } from 'react-router-dom';

import StartVideo from './startVideo'
function Routes(props) {
    return (
        <div>
            <Router>
                <Route path="/:roomId" component={StartVideo} />
                <Route exact path="/" component={StartVideo} />
            </Router>
        </div>
    );
}

export default Routes;