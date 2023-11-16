import { combineReducers } from 'redux';
import roomReducer from './room_reducers';

const rootReducer = combineReducers({
    cart: roomReducer
})

export default rootReducer