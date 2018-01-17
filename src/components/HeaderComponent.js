import React, { Component } from 'react';
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import { Link } from 'react-router-dom'
import './HeaderComponent.css'

class HeaderComponent extends Component {    
    render() {
        let { showBackButton, path } = this.props
        return (
            <div className="header">
                <div className="back-button">
                        <Link to={path} className={(showBackButton === true ? 'show': 'hidden')}>
                        <MdArrowBack size={30}/>
                        </Link>
                </div>
                <div className="heading">Readable</div>
            </div>
        )
    }
}

export default HeaderComponent

