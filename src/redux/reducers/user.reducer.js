import produce from 'immer';
import createReducer from './reducerUtils';

const initialState = {
    userName: ''

}
const userData = {
    setUserName(state, action) {
        state.userName = action.payload;
    }
}



export default produce((state, action) => createReducer(state, action, userData), initialState);