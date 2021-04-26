import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

class AppFormContainer extends Component {

    render() {
        return (
            <div className='module-form-container' >

            </div>
        )
    }
}

export default AppFormContainer

// const mapStateToProps = state => ({
//     enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
//     enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
//     enableMobileMenu: state.ThemeOptions.enableMobileMenu,
//     backgroundColor: state.ThemeOptions.backgroundColor,
//     backgroundImage: state.ThemeOptions.backgroundImage,
//     backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
// });

// const mapDispatchToProps = dispatch => ({

//     setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

// });

// export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);