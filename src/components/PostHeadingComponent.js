import React, { Component } from 'react';
import './PostHeadingComponent.css'
import FaSmileO from 'react-icons/lib/fa/smile-o'
import FaClockO from 'react-icons/lib/fa/clock-o'
import FaCommentO from 'react-icons/lib/fa/comment-o'
// import { connect } from 'react-redux';
// import { deleteExistingPost } from '../actions' 

class PostHeadingComponent extends Component {
    render() {
        // console.log(this.props)
        const { post, parent} = this.props
        if (post) {
        const timeComponents = new Date(post.timestamp).toString().split(' ')

            return (
                <div className={"post" + (parent === 'post' ? ' no-border': '')} >
                    <span className="post-title">
                        {post.title}
                    </span>
                    <span className="post-author">
                        <FaSmileO /> {post.author}
                    </span>
                    <span className="post-time">
                        <FaClockO />
                        {` ${timeComponents[1]} ${timeComponents[2]} ${timeComponents[3]}`}
                    </span>
                    <span className="post-comments">
                        <FaCommentO />
                        {` ${post.commentCount} comments`}
                    </span>
                </div>
            )
        }
        else {
            return (<div>Loading . . . </div>)
        }
    }
}

export default PostHeadingComponent
