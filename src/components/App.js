import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
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
  }
  componentDidMount () {
    socket.on('init', this._initialize);
    socket.on('send:message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
  }  
  _initialize(data) {
    let {users, name} = data;
    this.setState({users, user: name});
  }
  _messageRecieve(message) {
    this.props.dispatch(sendMessages(message));
  }
  _userJoined(data) {
    let {name} = data;
    this.props.dispatch(sendMessages({
      user: 'SYSTEM MESSAGE',
      text : name +' Joined'
    }));
  }
  _userLeft(data) {
    let {name} = data;
    this.props.dispatch(sendMessages({
      user: 'SYSTEM MESSAGE',
      text : name +' Left'
    }));
  }
  _handleMessageSubmit(message) {
	this.props.dispatch(sendMessages(message));
    socket.emit('send:message', message);
	window.scrollTo(0,document.body.scrollHeight);
  }
  _Close () {
    this.setState({chatFlag: false});
    this.setState({NoAgent: false});
  }
  handleClick() {
    if (this.state.user == "Guest 1" || this.state.user == "Guest 2") {
      this.setState({chatFlag: true});
      announce('You are joining the chat');
    } else {
      announce('No agent available');
      this.setState({chatFlag: true});
    }
  } 
  joinRoom() {
  }
  render() {
	let NoAgent;
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