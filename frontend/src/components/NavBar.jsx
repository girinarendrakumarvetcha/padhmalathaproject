import React, { Component } from 'react'


import Logo from './Logo'
import Links from './Links'

class navBar extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <Logo />
                    <Links />
                </nav>
            </div>
        )
    }
}

export default navBar