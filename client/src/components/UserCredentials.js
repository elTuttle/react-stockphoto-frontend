import React from 'react';
import { Button, Form , ButtonGroup} from 'react-bootstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import LoginComponent from './LoginComponent'
import Center from 'react-center'

class UserCredentials extends React.Component {

   handleClick = () => {
    sessionService.deleteSession();
    window.location = "/"
  }

  render() {
    console.log(this.props.authenticated)
    if (!this.props.authenticated) {
      return (
        <div>
          <LoginComponent />
        </div>
      )
    } else {
      return (
        <div>
          <p><img src={this.props.profile_image} />  <Button bsSize="small" onClick={this.handleClick}>sign out</Button></p>
          <p><strong>Votes: {this.props.votes}</strong></p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => { //getting props from state necessary for Blackjack Component
  //some of these props aren't used but rather exist to help tell the component that the state has changed and needs to re-render
  console.log(state)
  if (state.session.authenticated === false) {
    return  {
      authenticated: false
    }
  }else {
    return {
      name: state.session.user.name,
      profile_image: state.session.user.profile_image,
      user_id: state.session.user.id,
      votes: state.session.user.votes,
      authenticated: true
    }
  }
};

export default connect(mapStateToProps)(UserCredentials);
