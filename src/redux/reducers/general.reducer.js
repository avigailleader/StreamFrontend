import produce from 'immer';

import createReducer from './reducerUtils';

const initialState = {
    // serverURL: 'https://meet.dev.leader.codes/api',
    countParticipantInConversion: 0,

}

const generalData = {
    setCountParticipantInConversion(state, action) {
        state.countParticipantInConversion = action.payload;
    },
}

export default produce((state, action) => createReducer(state, action, generalData), initialState);