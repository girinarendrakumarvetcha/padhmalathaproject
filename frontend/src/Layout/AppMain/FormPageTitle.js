import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

class PageTitle extends Component {

    render() {
        let {
            //enablePageTitleIcon,
            enablePageTitleSubheading,
            heading,
            icon,
            subheading
        } = this.props;

        return (

            <div className="app-page-title form-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div>
                            <h2>{heading}</h2>
                            <div
                                className={cx("page-title-subheading", {'d-none': !enablePageTitleSubheading})}>
                                {subheading}
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);