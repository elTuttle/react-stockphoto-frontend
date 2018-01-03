import React from 'react';
import Center from 'react-center'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { bindActionCreators } from 'redux';
import { newUser } from '../actions/UserActions';

class GetUser extends React.Component {

  componentWillMount() {
    fetch('http://development-stockphoto.ggd869vitp.us-west-1.elasticbeanstalk.com/current_user/' + this.props.match.params.token)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data)
      var user = {
        name: data.name,
        token: data.token,
        profile_image: data.profile_image,
        id: data.id,
        votes: data.votes
      }
      sessionService.saveUser(user)
      sessionService.saveSession(user)
    })
  }

  render() {
    console.log(this.props)
    if (this.props.name !== "") {
        return (
          <Redirect to={{
          pathname: '/image'
        }}/>
      )
    }else {
    return (
      <div>

      </div>
    );
  }
  }
};

const mapStateToProps = (state) => { //getting props from state necessary for Blackjack Component
  //some of these props aren't used but rather exist to help tell the component that the state has changed and needs to re-render
  return {

    name: state.user.name
  }

};

const mapDispatchToProps = (dispatch) => { //getting dispatch actions necessary for Blackjack Component
  return bindActionCreators({
    newUser: newUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUser);
