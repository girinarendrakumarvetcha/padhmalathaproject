import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import DrawGroupForm from './Form';

class drawGroupInsert extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         group_name : 'Gropu Name Test'
    //     }
    // }


    handleDrawGroupInsert = (data) => {
        
        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
            apis.updateGroupById(url_params.id,data).then(res => {
                this.props.history.push(`${routes.DRAW_GROUP_LIST}`);
            });
        }else{
            apis.insertGroup(data).then(res => {
                this.props.history.push(`${routes.DRAW_GROUP_LIST}`);
            });
        }
    }
       
    render(){
        return (
            <div>
                <PageTitle heading='Draw Gropu Form' />
                {/* <DrawGroupForm  onSubmit={this.handleDrawGroupInsert} {...this.props} initialValues={this.state} /> */}
                <DrawGroupForm  onSubmit={this.handleDrawGroupInsert} {...this.props}  />
            </div>
        );
    }
};
export default withRouter(drawGroupInsert);
