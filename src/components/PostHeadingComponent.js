import React, { Component } from 'react';
import './PostHeadingComponent.css'
// import { connect } from 'react-redux';
// import { deleteExistingPost } from '../actions' 

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
                    {/* <button onClick={this.deletePost}>Delete Post</button> */}
                </div>
            )
        }
        else {
            return (<div>Loading . . . </div>)
        }
    }
}


// export default connect(mapDispatchToProps)(PostHeadingComponent);

export default PostHeadingComponent
