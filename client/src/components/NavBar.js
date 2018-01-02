import React from 'react';
import { NavLink } from 'react-router-dom';
import UserCredentials from './UserCredentials'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const link = { //navbar css
  height: '130px',
  width: '100px',
  padding: '10px',
  margin: '0px 3px 3px',
  background: 'red',
  textDecoration: 'none',
  color: 'white',
}

const NavBar = (props) => {
  return ( //navbar routes and css
    <div className="navbar">
      <UserCredentials profile_image={props.profile_image} name={props.name} />
    </div>
  );
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

export default connect(mapStateToProps)(NavBar);
