import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';

export default class Message extends React.Component {
  static propTypes = { user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }
  render () {	   
    return (
       <Box direction="row" pad="none" reverse={this.props.user == "Guest 1" ? false : true} texture={this.props.user == "Guest 1" ? "img/textureII.jpg" : "img/texture.jpg"}>  
          <Box justify="start" align="center" alignContent="center" alignSelf="center" pad="small">
          {this.props.user=="Guest 1" ? <Image src="img/Agent.png" size="thumb"/> : <Image src="img/User.png" size="thumb"/>}{this.props.user}
          </Box>
          <Box justify="start" align="center" alignContent="center" alignSelf="center" pad="none">
            <Paragraph size="small">  
		{this.props.text} </Paragraph>
          </Box>
		</Box>
    );
  }
}

