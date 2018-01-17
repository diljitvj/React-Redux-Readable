import React, { Component } from 'react';
import './PostHeadingComponent.css'
class PostHeadingComponent extends Component {
    render() {
        // console.log(this.props)
        const post = this.props.post
        if (post) {
            return (
                <div className="post">
                    <span className="post-body">
                        {post.title}
                    </span>
                    <span className="post-author">
                        {post.author}
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
