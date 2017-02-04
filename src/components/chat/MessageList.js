import React, { PropTypes } from 'react';
import Message from './Message';
import { announce } from 'grommet/utils/Announcer';

export default class MessageList extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired
  }
  render () {
    announce('New Message');
    return (
       <div className="messages">
		{
            this.props.messages.map((message, i) => {
                return (
					<Message
						key={i}
						user={message.user}
						text={message.text} 
					/>
                );
           })
		} 
      </div>
    );
  }
}
/*
if (this.props.user == 'Guest 1') {
                  return (
					<Message
						key={i}
						user={message.user}
						text={message.text} 
					/>
                  );
				} else if (message.user == this.props.user || message.user == 'Guest 1') {
					return (
                      <Message
						key={i}
						user={message.user}
						text={message.text} 
                      />
					);
				}
				
*/
