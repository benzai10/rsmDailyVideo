import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from './common';

class Menu extends Component {
    onFocusList() {
	Actions.focusList()
    }
    
    onDailyVideo() {
	Actions.dailyVideo()
    }

    onDailyQuote() {
	Actions.dailyQuote()
    }
    
    render() {
	return (

	    <Card>
	      <CardSection>
		<Button onPress={this.onFocusList.bind(this)}>
		  Focus List
		</Button>
	      </CardSection>
	      
	      <CardSection>
		<Button>
		  Recent Videos
		</Button>
	      </CardSection>
	      
	      <CardSection>
		<Button onPress={this.onDailyVideo.bind(this)}>
		  Daily Video
		</Button>
	      </CardSection>

	      <CardSection>
		<Button onPress={this.onDailyQuote.bind(this)}>
		  Daily Quote
		</Button>
	      </CardSection>
	    </Card>
	)
    }
}

export default Menu;
