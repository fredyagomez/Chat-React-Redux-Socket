import React, { PropTypes } from 'react';
import FormField from 'grommet/components/FormField';

export default class MessageForm extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    onMessageSubmit: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {text: ''};
	this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let message = {
      user : this.props.user,
      text : this.state.text
    };
    this.props.onMessageSubmit(message);	
    this.setState({ text: '' });
  }
  changeHandler(e) {
     this.setState({ text : e.target.value });  //Create an Action
  }
  render () {
    return (
      <div>
		<form onSubmit={this.handleSubmit}>
          <FormField label="">
			<input
				onChange={this.changeHandler}
				value={this.state.text}
				placeholder="Type your message here..."
			/>
			</FormField>
		</form>
      </div>
    );
  }
}