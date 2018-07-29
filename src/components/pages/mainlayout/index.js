import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoBox from './../../sharedComponents/infoBox/index';
import {hideInfoBox} from '../../../components/sharedComponents/infoBox/actions';

// import {checkAuthStatus, unAuthUser, logoutUser} from './../../../actions/index';
import LoadingBar from 'react-redux-loading-bar';
import SubLayout from './SubLayout'
import LoginPage from '../auth/Login'
// import RegisterPage from '../auth/Register'

import MxModal from '../../sharedComponents/modal/index'

import './style.css';
import './mobile.css';



class MainLayout extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <div className="main">
        <InfoBox show={this.props.infoBoxShow} boxType={this.props.infoBoxType} message={this.props.infoBoxMessage}
                 onClickHandler={this.props.hideInfoBox}/>
        <LoadingBar progressIncrease={5} updateTime={100}
                    style={{backgroundColor: '#3c88f7', height: '3px', position: 'fixed', zIndex: 150}}/>

        <Switch>
          <Route path="/" component={LoginPage} exact />
          {/*<Route path="/register" component={RegisterPage} exact />*/}
          <Route path="/app" component={SubLayout} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    infoBoxShow: state.infoBox.show,
    infoBoxType: state.infoBox.boxType,
    infoBoxMessage: state.infoBox.message,
    successModal: state.successModal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideInfoBox: () => dispatch(hideInfoBox())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
