import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';	
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
//import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
//import Button from 'grommet/components/Button';
import Image from 'grommet/components/Image';
//import UsersList from './chat/UsersList';
import MessageList from './chat/MessageList';
import MessageForm from './chat/MessageForm';
//import io from 'socket.io-client';
//import UserWorkerIcon from 'grommet/components/icons/base/UserWorker';
//let socket = io.connect();
//let socket = io('http://localhost:3132/');


const oldTitle = document.title;
const msg = "New Popup!";
//let timeoutId = false;
//if (!timeoutId) {
//      timeoutId = setInterval(blink, 500);//Initiate the Blink Call
//}
	
export default class Page5 extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    handleMessageSubmit: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    //this.state = {timeoutId: false};
    //this.state = {users: [], messages: [], text: '', email: ''};
    //this._initialize = this._initialize.bind(this);
    //this._messageRecieve = this._messageRecieve.bind(this);
    //this._userJoined = this._userJoined.bind(this);
    //this._userLeft = this._userLeft.bind(this);
    //this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
  }
  componentDidMount() {
    this.scrollToBottom();
    //socket.on('init', this._initialize);
    //socket.on('send:message', this._messageRecieve);
    //socket.on('user:join', this._userJoined);
    //socket.on('user:left', this._userLeft);
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
    //document.title = "New Message...";
    this.blink();
  }
  blink() {
    document.title = document.title == msg ? oldTitle : msg;//Modify Title in case a popup
    if(document.hasFocus()) {//Stop blinking and restore the Application Title
      document.title = oldTitle;
      //clearInterval(timeoutId);
    }                       
  }
  OnSubmit(message) {
    this.props.handleMessageSubmit(message);
	window.scrollTo(0,document.body.scrollHeight);
  }
  handleSubmit() {
  }
  changeHandler() {
     //this.setState({ email : e.target.value });  //Create an Action
  }
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }
  render() {
    window.scrollTo(0,document.body.scrollHeight);
    //Blink logic 
	
    let user = this.props.user;
    return (
      <div>
        <Box basis="1/3" pad={{"horizontal": "medium", "vertical": "small"}}>
          <Heading tag="h4" strong={true}>Enterprise Analytics: Chat Window</Heading>
		</Box>
		
		<Box direction="row" flex="false"  pad="none" reverse={false} texture="img/textureII.jpg">  
          <Box justify="start" align="center" alignContent="center" alignSelf="center" pad="small">
          <Image src="img/Agent.png" size="thumb"/>Guest 1
          </Box>
          <Box justify="start" align="center" alignContent="center" alignSelf="center" pad="none" flex="false" size="width: 50" wrap={true}>
            <Paragraph size="small">  
		Hi, I can help with anything while you are here. <br/>
		In case we get disconnected, I will use your HPE email  <br/>
		so I can follow up offline </Paragraph>
          </Box>
		</Box>
		
        

        <MessageList
          messages={this.props.messages} user={user}
        />
        <MessageForm
          onMessageSubmit={this.OnSubmit}
          user={this.props.user}
        />
		
        <Footer primary={true} appCentered={true} direction="column" align="center" pad="small" colorIndex="light">
        <Box direction="row" align="stretch">
          <Box alignContent="start" align="center" pad={{"horizontal": "medium"}}>
            © Chat Inc
          </Box>
        </Box>
        </Footer>  
		<div style={{float:"left", clear: "both"}} ref={(el) => { this.messagesEnd = el; }}></div>
    </div>
    );
  }
}

