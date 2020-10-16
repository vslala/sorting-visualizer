import {createStore} from 'redux'
import sortReducer from "./reducer";

const store = createStore(sortReducer);

export default store;