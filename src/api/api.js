const header = { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*', }
const baseUrl = 'http://localhost:3001/'

export function getAllCategories() {
    // debugger;
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
    return fetch(`${baseUrl}posts`, { method: 'post', body: JSON.stringify(post), headers: header })
        .then(res => {
            // console.log(res.json())
            return res.json()
        })
}

export function getPostById(postId) {
    return fetch(`${baseUrl}posts/${postId}`, { headers: header })
        .then(res => res.json())
}

export function votePost(postId, voteOption) {
    const vote = {
        option: voteOption
    }
    return fetch(`${baseUrl}posts/${postId}`, { method: 'post', body: JSON.stringify(vote), headers: header })
        .then(res => res.json())
}

export function editPost(postId, payload) {
    return fetch(`${baseUrl}posts/${postId}`,{ method: 'put', body: JSON.stringify(payload), headers: header})
        .then(res => res.json())
}

export function deletePost(postId){
    return fetch(`${baseUrl}posts/${postId}`, {method: 'delete', headers: header})
        .then(res => res.json())
}

export function getCommentsForPost(postId){
    return fetch(`${baseUrl}posts/${postId}/comments`, {headers: header})
        .then(res => res.json())
}

export function addCommentForPost(comment){
    return fetch(
        `${baseUrl}comments`, 
        { 
            method: 'post', 
            body: JSON.stringify(comment), 
            headers: header
        }).then(res => res.json())
}

export function getCommentById(commentId){
    fetch(`${baseUrl}comments/${commentId}`, {headers: header})
        .then(res => res.json())
}

export function voteComment(commentId, voteOption){
    const vote = {
        option: voteOption
    }
    return fetch(`${baseUrl}comments/${commentId}`, { method: 'post', body: JSON.stringify(vote), headers: header})
        .then(res => res.json())
}

export function editComment(commentId, payload){
    return fetch(`${baseUrl}comments/${commentId}`, { method: 'put', body: JSON.stringify(payload), headers: header})
        .then(res => res.json())
}

export function deleteComment(commentId){
    return fetch(`${baseUrl}comments/${commentId}`, { method: 'delete', headers: header})
        .then(res => res.json())
}

