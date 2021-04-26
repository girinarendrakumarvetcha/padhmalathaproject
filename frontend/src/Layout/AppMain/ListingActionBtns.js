import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class ListingActionBtns extends Component {

    render() {
        const { link , label , iconlabel  } = this.props;
        return (
          
           <div>
           <div className='edit-btn-div'>
              <NavLink to={ link }>
                <i className={ iconlabel }>{ label }</i>
              </NavLink>
           </div>
           <div className='delete-btn-div'>
               <button 
                   onClick={this.props.onClick}
               >
                 <i className={"fa fa-trash"} > Del </i>
               </button>
           </div>
         </div>
        );
    }
}

export default ListingActionBtns;