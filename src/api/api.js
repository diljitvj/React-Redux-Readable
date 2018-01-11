const header = { 'Authorization': 'whatever-you-want' }
const baseUrl = 'http://localhost:3001/'

export function getAllCategories() {
    return fetch(`${baseUrl}categories`, { headers: header })
        .then(res => res.json())
}

export function getPostsForCategory(categoryId) {
    return fetch(`${baseUrl}${categoryId}/posts`, { headers: header })
        .then(res => res.json())
}

export function getAllPosts() {
    return fetch(`${baseUrl}posts`, { headers: header })
        .then(res => res.json())
}

export function addNewPost(post) {
    return fetch(`${baseUrl}posts`, { method: 'POST', body: post, headers: header })
        .then(res => res.json())
}

export function getPostById(postId) {
    return fetch(`${baseUrl}posts/${postId}`, { headers: header })
        .then(res => res.json())
}

export function votePost(postId, voteOption) {
    const vote = {
        option: voteOption
    }
    return fetch(`${baseUrl}posts/${postId}`, { method: 'POST', body: vote, headers: header })
        .then(res => res.json())
}

export function editPost(postId, payload) {
    return fetch(`${baseUrl}posts/${postId}`,{ method: 'PUT', body: payload, headers: header})
        .then(res => res.json())
}

export function deletePost(postId){
    return fetch(`${baseUrl}posts/${postId}`, {method: 'DELETE', headers: header})
        .then(res => res.json())
}

export function getCommentsForPost(postId){
    return fetch(`${baseUrl}posts/${postId}/comments`)
        .then(res => res.json())
}

export function addCommentToPost(comment){
    fetch(`${baseUrl}comments`, { method: 'POST', body: comment, headers: header})
        .then(res => res.json())
}

export function getCommentById(commentId){
    fetch(`${baseUrl}comments/${commentId}`, {headers: header})
        .then(res => res.json())
}

export function voteComment(commentId, voteOption){
    const vote = {
        option: voteOption
    }
    return fetch(`${baseUrl}comments/${commentId}`, { method: 'POST', body: vote, headers: header})
        .then(res => res.json())
}

export function editComment(commentId, payload){
    return fetch(`${baseUrl}comments/${commentId}`, { method: 'PUT', body: payload, headers: header})
        .then(res => res.json())
}

export function deleteComment(commentId){
    return fetch(`${baseUrl}comments/${commentId}`, { method: 'DELETE', headers: header})
        .then(res => res.json())
}

