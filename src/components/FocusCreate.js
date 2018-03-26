import React, { Component } from 'react';
import { connect } from 'react-redux';
import { focusUpdate, focusCreate } from '../actions';
import { Card, CardSection, Button, Input } from './common';



class FocusCreate extends Component {
    onButtonPress() {
	const { title, description } = this.props

	this.props.focusCreate({ title, description })
    }
    
    render() {
	return (
	    <Card>
	      <CardSection>
		<Input
		  label="Your Focus"
		  placeholder="e.g. Workout"
		  value={this.props.title}
		  onChangeText={value => this.props.focusUpdate({ prop: 'title', value })}
		  />
	      </CardSection>

	      <CardSection>
		<Input
		  label="Description"
		  placeholder="10-minute Morning Workout Routine"
		  value={this.props.description}
		  onChangeText={value => this.props.focusUpdate({ prop: 'description', value })}
		  />
	      </CardSection>

	      <CardSection>
		<Button onPress={this.onButtonPress.bind(this)}>
		  Create
		</Button>
	      </CardSection>
	    </Card>
	)
    }
}

const mapStateToProps = (state) => {
    const { title, description } = state.focus

    return { title, description }
}

export default connect(mapStateToProps, { focusUpdate, focusCreate })(FocusCreate);
