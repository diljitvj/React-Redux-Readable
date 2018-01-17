import React, { Component } from 'react';
import PostHeadingComponent from './PostHeadingComponent'
import CommentComponent from './CommentComponent'
import { connect } from 'react-redux';
import { fetchPostData, addNewCommentForPost, voteOnPost, editExistingPost, deleteExistingPost } from '../actions'
import Modal from 'react-modal'
import HeaderComponent from './HeaderComponent'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import './PostComponent.css'

class PostComponent extends Component {
    state = {
        newCommentModalOpen: false,
        editPostModalOpen: false,
        selectedPostId: ''
    }
    componentDidMount() {
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
        const { selectedPostId } = this.state
        const category = this.props.posts[selectedPostId].category
        this.props.deletePost(selectedPostId)
        this.props.history.push(`/category/${category}`)
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
                    <div className="post-component-wrapper">
                    <PostHeadingComponent post={post} parent="post"/>
                    <button className="icon-button" onClick={() => this.votePost('downVote')}><FaThumbsODown size="20" /></button>
                    <span>{post.voteScore}</span>
                    <button className="icon-button" onClick={() => this.votePost('upVote')}><FaThumbsOUp size="20"/></button>
                    <button className="icon-button right" onClick={() => this.openEditPostModal()}><FaEdit size="20"/></button>
                    <button className="icon-button right" onClick={this.deletePost}><FaTrashO size="20"/></button>
                    <p>{post.body}</p>
                    <div className="add-new-wrapper">
                    <span>Comments </span>
                    <button className="add-new-button" onClick={this.openNewCommentModal}>+ New comment</button>
                    </div>
                    {
                        post.comments.map(
                            commentId => (
                                <CommentComponent key={commentId} comment={comments[commentId]} />
                            )
                        )}
                    </div>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={newCommentModalOpen}
                        onRequestClose={this.closeNewCommentModal}
                        contentLabel='Modal'
                    >
                        <div>
                            <h3>Add Comment</h3>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='comment body'
                                    ref={(input) => this.commentBody = input}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='comment author'
                                    ref={(input) => this.commentAuthor = input}
                                />
                                <button className="cancel" onClick={this.closeNewCommentModal}>Cancel</button>
                                <button className="proceed" onClick={this.addComment}>Add Comment</button>
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
                                <p>Title</p>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Post Title'
                                    defaultValue={post.title}
                                    ref={(input) => this.postTitle = input}
                                />
                                 <p>Body</p>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Post body'
                                    defaultValue={post.body}
                                    ref={(input) => this.postBody = input}
                                />
                                <button className="cancel" onClick={this.closeEditPostModal}>Cancel</button>
                                <button className="proceed" onClick={this.editPost}>Edit Post</button>
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