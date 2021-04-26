import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom'

class FormButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <Fragment>
                <div className='form-actn-btns-cntr'>
                    <div className='btn-cntr frmbtns-left-cntr'>

                    </div>
                    <div className='btn-cntr frmbtns-middle-cntr'>
                        <button type="submit" className="btn btn-primary"  >Submit</button>
                        <NavLink className='btn btn-warning' to={this.props.listUrl}>Discard</NavLink>
                    </div>
                    <div className='btn-cntr frmbtns-right-cntr'>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FormButtons; 