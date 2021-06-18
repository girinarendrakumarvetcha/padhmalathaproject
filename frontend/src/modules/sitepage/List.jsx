import React, { Component  } from 'react';
import { connect } from "react-redux";
import { routes } from "../../config/routes";
import DrawListComponent  from "./DrawListComponent";
import { getSitePageSearchRequest, resetSitePageDetails } from '../../actions/sitepage';

class SitePageList extends Component {
    constructor(props){
      super(props);
      this.state = {
        table_data : {}
      }          
    }
    componentDidMount = async () => {
      const { dispatch } = this.props;
      dispatch(resetSitePageDetails());
      dispatch(getSitePageSearchRequest('dw'));
    }

    static getDerivedStateFromProps(props, state) {
      // console.log(props);
      return {
        ...state,
        table_data: props.table_data
      }
      return state;
    }
    handleSearchData  = async (event, props) => {
      const { dispatch } = props;
      if ((event != null)){
        dispatch(getSitePageSearchRequest(event.target.value));
      }
  }

    render() {
        return (
            <div className='container'>
              <div className='top-container'>
                <input  
                      name='search_site_page' 
                      className= "search_site_page"
                      onChange={(e) => { this.handleSearchData(e, this.props) }} ></input>
              </div>
              <div className='middle-containter'>
                  {/* {console.log(this.props)} */}
                  {typeof this.props.table_data != 'undefined' && this.props.table_data.length > 0 && 
                    <DrawListComponent rowData={this.props.table_data} />
                  }
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return  {
    table_data : state.sitepage.table_data  
  }
};

export default connect(mapStateToProps)(SitePageList);
