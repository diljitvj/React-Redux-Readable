import {
	getAllCategories,
	getAllPosts,
	getPostsForCategory,
	getCommentsForPost,
	getPostById,
	addNewPost,
	addCommentForPost,
	votePost,
	editPost,
	voteComment,
	editComment,
	deleteComment,
    deletePost
} from '../api/api'
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS"
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"
export const GET_POSTS_FOR_CATEGORY_SUCCESS = "GET_POSTS_FOR_CATEGORY_SUCCESS"
export const CATEGORIES_LOADING = "CATEGORIES_LOADING"
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS"
export const GET_COMMENTS_FOR_POST_SUCCESS = "GET_COMMENTS_FOR_POST_SUCCESS"
export const GET_POST_SUCCESS = "GET_POST_SUCCESS"
export const GET_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS"
export const POSTS_LOADING = "POSTS_LOADING"
export function categoriesFetchSuccess({ categories }) {
	return {
		type: GET_CATEGORIES_SUCCESS,
		categories
	}
}

export function categoriesLoading(bool){
	return {
		type: CATEGORIES_LOADING,
		bool
	}
}

export function postsLoading(bool){
	return {
		type: POSTS_LOADING,
		bool
	}
}
export function postsFetchSuccess(posts) {
	return {
		type: GET_POSTS_SUCCESS,
		posts
	}
}

export function postsForCategoryFetchSuccess({ posts, categoryId }) {
	return {
		type: GET_POSTS_FOR_CATEGORY_SUCCESS,
		posts,
		categoryId
	}
}

export function commentsForPostFetchSuccess({ comments, postId }) {
	return {
		type: GET_COMMENTS_FOR_POST_SUCCESS,
		comments,
		postId
	}
}

export function commentsFetchSucess(comments) {
	return {
		type: GET_COMMENTS_SUCCESS,
		comments
	}
}

export function postFetchSuccess(post) {
	return {
		type: GET_POST_SUCCESS,
		post
	}
}

export function commentFetchSuccess(comment) {
	return {
		type: GET_COMMENT_SUCCESS,
		comment
	}
}
export function fetchCategories() {
	return (dispatch) => {
		dispatch(categoriesLoading(true))
		getAllCategories()
			.then((items) => dispatch(categoriesFetchSuccess(items)))
			.then(response => dispatch(fetchPosts()))
			.then(response => dispatch(categoriesLoading(false)))
	};
}

export function fetchPosts() {
	return (dispatch) => {
		dispatch(postsLoading(true))
		getAllPosts()
			.then((items) => dispatch(postsFetchSuccess(items)))
	}
}

export function fetchPostsForCategory(categoryId) {
	return (dispatch) => {
		dispatch(postsLoading(true))
		getPostsForCategory(categoryId)
			.then(posts => dispatch(postsForCategoryFetchSuccess({ posts, categoryId })))
			.then(({ posts }) => dispatch(postsFetchSuccess(posts)))
			.then(response => dispatch(postsLoading(false)))
	}
}

export function fetchCommentsForPost(postId) {
	return (dispatch) => {
		getCommentsForPost(postId)
			.then(comments => dispatch(commentsForPostFetchSuccess({ comments, postId })))
			.then(({ comments }) => dispatch(commentsFetchSucess(comments)))
	}
}

export function fetchPostData(postId) {
	return (dispatch) => {
		getPostById(postId)
			.then((post) => dispatch(postFetchSuccess(post)))
			.then(
			getCommentsForPost(postId)
				.then(comments => dispatch(commentsForPostFetchSuccess({ comments, postId })))
				.then(({ comments }) => dispatch(commentsFetchSucess(comments)))
			)
	}
}

export function addNewPostForCategory(post) {
	return (dispatch) => {
		addNewPost(post)
			.then(post => dispatch(fetchPostsForCategory(post.category)))
	}
}

export function addNewCommentForPost(comment) {
	return (dispatch) => {
		addCommentForPost(comment)
			.then(response => dispatch(fetchCommentsForPost(response.parentId)))
	}
}

export function voteOnPost(postId, option) {
	return (dispatch) => {
		votePost(postId, option)
			.then(post => dispatch(postFetchSuccess(post)))
	}
}

export function editExistingPost(postId, postDetails) {
	return (dispatch) => {
		editPost(postId, postDetails)
			.then(post => dispatch(postFetchSuccess(post)))
	}
}

export function voteOnComment(commentId, option) {
	return (dispatch) => {
		voteComment(commentId, option)
			.then(comment => dispatch(commentFetchSuccess(comment)))
	}
}

export function editExistingComment(commentId, commentDetails){
	return (dispatch) => {
		editComment(commentId, commentDetails)
			.then(comment => dispatch(commentFetchSuccess(comment)))
	}
}

export function deleteExistingComment(commentId, postId){
	return (dispatch) => {
		deleteComment(commentId)
			.then(response => dispatch(fetchCommentsForPost(postId)))
	}
}

export function deleteExistingPost(postId){
	return (dispatch) => {
		deletePost(postId)
			.then(post => dispatch(fetchPostsForCategory(post.category)))
	}
}