export const GET_CATEGORIES_SUCCESS="GET_CATEGORIES_SUCCESS"
export const GET_POSTS_SUCCESS="GET_POSTS_SUCCESS"

export function categoriesFetchSuccess({categories}){
	return {
		type: GET_CATEGORIES_SUCCESS,
		categories
	}
}

export function postsFetchSuccess(posts){
	return{
		type: GET_POSTS_SUCCESS,
		posts
	}
}