import React, { Component } from 'react';

import logo from '../assets/images/logo.svg';



class Logo extends Component {
    render() {
        return (
            <img src={logo} width="50" height="50" alt="sambarros.com" />
        )
    }
}

export default Logo