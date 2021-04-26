import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    React App
                </Link>
                <div className='collapse navbar-div show'>
                    <div className='navbar-nav mr-auto'>
                        <div className='collpase navbar-div'>
                            <Link to="/installment_interval/list" className="nav-link">
                                Interval
                            </Link>
                        </div>
                        <div className='collpase navbar-div'>
                            <Link to="/draw_group/list" className="nav-link">
                                Group
                            </Link>
                        </div>
                        <div className='collpase navbar-div'>
                            <Link to="/amt_catalog/list" className="nav-link">
                                Amount
                            </Link>
                        </div>
                        <div className='collpase navbar-div'>
                            <Link to="/customer/list" className="nav-link">
                                Customer
                            </Link>
                        </div>
                        <div>
                            <Link to="/auction/list" className="nav-link">
                                Master
                            </Link>
                        </div>
                        <div>
                            <Link to="/draw_master/list" className="nav-link">
                                Draw
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Links