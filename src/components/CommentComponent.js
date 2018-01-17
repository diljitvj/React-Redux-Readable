import React, { Component } from 'react';
import './CommentComponent.css'
import { connect } from 'react-redux';
import { voteOnComment, editExistingComment, deleteExistingComment } from '../actions'
import Modal from 'react-modal'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTrashO from 'react-icons/lib/fa/trash-o'

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
                <div className="comment">
                    <p className="post-body">
                        {comment.body}
                    </p>
                    <p className="post-author">
                        {comment.author}
                    </p>
                    <button className="icon-button" onClick={() => this.voteComment('downVote')}><FaThumbsODown size="20" /></button>
                    <span>{comment.voteScore}</span>
                    <button className="icon-button" onClick={() => this.voteComment('upVote')}><FaThumbsOUp size="20" /></button>
                    <button className="icon-button right" onClick={() => this.openEditCommentModal()}><FaEdit size="20" /></button>
                    <button className="icon-button right" onClick={() => this.deleteComment()}><FaTrashO size="20" /></button>
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