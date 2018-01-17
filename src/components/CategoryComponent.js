import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderComponent from './HeaderComponent'
import PostHeadingComponent from './PostHeadingComponent'
import { fetchPostsForCategory,  addNewPostForCategory } from '../actions'
import Modal from 'react-modal'
import { capitalize } from '../utils/helper'
import './CategoryComponent.css'

class CategoryComponent extends Component {
    state = {
        newPostModalOpen: false,
        selectedCategory: '',
        errormsg: ''
    }
    componentDidMount() {
        const category = this.props.match.params.id
        this.setState({
            selectedCategory: category
        })
        this.props.fetchPostsData(category)
    }
    openNewPostModal = () => {
        this.setState({
            newPostModalOpen: true,
            errormsg: ''
        })
    }
    closeNewPostModal = () => {
        this.setState({
            newPostModalOpen: false,
            errormsg: ''
        })
    }
    addPost = () => {
        const { postTitle, postBody, postAuthor } = this
        if(postTitle.value === '' || this.postBody.value === '' || this.postAuthor === ''){
            this.setState({
                errormsg: 'Please fill all fields'
            })
            return false
        }
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
        const { newPostModalOpen, errormsg } = this.state
        const category = this.props.match.params.id
        if (!posts.loading && categories[category].posts){
            const categoryPosts = categories[category].posts
            return (
                <div>
                    <HeaderComponent showBackButton={true} path={'/'} />
                    <div className="category-component-wrapper">
                    <div>
                        <h1><span>{capitalize(category)}</span></h1>
                        <button className="add-new-button" onClick={() => this.openNewPostModal()}>+ New post</button>
                    </div>
                    {
                        categoryPosts.map(postId => (
                            (
                                <Link to={`/post/${postId}`} key={postId}>
                                    <PostHeadingComponent key={postId} post={posts[postId]} />
                                </Link>
                            )
                        ))
                    }
                    </div>
                    <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={newPostModalOpen}
                        onRequestClose={this.closeNewPostModal}
                        contentLabel='Modal'
                    >
                        <div>
                            <h3>Add New Post</h3>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Post Title'
                                    ref={(input) => this.postTitle = input}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Post body'
                                    ref={(input) => this.postBody = input}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Post author'
                                    ref={(input) => this.postAuthor = input}
                                />
                                <button className="cancel" onClick={this.closeNewPostModal}>Cancel</button>
                                <button className="proceed" onClick={this.addPost}>Add Post</button>
                                <span>{errormsg}</span>
                        </div>
                    </Modal>
                </div>

            )
        }
        else {
            return (
                <div>
                <HeaderComponent showBackButton={true} path={'/'} />
                <div className="sk-rotating-plane"></div>
                </div>
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