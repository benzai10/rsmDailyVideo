import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from './common';
import { RNCamera} from 'react-native-camera';
import Tts from 'react-native-tts';
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase';

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class DailyVideo extends Component {
    lastFaceId = 0
    state = {
	type: 'back',
	faces: []
    }

    renderFace({ bounds, faceID, rollAngle, yawAngle }) {
	if (faceID !== this.lastFaceId) {
	    this.lastFaceId = faceID
	    Tts.speak('Hello!')
	}
	return (
	    <View
	      key={faceID}
	      transform={[
		  { perspective: 600 },
		  { rotateZ: `${rollAngle.toFixed(0)}deg`},
		  { rotateY: `${yawAngle.toFixed(0)}deg`}
	      ]}
	      style={[
		  styles.face,
		     {
			 ...bounds.size,
			 left: bounds.origin.x,
			 top: bounds.origin.y
		     }
	      ]}
	      >
	      <Text style={styles.faceText}>ID: {faceID}</Text>
	      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
	      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
	    </View>
	)
    }

    renderFaces() {
	return (
	    <View style={styles.facesContainer} pointerEvents="none">
	      {this.state.faces.map(this.renderFace)}
	    </View>
	)
    }

    onFacesDetected = ({ faces }) => this.setState({ faces });
    onFaceDetectionError = state => console.warn('Faces detection error:', state)
    
    toggleFlip() {
	this.setState({
	    type: this.state.type === 'back' ? 'front' : 'back'
	})
	Tts.speak('Camera flipped')
    }

    takePicture = async function() {
	if (this.camera) {
	    const options = { quality: 0.5, base64: true }
	    const data = await this.camera.takePictureAsync(options)
	    console.log(data.uri)

	    let uploadBlob = null
	    let timestamp = new Date().toString()
	    const imageRef = firebase.storage().ref('images').child(`test-${timestamp}.jpg`)
	    let mime = 'image/jpg'
	    fs.readFile(data.uri, 'base64')
		.then((d) => {
		    return Blob.build(d, { type: `${mime};BASE64` })
		})
		.then((blob) => {
		    uploadBlob = blob
		    return imageRef.put(blob, { contentType: mime })
		})
		.then(() => {
		    uploadBlob.close()
		    Tts.speak('Picture was saved in the cloud.')
		    return imageRef.getDownloadURL()
		})
		.catch((error) => {
		    console.log(error)
		})
	}
    }

    recordVideo = async function() {
	if (this.camera) {
	    const options = { maxDuration: 6, base64: true }
	    const data = await this.camera.recordAsync(options)
	    console.log(data.uri)

	    let uploadBlob = null
	    let timestamp = new Date().toString()
	    const videoRef = firebase.storage().ref('videos').child(`test-${timestamp}.mp4`)
	    let mime = 'video/mp4'
	    fs.readFile(data.uri, 'base64')
		.then((d) => {
		    return Blob.build(d, { type: `${mime};BASE64` })
		})
		.then((blob) => {
		    uploadBlob = blob
		    return videoRef.put(blob, { contentType: mime })
		})
		.then(() => {
		    Tts.speak('Video was saved in the cloud.')
		    uploadBlob.close()
		    return videoRef.getDownloadURL()
		})
		.catch((error) => {
		    console.log(error)
		})
	}
    }

    
    render() {
	return (
	    <View style={styles.container}>

	      <RNCamera
		ref={ref => {
		    this.camera = ref;
		}}
		style={styles.preview}
		type={this.state.type}
		flashMode={RNCamera.Constants.FlashMode.on}
		onFacesDetected={this.onFacesDetected}
		onFaceDetectionError={this.onFaceDetectionError}
		permissionDialogTitle={'Permission to use camera'}
		permissionDialogMessage={'We need your permission to use your camera phone'}
		>

		<View style={styles.flipButtonContainer}>
		  <TouchableOpacity
		    style={styles.flipButton}
		    onPress={this.toggleFlip.bind(this)}
		    >
		    <Text style={styles.flipText}>Flip Camera</Text>
		  </TouchableOpacity>
		</View>
		{this.renderFaces()}
	      </RNCamera>

	      <View
		style={{
		    flex: 0.1,
		    backgroundColor: 'transparent',
		    flexDirection: 'row',
		    alignSelf: 'flex-end'
		}}
		>
		<Button
		  onPress={this.takePicture.bind(this)}
		  >
		  Take Picture
		</Button>
		<Button
		  onPress={this.recordVideo.bind(this)}
		  >
		  Record 10s Video
		</Button>
	      </View>
	    </View>
	)
    }
}

const styles = {
    container: {
	flex: 1
    },
    preview: {
	flex: 1
    },
    flipButtonContainer: {
	flex: 0.5,
	backgroundColor: 'transparent',
	flexDirection: 'row',
	justifyContent: 'space-around'
    },
    flipButton: {
	flex: 0.3,
	height: 40,
	marginHorizontal: 2,
	marginBottom: 10,
	marginTop: 20,
	borderRadius: 8,
	borderColor: 'white',
	borderWidth: 1,
	padding: 5,
	alignItems: 'center',
	justifyContent: 'center'
    },
    flipText: {
	color: 'white',
	fontSize: 15
    },
    facesContainer: {
	position: 'absolute',
	bottom: 0,
	right: 0,
	left: 0,
	top: 0
    },
    face: {
	padding: 10,
	borderWidth: 2,
	borderRadius: 2,
	position: 'absolute',
	borderColor: '#FFD700',
	justifyContent: 'center',
	backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    faceText: {
	color: '#FFD700',
	fontWeight: 'bold',
	textAlign: 'center',
	margin: 10,
	backgroundColor: 'transparent'
    }
}

export default DailyVideo;
