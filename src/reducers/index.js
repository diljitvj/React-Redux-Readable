import {
	GET_CATEGORIES_SUCCESS,
	GET_POSTS_SUCCESS
} from '../actions'

import { combineReducers } from 'redux'

function categories(state = [], action) {
	switch(action.type){
		case GET_CATEGORIES_SUCCESS:
			return {
				state
			}
		default:
			return state
	}
}
function posts(state = [], action) {
	switch(action.type){
		case GET_POSTS_SUCCESS:
			return {
				state
				}
		default:
			return state
	}
}
function comments(state = [], action) {
	switch(action.type){
		default:
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})