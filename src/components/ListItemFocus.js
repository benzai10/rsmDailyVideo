import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';

class ListItemFocus extends Component {
    onRowPress() {
	console.log('row pressed')
	Actions.focusDetail({ focus: this.props.focus })
    }
    
    render() {
	const { title, description } = this.props.focus

	return (
	    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
	      <View>
		<Card>
		  <CardSection>
		    <Text style={styles.titleStyle}>
		      {title}
		    </Text>
		  </CardSection>
		  <CardSection>
		    <Text style={styles.descriptionStyle}>
		      {description}
		    </Text>
		  </CardSection>
		</Card>
	      </View>
	    </TouchableWithoutFeedback>
	)
    }
}

const styles = {
    titleStyle: {
	fontSize: 18,
	paddingLeft: 15
    },
    descriptionStyle: {
	fontSize: 14,
	paddingLeft: 15
    }
}

export default ListItemFocus;
