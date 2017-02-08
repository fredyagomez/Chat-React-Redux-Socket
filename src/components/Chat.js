import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';	
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Image from 'grommet/components/Image';
import MessageList from './chat/MessageList';
import MessageForm from './chat/MessageForm';
	
export default class Chat extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    handleMessageSubmit: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.OnSubmit = this.OnSubmit.bind(this);
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  OnSubmit(message) {
    this.props.handleMessageSubmit(message);
	window.scrollTo(0,document.body.scrollHeight);
  }
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }
  render() {
    window.scrollTo(0,document.body.scrollHeight);
    let user = this.props.user;
    return (
      <div>
        <Box basis="1/3" pad={{"horizontal": "medium", "vertical": "small"}}>
          <Heading tag="h4" strong={true}>Chat Window</Heading>
		</Box>
		<Box direction="row" flex="false"  pad="none" reverse={false} texture="img/textureII.jpg">  
          <Box justify="start" align="center" alignContent="center" alignSelf="center" pad="small">
          <Image src="img/Agent.png" size="thumb"/>Guest 1
          </Box>
          <Box justify="start" align="center" alignContent="center" alignSelf="center" pad="none" flex="false" size="width: 50" wrap={true}>
            <Paragraph size="small">  
		Hi, I can help with anything while you are here. </Paragraph>
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
