import React, { Component } from 'react';
import './CommentComponent.css'
import { connect } from 'react-redux';
import { voteOnComment } from '../actions'

class CommentComponent extends Component {
    voteComment = (option) => {
        this.props.voteComment(this.props.comment.id, option)
    }
    render() {
        const { comment } = this.props
        if (comment) {
            return (
                <div className="post">
                    <span className="post-body">
                        {comment.body}
                    </span>
                    <span className="post-author">
                        {comment.author}
                    </span>
                    <b>{comment.voteScore}</b>
                    <button onClick={() => this.voteComment('upVote')}>Up Vote</button>
                    <button onClick={() => this.voteComment('downVote')}>Down Vote</button>
                    <button onClick={() => this.openEditCommentModal()}>Edit Post</button>
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
        // editComment: (commentId, CommentDetails) => dispatch(editExistingComment(CommentId, CommentDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);