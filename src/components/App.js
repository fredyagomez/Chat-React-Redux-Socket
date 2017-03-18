import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
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
  }
  componentDidMount () {
    socket.on('init', this._initialize);
    socket.on('send:message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
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
  }
  handleClick() {
    this.setState({chatFlag: true});
  }
  _initialize(data) {
    console.log(data);
	let {users, name} = data;
    this.setState({users, user: name});
  }  
  render() {
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
        <Box>
          <Section appCentered={true} pad="none" className="home__section"
            backgroundImage={`url(${history.makeHref('/img/slide-4I.jpg')})`} colorIndex="light"
            primary={true} full={true} justify="end" align="center" > 
              <Headline size="small" strong={true} align="center" margin="none"><font size="20">
                Help ? Click here<br/></font>
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