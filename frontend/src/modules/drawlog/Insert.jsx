import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawLogForm from './Form';

class DrawLogInsert extends Component {

    handleDrawLogInsert = (data) => {
        //console.log(data);  
        apis.insertDraw(data).then(res => {
            //this.props.history.push(`${routes.DRAW_MASTER_LIST}`);
        });
    }
       
    render(){
        return (
            <DrawLogForm  onSubmit={this.handleDrawLogInsert}  {...this.props} />
        );
    }
};
export default withRouter(DrawLogInsert);
