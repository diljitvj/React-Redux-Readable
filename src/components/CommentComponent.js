import React, { Component } from 'react';
import './CommentComponent.css'
import { connect } from 'react-redux';
import { voteOnComment, editExistingComment, deleteExistingComment } from '../actions'
import Modal from 'react-modal'


class CommentComponent extends Component {
    state = {
        editCommentModalOpen: false
    }
    voteComment = (option) => {
        this.props.voteComment(this.props.comment.id, option)
    }

    openEditCommentModal = () => {
        this.setState({
            editCommentModalOpen: true
        })
    }
    closeEditCommentModal = () => {
        this.setState({
            editCommentModalOpen: false
        })
    }

    editComment = () => {
        const {commentBody} = this
        const payload = {
            body: commentBody.value
        }
        this.props.editComment(this.props.comment.id, payload)
        this.closeEditCommentModal()
    }

    deleteComment = ()=>{
        const commentId = this.props.comment.id
        const postId = this.props.comment.parentId
        this.props.deleteComment(commentId,postId)
    }
    render() {
        const { comment } = this.props
        const { editCommentModalOpen } = this.state
        if (comment) {
            return (
                <div className="post">
                    <span className="post-body">
                        {comment.body}
                    </span>
                    <span className="post-author">
                        {comment.author}
                    </span>
                    <span>{comment.voteScore}</span>
                    <button onClick={() => this.voteComment('upVote')}>Up Vote</button>
                    <button onClick={() => this.voteComment('downVote')}>Down Vote</button>
                    <button onClick={() => this.openEditCommentModal()}>Edit Comment</button>
                    <button onClick={() => this.deleteComment()}>Delete Comment</button>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={editCommentModalOpen}
                        onRequestClose={this.closeEditCommentModal}
                        contentLabel='Modal'
                    >
                        <div>
                            <h1>Add Comment
                                <button onClick={this.closeEditCommentModal}>X</button>
                                <input
                                    className='comment-body'
                                    type='text'
                                    placeholder='comment body'
                                    defaultValue={comment.body}
                                    ref={(input) => this.commentBody = input}
                                />
                                <input
                                    className='comment-author'
                                    type='text'
                                    placeholder='comment author'
                                    disabled
                                    value={comment.author}
                                />
                                <button onClick={this.editComment}>Edit Comment</button>
                            </h1>
                        </div>
                    </Modal>
                </div>
            )
        }
        else {
            return (<div>Loading . . . </div>)
        }
    }
}

function mapStateToProps({ comments }) {
    return { comments };
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteComment: (commentId, option) => dispatch(voteOnComment(commentId, option)),
        editComment: (commentId, commentDetails) => dispatch(editExistingComment(commentId, commentDetails)),
        deleteComment: (commentId,postId) => dispatch(deleteExistingComment(commentId,postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);