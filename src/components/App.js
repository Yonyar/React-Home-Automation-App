import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import '../styles/app.css';

import Disconected from './Disconected'
import Header from './functionals/Header';
import SwipeHeader from './functionals/SwipeHeader';
import Empty from './Empty';
import Home from './Home';
import Login from './Login';
import Control from './Control';
import TV from './TV';
import Fan from './Fan';
import Garage from './Garage';
import { firebase } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {render:false, user:false};
  }

  componentDidMount() {
    let index = parseInt(localStorage.getItem("index"));
    let path;
    switch(index) {
      case 0:
        path = '/control';
        break;
      case 1:
        path = '/garage_remote';
        break;
      case 2:
        path = '/tv_remote';
        break;
      case 3:
        path = '/fan_remote';
        break;
      default:
        path = '/control';
        break;
    }
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
      user? this.props.history.push(path):this.props.history.push('/home');
    });
  }
  forceRender = () => {
    this.setState({render : !this.state.render})
  }

  render() {
    return (
      <>
        <Disconected/>
        {this.state.user
        ?<div className="header">
          <MediaQuery maxWidth={767} orientation={"portrait"}>
            {(matches) =>
              matches
                ? <SwipeHeader/>
                : <Header change={this.forceRender}/>
            }
          </MediaQuery>
        </div>
        :<></>}

        <Route exact path="/home" component={Home}/>
        <Route exact path="/login" component={Login}/>

        <div className="box">
          <MediaQuery maxWidth={767} orientation={"portrait"}>
            {(matches) =>
              matches
                ?
                <>
                  <Route exact path="/control" component={Control}/>
                  <Route exact path="/garage_remote" component={Garage}/>
                  <Route exact path="/tv_remote" component={TV}/>
                  <Route exact path="/fan_remote" component={Fan}/>
                </>

                :
                <>
                  {localStorage.getItem("showControl")==="true"
                    ?<Route exact path="/control" component={Control}/>
                    :<Route exact path="/control" component={Empty}/>}
                  {localStorage.getItem("showGarage")==="true"
                    ?<Route exact path="/garage_remote" component={Garage}/>
                    :<Route exact path="/garage_remote" component={Empty}/>}
                  {localStorage.getItem("showTV")==="true"
                    ?<Route exact path="/tv_remote" component={TV}/>
                    :<Route exact path="/tv_remote" component={Empty}/>}
                  {localStorage.getItem("showFan")==="true"
                    ?<Route exact path="/fan_remote" component={Fan}/>
                    :<Route exact path="/fan_remote" component={Empty}/>}
                </>
              }
            </MediaQuery>
        </div>
    </>
    );
  }
}

export default withRouter(App);
