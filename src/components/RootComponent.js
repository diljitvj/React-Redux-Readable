import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../actions'
import {Link} from 'react-router-dom'
import PostHeadingComponent from './PostHeadingComponent'
import './RootComponent.css'
import HeaderComponent from './HeaderComponent';
import { capitalize } from './utils/helper'

class RootComponent extends Component {
    componentDidMount() {
        this.props.fetchCategoriesData()
    }
    render() {
        const { categories, posts, loading } = this.props
        if(!loading){
            return (
                <div>
                    <HeaderComponent showBackButton={false} path={'hello'}/>
                    {
                        categories.map(category => (
                            <div key={'wrapper-'+category.name}>
                            <Link key={'link-'+category.name} to={`/category/${category.name}`}><h4>{capitalize(category.name)}</h4></Link>
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
        } else {
            return (
                <div>Loading . . .</div>
            )
        }
    }
}

function mapStateToProps(state) {
    let categories = []
    let posts = []
    let loading
    Object.keys(state.categories).map(key =>{
        if(key !== 'loading'){
            let category = state.categories[key]
            categories.push(category)
        } else {
            loading = state.categories[key]
        }
    })
    Object.keys(state.posts).map(key =>{
        if(key !== 'loading'){
            let post = state.posts[key]
            posts.push(post)
        } else {
            loading = loading || state.posts[key]
        }
    })
    console.log(loading)
    return {categories, posts, loading};
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoriesData: () => dispatch(fetchCategories()),
        fetchPostsData: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);