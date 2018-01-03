import React from 'react';
import Center from 'react-center'
import Gallery from 'react-photo-gallery';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form , ButtonGroup, Grid, Row, Col, Clearfix, ToggleButton} from 'react-bootstrap'

class ImageContest extends React.Component {

  constructor() {
    super();

    this.state = {
      imageUrl: "",
      content: "",
      captions: [],
      disabledButton: false,
      users: []
    }
  }

  componentWillMount() {
    fetch("/current")
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data)
      this.setState({
        imageUrl: data.url,
        id: data.id
      })
      var newCaptions = this.state.captions
      var newUsers = this.state.users
      fetch("/" + this.state.id + "/all_captions")
      .then(results => {
        return results.json();
      }).then(data => {
        for (var i = 0; i < data.length; i++) {
          newCaptions.push(data[i].content)
          newUsers.push(data[i].username)
        }
        this.setState({
          captions: newCaptions,
          users: newUsers
        })
      })
    })

  }

  handleCaptionClick = () => {
    window.location = "/image"
  }

  handleImgButtonClick = (event) => {
    const imgText =(event.currentTarget.lastChild.parentElement.childNodes["0"].parentElement.firstChild.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.firstChild.innerHTML)
    console.log(imgText)
    var user = {
      name: this.props.name,
      token: this.props.token,
      profile_image: this.props.profile_image,
      id: this.props.id,
      votes: this.props.votes - 1
    }

    const caption = {
      token: this.props.token,
      img: imgText
    }

    fetch('/cast_vote',{
      method: 'POST',
      body: JSON.stringify(caption),
      headers: {
                "Content-Type": "application/json"
      }
    })

    event.target.disabled = true;
    sessionService.saveUser(user)
    sessionService.saveSession(user)

    window.location = `/user/${user.token}`
  }


  render() {
    const imageUrl = this.state.imageUrl

    const style = {
      maxWidth: 200,
      maxHeight: 200
    }

    const captions = this.state.captions.map((currentValue, index) => {
      //debugger;
      if (this.props.votes <= 0 || this.props.name == this.state.users[index] || this.props.authenticated == false) {
        return (
            <div className="imgDiv col-lg-4 col-md-6">

                  <Center>
                    <img className="gridImg" src={imageUrl} />
                  </Center>
                  <Center>
                    <p className="imgText text-Center">{currentValue}</p>
                  </Center>
                  <Center>
                    <p className="imgText text-Center">@{this.state.users[index]}</p>
                  </Center>
              <br />
            </div>
        )
      } else {
        return (
            <div className="imgDiv col-lg-4 col-md-6">
                  <Center>
                    <img className="gridImg" src={imageUrl} />
                  </Center>
                  <Center>
                    <p className="imgText text-Center">{currentValue}</p>
                  </Center>
                  <Center>
                    <p className="imgText text-Center">@{this.state.users[index]}</p>
                  </Center>
                  <Center>
                    <Button onClick={this.handleImgButtonClick}>
                     Vote
                    </Button>
                  </Center>
              <br />
            </div>
        )
      }
    })

    return (

      <div>
        <Center>
          <ButtonGroup><Button onClick={this.handleCaptionClick}>Image</Button><Button active={true}>Captions</Button></ButtonGroup>
        </Center>

        <br />
        <Center>
          <h3>{this.state.message}</h3>
        </Center>
        <br />
          <div className="container-fluid image-Grid">
            {captions}
          </div>
      </div>

    );
  }
};

const mapStateToProps = (state) => { //getting props from state necessary for Blackjack Component
  //some of these props aren't used but rather exist to help tell the component that the state has changed and needs to re-render
  return {
    name: state.session.user.name,
    token: state.session.user.token,
    profile_image: state.session.user.profile_image,
    user_id: state.session.user.id,
    votes: state.session.user.votes,
    authenticated: state.session.authenticated
  }
};

const mapDispatchToProps = (dispatch) => { //getting dispatch actions necessary for Blackjack Component
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageContest);
