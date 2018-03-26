import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from './common';
import RNFetchBlob from 'react-native-fetch-blob';
import Tts from 'react-native-tts';

const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()

class Quote extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    quote: 'Quote is coming...'
	}
    }

    componentDidMount() {
	return fetch('http://quotes.rest/qod.json')
	    .then((response) => response.json())
	    .then((responseJson) => {
		console.log(responseJson)
		this.setState({ quote: responseJson.contents.quotes[0].quote })
		Tts.speak(responseJson.contents.quotes[0].quote)
		return responseJson
	    })

	
	    // .then((response) => response.json())
	    // .then((responseJson) => {
	    // 	this.setState({ quote: 'Data retrieved'}, function(){
		    
	    // 	})
	    // })
    }


    render() {
	return (
	    <Card>
	      <CardSection>
		<Text>{this.state.quote}</Text>
	      </CardSection>
	    </Card>
	)
    }
}

export default Quote;
