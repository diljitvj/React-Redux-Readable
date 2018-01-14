import React, { Component } from 'react';
import { connect } from 'react-redux';
import { categoriesFetchSuccess, postsFetchSuccess } from '../actions'
import { getAllCategories } from '../api/api'

class RootComponent extends Component {
    state = {
        categories: []
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        getAllCategories()
            .then(
                response => {
                    this.setState({
                        categories: response.categories
                    })
                }
            )
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Root Component</h1>
            </div>
        )
    }
}

function mapStateToProps({categories}){
    return {categories};
  }
  function mapDispatchToProps(dispatch){
    return {
      
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);