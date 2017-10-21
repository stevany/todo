import { combineReducers } from 'redux';

import {todoReducer} from './todoReducers'
import {userReducer} from './userReducers'

export default combineReducers({
	
	todo:todoReducer,
	user:userReducer,
	


});