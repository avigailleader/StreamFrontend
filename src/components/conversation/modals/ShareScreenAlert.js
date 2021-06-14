import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './modals.css';

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => ({

});

function ShareScreenAlert(props) {

    const { visibleShareScreenAlert, setVisibleShareScreenAlert, setVisibleShareScreenAlertPop } = props;

    return (
        <div className="container">
            <div className="row">
                <div class="alert shareScreenAlert d-flex col-7 offset-2 col-sm-7 col-md-6 col-lg-4 offset-lg-4" role="alert">
                    <p className="shareMassage">Your screen is shared!</p>
                    <p className="hideP ml-4" onClick={x => { setVisibleShareScreenAlert(false); setVisibleShareScreenAlertPop(true) }}>hide</p>
                    <p className="stopP ml-2" onClick={x => { setVisibleShareScreenAlert(false) }}>stop</p>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShareScreenAlert));