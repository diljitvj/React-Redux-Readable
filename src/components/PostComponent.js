import React, { Component } from 'react';
import PostHeadingComponent from './PostHeadingComponent'
import CommentComponent from './CommentComponent'
import { connect } from 'react-redux';
import { fetchPostData, addNewCommentForPost, voteOnPost, editExistingPost, deleteExistingPost } from '../actions'
import Modal from 'react-modal'
import HeaderComponent from './HeaderComponent'

class PostComponent extends Component {
    state = {
        newCommentModalOpen: false,
        editPostModalOpen: false,
        selectedPostId: ''
    }
    componentDidMount() {
        // console.log(this.props.history.push('/category/react'))
        const postId = this.props.match.params.id
        this.setState({
            selectedPostId: postId,
            errormsg: ''
        })
        this.props.fetchPostData(postId)
    }

    openNewCommentModal = () => {
        this.setState({
            newCommentModalOpen: true,
            errormsg: ''
        })
    }
    closeNewCommentModal = () => {
        this.setState({
            newCommentModalOpen: false,
            errormsg: ''
        })
    }

    openEditPostModal = () => {
        this.setState({
            editPostModalOpen: true,
            errormsg: ''
        })
    }

    closeEditPostModal = () => {
        this.setState({
            editPostModalOpen: false,
            errormsg: ''
        })
    }
    votePost = (option) => {
        const { selectedPostId } = this.state
        this.props.votePost(selectedPostId, option)
    }

    addComment = () => {
        const { commentBody, commentAuthor } = this
        if(commentBody.value === '' || commentAuthor === ''){
            this.setState({
                errormsg: "Please fill all fields"
            })
            return false
        }
        const now = Date.now()
        const payload = {
            body: commentBody.value,
            author: commentAuthor.value,
            timestamp: now,
            id: now,
            parentId: this.state.selectedPostId
        }
        this.props.addNewComment(payload)
        this.closeNewCommentModal()
    }

    editPost = () => {
        const { postBody, postTitle } = this
        if(postBody.value === '' || postTitle === ''){
            this.setState({
                errormsg: "Please fill all fields"
            })
            return false
        }

        const { selectedPostId } = this.state
        const payload = {
            title: postTitle.value,
            body: postBody.value
        }
        this.props.editPost(selectedPostId, payload)
        this.closeEditPostModal()
    }
    deletePost = () => {
        this.props.deletePost(this.state.selectedPostId)
        this.props.history.push('/category/react')
    }
    render() {
        const { posts, comments } = this.props
        const { newCommentModalOpen, editPostModalOpen, errormsg } = this.state
        const postId = this.props.match.params.id
        const post = posts[postId]
        if (post) {
            return (
                <div>
                    <HeaderComponent showBackButton={true} path={`/category/${post.category}`} />
                    <PostHeadingComponent post={post} />
                    <button onClick={() => this.votePost('upVote')}>Up Vote</button>
                    <button onClick={() => this.votePost('downVote')}>Down Vote</button>
                    <button onClick={() => this.openEditPostModal()}>Edit Post</button>
                    <button onClick={this.openNewCommentModal}>Add new comment</button>
                    <button onClick={this.deletePost}>Delete Post</button>
                    <p>{post.body}</p>
                    <span>{post.voteScore}</span>
                    {
                        post.comments.map(
                            commentId => (
                                <CommentComponent key={commentId} comment={comments[commentId]} />
                            )
                        )}
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={newCommentModalOpen}
                        onRequestClose={this.closeNewCommentModal}
                        contentLabel='Modal'
                    >
                        <div>
                            <h3>Add Comment</h3>
                                <button onClick={this.closeNewCommentModal}>X</button>
                                <input
                                    className='comment-body'
                                    type='text'
                                    placeholder='comment body'
                                    ref={(input) => this.commentBody = input}
                                />
                                <input
                                    className='comment-author'
                                    type='text'
                                    placeholder='comment author'
                                    ref={(input) => this.commentAuthor = input}
                                />
                                <button onClick={this.addComment}>Add Comment</button>
                                <span>{errormsg}</span>
                        </div>
                    </Modal>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={editPostModalOpen}
                        onRequestClose={this.closeEditPostModal}
                        contentLabel='Modal'
                    >
                        <div>
                            <h3>Edit Post</h3>
                                <button onClick={this.closeEditPostModal}>X</button>
                                <input
                                    className='post-title'
                                    type='text'
                                    placeholder='Post Title'
                                    defaultValue={post.title}
                                    ref={(input) => this.postTitle = input}
                                />
                                <input
                                    className='post-body'
                                    type='text'
                                    placeholder='Post body'
                                    defaultValue={post.body}
                                    ref={(input) => this.postBody = input}
                                />
                                <input
                                    className='post-author'
                                    type='text'
                                    placeholder='Post author'
                                    value={post.author}
                                    disabled
                                />
                                <button onClick={this.editPost}>Edit Post</button>
                                <span>{errormsg}</span>
                        </div>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Post Component</h1>
                </div>
            )
        }
    }
}


function mapStateToProps({ posts, comments }) {
    return { posts, comments };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostData: (postId) => dispatch(fetchPostData(postId)),
        addNewComment: (comment) => dispatch(addNewCommentForPost(comment)),
        votePost: (postId, option) => dispatch(voteOnPost(postId, option)),
        editPost: (postId, postDetails) => dispatch(editExistingPost(postId, postDetails)),
        deletePost: (postId) => dispatch(deleteExistingPost(postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);
// export default PostComponent