import {
	GET_CATEGORIES_SUCCESS,
	GET_POSTS_SUCCESS,
	GET_POSTS_FOR_CATEGORY_SUCCESS,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FOR_POST_SUCCESS,
	GET_POST_SUCCESS,
	GET_COMMENT_SUCCESS
	} from '../actions'

import { combineReducers } from 'redux'

let initialState = {}

function categories(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES_SUCCESS:
			let categories = {}
			action.categories.map(category => {
				categories[category.name] = { ...category }
			})
			return {
				...state,
				...categories
			}
		case GET_POSTS_FOR_CATEGORY_SUCCESS:
			let posts = []
			action.posts.map(post => {
				posts.push(post.id)
			})
			return {
				...state,
				[action.categoryId]: {
					posts: posts
				}
			}
		default:
			return state
	}
}
function posts(state = initialState, action) {
	// console.log(action)
	let posts, comments = []
	switch (action.type) {
		case GET_POSTS_SUCCESS:
		posts = {}
			action.posts.map(post => {
				posts[post.id] = { 
					...post,
					comments: [] 
				}
			})
			return {
				...state,
				...posts
			}
		case GET_COMMENTS_FOR_POST_SUCCESS:
		comments = []
			action.comments.map(comment => {
				comments.push(comment.id)
			})
			return {
				...state,
				[action.postId]: {
					...state[action.postId],					
					comments: comments
				}
			}
		case GET_POST_SUCCESS:
		let postId = action.post.id
		if(state[postId]){
			comments = state[postId].comments || []
		}
			return {
				...state,
				[postId]: {
					...action.post,
					comments: comments
					}
				}
		default:
			return state
	}
}

function comments(state = initialState, action){
	switch (action.type) {
		case GET_COMMENTS_SUCCESS:
		let comments = {}
			action.comments.map(comment => {
				comments[comment.id] = { ...comment }
			})
			return {
				...state,
				...comments
			}
		break
		case GET_COMMENT_SUCCESS:
		let commentId = action.comment.id
		return {
			...state,
			[commentId]:{
				...action.comment
			}
		}
		default:
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})