import React from 'react';
import { Button } from 'react-bootstrap'
import Center from 'react-center'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router'

class LoginComponent extends React.Component {

  handleClick = () => {
    window.location.href = "/auth/twitter"
  }


  render() {

      return (
        <div>
          <Button bsSize="small" onClick={this.handleClick}>Login With Twitter</Button>
        </div>
      );
  }
};

const mapStateToProps = (state) => { //getting props from state necessary for Blackjack Component
  //some of these props aren't used but rather exist to help tell the component that the state has changed and needs to re-render
  console.log(state)
  if (state.authenticated === false) {
    return  {
      name: "anonymous",
      profile_image: "",
      user_id: "state.session.user.id"
    }
  }else {
    return {
      name: state.session.user.name,
      profile_image: state.session.user.profile_image,
      user_id: state.session.user.id
    }
  }
};

export default connect(mapStateToProps)(LoginComponent);
