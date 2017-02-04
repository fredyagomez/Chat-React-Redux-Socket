import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
//import Button from 'grommet/components/Button';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import { announce } from 'grommet/utils/Announcer';
import Pulse from 'grommet/components/icons/Pulse';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import Chat from './Chat';
import history from '../RouteHistory';
import io from 'socket.io-client';


//Redux
import { connect } from 'react-redux';
import { sendMessages } from '../actions';

let socket = io.connect();

class App extends React.Component {
  static propTypes = { 
    //message: PropTypes.string.isRequired,
    AppState: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }	
  constructor (props) {
    super(props);
    this.state = {users: [], messages: [], user: '', chatFlag: false, NoAgent: false};
    this._Close = this._Close.bind(this);
    this.handleClick = this.handleClick.bind(this);	
    this._initialize = this._initialize.bind(this);
    this._messageRecieve = this._messageRecieve.bind(this);
    this._userJoined = this._userJoined.bind(this);
    this._userLeft = this._userLeft.bind(this);
    this._handleMessageSubmit = this._handleMessageSubmit.bind(this);
    this.joinRoom  = this.joinRoom.bind(this);
    //this._onClose = this._onClose.bind(this);
    //this.state = {fillOpacity: 1e-6, x: props.letterx, y: props.lettery, flag_tooltip: false};
  }
  componentDidMount () {
    socket.on('init', this._initialize);
    socket.on('send:message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
    //Metrics.connect();
    //console.log(Metrics);
    //let username = 'fredy.a.gomez@hpe.com';
		//do {
		//	username = prompt('Enter your name:');
		//} while (!username.length);
    //const { dispatch, AppState } = this.props;
  }

  
  
  _initialize(data) {
    let {users, name} = data;
    this.setState({users, user: name});
  }
  _messageRecieve(message) {
    //let {messages} = this.state;
    //messages.push(message);
    //this.setState({messages});
    this.props.dispatch(sendMessages(message));
  }
  _userJoined(data) {
    //let {users, messages} = this.state;
    let {name} = data;
    //users.push(name);
    //messages.push({
    //  user: 'SYSTEM MESSAGE',
    //  text : name +' Joined'
    //});
    //this.props.dispatch(setUsers(users));
    //this.props.dispatch(sendMessages(message));
    //this.setState({users, messages});
    this.props.dispatch(sendMessages({
      user: 'SYSTEM MESSAGE',
      text : name +' Joined'
    }));
  }
  _userLeft(data) {
    //let {users, messages} = this.state;
    let {name} = data;
    //let index = users.indexOf(name);
    //users.splice(index, 1);
    //messages.push({
    //  user: 'SYSTEM MESSAGE',
    //  text : name +' Left'
    //});
    //this.setState({users, messages});
    this.props.dispatch(sendMessages({
      user: 'SYSTEM MESSAGE',
      text : name +' Left'
    }));
  }
  _handleMessageSubmit(message) {
    //let {messages} = this.state;
    //messages.push(message);
    //this.setState({messages});
    //console.log(message);
	this.props.dispatch(sendMessages(message));
    socket.emit('send:message', message);
	window.scrollTo(0,document.body.scrollHeight);
  }
  _Close () {
    this.setState({chatFlag: false});
    this.setState({NoAgent: false});
  }
  handleClick() {
    //window.open(`${event}`, "Support Chat", "width=600,height=900");
    if (this.state.user == "Guest 1" || this.state.user == "Guest 2") {
      this.setState({chatFlag: true});
      announce('You are joining the chat');
    } else {
      announce('No agent available');
      this.setState({chatFlag: true});
      //this.setState({NoAgent: true});
    }
  } 
  joinRoom() {
  /*  $.ajax({
      url: 'http://localhost:1337/joinRoom',
      type: 'POST',     
      data: {
        "room": this.state.users[0];
      },
      success: function(data) {
        return data;
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });*/
  }
  render() {
    //console.log(this.props.AppState.reddit);
    //console.log(this.props.AppState);
    //console.log(this.state.messages);
	let NoAgent;
	//let user1 = this.state.users[0];
    //console.log(this.state.user);
    //console.log(this.state.messages);
    if (this.state.NoAgent) {
      NoAgent = (
        <Layer align="center" closer={true} onClose={this._Close}>
          <Heading tag="h4"><br/>All our agents are currently busy or attending other customers. We have captured your email and we will contact you to follow up.<br/><br/> Sorry for the incovenience.</Heading>
        </Layer>
      );
    } else {
      NoAgent = (
      <div></div>
      );
    }
    let chatWindow;
	//let user1 = this.state.users[0];
    //console.log(this.state.user);
    //console.log(this.state.messages);
    if (this.state.chatFlag) {
      chatWindow = (
        <Layer align="right" closer={true} onClose={this._Close}>
          <Chat user={this.state.user} messages={this.props.AppState} handleMessageSubmit={this._handleMessageSubmit}/>
        </Layer>
      );
	} else {
      chatWindow = (
      <div></div>
      );
    }
    //const { AppState } = this.props;
    return (
	<Article className="home" scrollStep={false}>
		
      <div>
      {chatWindow}
      {NoAgent}
        <Box>
          <Section appCentered={true} pad="none" className="home__section"
            backgroundImage={`url(${history.makeHref('/img/slide-4I.jpg')})`} colorIndex="light"
            primary={true} full={true} justify="end" align="center" > 
            
              <Headline size="small" strong={true} align="center" margin="none"><font size="20">
                Help ?<br/></font>
              </Headline>
              <Box basis="1/3" pad={{"horizontal": "medium", "vertical": "small"}}>
                <Pulse icon={<CircleQuestionIcon />} onClick={this.handleClick}/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 {/*
   <Button label={user1} onClick={this.joinRoom} />*/}
              </Box>
				
          </Section>
		</Box>
      </div>
	</Article>
    );
  }
}

const mapStateToProps = state => {
  const { AppState } = state;
  return {
    AppState
  };
};

export default connect(mapStateToProps)(App);