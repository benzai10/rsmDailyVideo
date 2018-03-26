import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';

class FocusDetail extends Component {
    render() {
	const { title, description } = this.props.focus
	
	return (
	    <Card>
	      <CardSection>
		<Text>{title}</Text>
	      </CardSection>

	      <CardSection>
		<Text>{description}</Text>
	      </CardSection>
	    </Card>
	)
    }
}

export default FocusDetail;
