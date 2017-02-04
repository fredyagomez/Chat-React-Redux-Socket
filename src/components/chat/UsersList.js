import React, { PropTypes } from 'react';


export default class UsersList extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
  }
  render () {
    return (
      <div className="users">
			<h3> Online Users </h3>
				<ul>
					{this.props.users.map((user, i) => {
							
						return (
							<ul>
								<li key={i}>
									{user}
								</li>
							</ul>
						);
					}
					)}
				</ul>				
			</div>
    );
  }
}
  