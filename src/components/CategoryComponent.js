import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostHeadingComponent from './PostHeadingComponent'
import { fetchPostsForCategory, fetchPostData, addNewPostForCategory } from '../actions'
import Modal from 'react-modal'

class CategoryComponent extends Component {
    state = {
        newPostModalOpen: false,
        selectedCategory: ''
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        const category = this.props.match.params.id
        this.setState({
            selectedCategory: category
        })
        this.props.fetchPostsData(category)
    }
    openNewPostModal = () => {
        this.setState({
            newPostModalOpen: true
        })
    }
    closeNewPostModal = () => {
        this.setState({
            newPostModalOpen: false
        })
    }
    addPost = () => {
        // console.log(this)
        const {postTitle, postBody, postAuthor} = this
        const now = Date.now()
        const payload = {
            title: postTitle.value,
            body: postBody.value,
            author: postAuthor.value,
            timestamp: now,
            id: now,
            category: this.state.selectedCategory
        }
        this.props.addNewPost(payload)
        this.closeNewPostModal()
    }
    render() {
        const { categories, posts } = this.props
        const { newPostModalOpen } = this.state
        let categoryPosts
        const category = this.props.match.params.id
        if (categories[category] && categories[category].posts)
            categoryPosts = categories[category].posts

        if (categoryPosts && posts != {}) {
            return (
                <div>
                    <h1>{category}</h1>
                    <button onClick={() => this.openNewPostModal()}>Add new post</button>
                    {
                        categoryPosts.map(postId => (
                            (
                                <Link to={`/post/${postId}`} key={postId}>
                                    <PostHeadingComponent key={postId} post={posts[postId]} />
                                </Link>
                            )
                        ))
                    }
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={newPostModalOpen}
                        onRequestClose={this.closeNewPostModal}
                        contentLabel='Modal'
                    >
                        <div>
                            <h1>Modal
                                <button onClick={this.closeNewPostModal}>X</button>
                                <input
                                    className='post-title'
                                    type='text'
                                    placeholder='Post Title'
                                    ref={(input) => this.postTitle = input}
                                />
                                <input
                                    className='post-body'
                                    type='text'
                                    placeholder='Post body'
                                    ref={(input) => this.postBody = input}
                                />
                                <input
                                    className='post-author'
                                    type='text'
                                    placeholder='Post author'
                                    ref={(input) => this.postAuthor = input}
                                />
                                <button onClick={this.addPost}>Add Post</button>
                            </h1>
                        </div>
                    </Modal>
                </div>

            )
        }
        else {
            return (
                <div>Loading . . .</div>
            )
        }
    }
}

function mapStateToProps({ posts, categories }) {
    return { posts, categories };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostsData: (category) => dispatch(fetchPostsForCategory(category)),
        addNewPost: (post) => dispatch(addNewPostForCategory(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);