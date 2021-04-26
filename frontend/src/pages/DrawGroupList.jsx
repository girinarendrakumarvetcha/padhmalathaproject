import React, { Component } from 'react';
import apis from '../api';
class DrawGroupList extends Component {
    constructor(props){
        super(props);
        this.state = {
            draw_group_data: []
        }
    }

    componentDidMount = async () => {
        await apis.getGroupList().then(draw_group => {
             this.setState({
                draw_group : draw_group.data.data,
            })
        })
    }

    render() {
        let showTable = true;
        const { draw_group } = this.state;
        console.log(draw_group);
        if (typeof draw_group == 'undefined' || !draw_group.length) {
            showTable = false;
        }
        return (
            <div className='container-fluid'>
            {showTable && (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Short Code</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.draw_group.map((cus, index) => (
                            <tr key={index}>
                                <td>{cus.name}</td>
                                <td>{cus.shortCode}</td>
                                <td><a href='customer'>eidt</a></td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        )
    }
}

export default DrawGroupList

