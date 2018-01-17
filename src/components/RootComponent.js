import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions'
import {Link} from 'react-router-dom'
import './RootComponent.css'
import HeaderComponent from './HeaderComponent';
import { capitalize } from '../utils/helper'

class RootComponent extends Component {
    componentDidMount() {
        this.props.fetchCategoriesData()
    }
    render() {
        const { categories, loading } = this.props
        if(!loading){
            return (
                <div className="">
                    <HeaderComponent showBackButton={false} path={'hello'}/>
                    <div className="root-component-wrapper">
                    <h3><span>Categories</span></h3>
                    <div className="categories-wrapper">
                    {
                        categories.map(category => (
                            <Link key={'link-'+category.name} to={`/category/${category.name}`}>
                            <div key={'wrapper-'+category.name} className="category">
                            <h4>{capitalize(category.name)}</h4>
                            </div>
                            </Link>
                        ))
                    }
                    </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                <HeaderComponent showBackButton={false} path={'/'} />
                <div class="sk-rotating-plane"></div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    let categories = []
    let loading
    Object.keys(state.categories).forEach(key =>{
        if(key !== 'loading'){
            let category = state.categories[key]
            categories.push(category)
        } else {
            loading = state.categories[key]
        }
    })
    return {categories, loading};
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoriesData: () => dispatch(fetchCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);