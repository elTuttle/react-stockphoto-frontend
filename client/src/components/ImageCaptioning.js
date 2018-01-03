import React from 'react';
import Center from 'react-center'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import { current_image } from '../actions/ImageActions';
import { Button, Form , ButtonGroup} from 'react-bootstrap'
import { UserCredentials } from './UserCredentials'

class ImageCaptioning extends React.Component {

  constructor() {
    super();

    this.state = {
      imageUrl: "",
      id: 1,
      content: "",
      error: ""
    }

  }

  handleChange = (event) => {
    this.setState({content: event.target.value})
  }

  handleSubmit = () => {
    if (this.state.content !== "") {
      const caption = {
        content: this.state.content,
        image_id: this.state.id,
        user_id: this.props.user_id,
        user_name: this.props.name,
        votes: 0
      }
      console.log(caption)
      fetch('http://development-stockphoto.ggd869vitp.us-west-1.elasticbeanstalk.com/captions', {
        method: "post",
        body: JSON.stringify(caption),
        headers: {
                  "Content-Type": "application/json"
        }
      })
    } else {
      this.setState({
        error: "Cannot submit empty caption."
      })
    }
  }

  componentWillMount() {
    fetch("http://development-stockphoto.ggd869vitp.us-west-1.elasticbeanstalk.com/current")
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data)
      this.setState({
        imageUrl: data.url,
        id: data.id
      })


    })

  }

  componentDidUpdate() {
    fetch('http://development-stockphoto.ggd869vitp.us-west-1.elasticbeanstalk.com/current_user/' + this.props.token)
    .then(results => {
      return results.json();
    }).then(data => {
      if (data !== null) {
        var user = {
          name: data.name,
          token: data.token,
          profile_image: data.profile_image,
          id: data.id,
          votes: data.votes
        }
        sessionService.saveUser(user)
        sessionService.saveSession(user)

      }
    })
  }

  handleCaptionClick = () => {
    window.location = "/imagecaptions"
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <Center>
            <ButtonGroup><Button active="true">Image</Button><Button onClick={this.handleCaptionClick}>Captions</Button></ButtonGroup>
          </Center>
          <br />
          <Center>
            <img src={this.state.imageUrl} />
          </Center>
            <Center>
              <Form onSubmit={this.handleSubmit}>
                <textarea id="txtArea" rows="2" cols="50" maxLength="80" value={this.state.value} onChange={this.handleChange}></textarea><br />

                <Center>
                  <Button type="submit" >Submit Caption</Button>
                </Center>
              </Form>
            </Center>
        </div>
      )
    } else {
      return (
        <div>
          <Center>
            <ButtonGroup><Button active="true">Image</Button><Button onClick={this.handleCaptionClick}>Captions</Button></ButtonGroup>
          </Center>
          <br />
          <Center>
            <img src={this.state.imageUrl} />
          </Center>
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => { //getting props from state necessary for Blackjack Component
  //some of these props aren't used but rather exist to help tell the component that the state has changed and needs to re-render
  console.log(state)
  return {
    name: state.session.user.name,
    token: state.session.user.token,
    profile_image: state.session.user.profile_image,
    user_id: state.session.user.id,
    authenticated: state.session.authenticated
  }
};

const mapDispatchToProps = (dispatch) => { //getting dispatch actions necessary for Blackjack Component
  return bindActionCreators({
    current_image: current_image
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCaptioning);
