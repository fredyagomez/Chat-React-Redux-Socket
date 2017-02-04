import React, { PropTypes } from 'react';
import Message from './Message';

export default class MessageList extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired
  }
  render () {
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
