import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../actions'
import {Link} from 'react-router-dom'
import PostHeadingComponent from './PostHeadingComponent'
import './RootComponent.css'

// import { getAllCategories } from '../api/api'

class RootComponent extends Component {
    componentDidMount() {
        this.props.fetchCategoriesData()
        this.props.fetchPostsData()
    }
    render() {
        const categories = this.props.categories
        const posts = this.props.posts
        return (
            <div>
                {/* <h1>Root Component</h1> */}
                {/* <Link to="/category/redux">Redux</Link> */}
                {
                    categories.map(category => (
                        <div key={category.name}>
                        <Link to={`/category/${category.name}`}><h4>{category.name}</h4></Link>
                        <ul key={category.name}>
                                {
                                    posts.map(post => {
                                        if(post.category === category.name)
                                            return (
                                                <li key={post.id}>
                                                    <PostHeadingComponent post={post} />
                                                </li>
                                            )
                                    })
                                }
                        </ul>
                        </div>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    let categories = []
    let posts = []
    Object.keys(state.categories).map(key =>{
        let category = state.categories[key]
        categories.push(category)
    })
    Object.keys(state.posts).map(key =>{
        let post = state.posts[key]
        posts.push(post)
    })
    return {categories, posts};
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoriesData: () => dispatch(fetchCategories()),
        fetchPostsData: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);