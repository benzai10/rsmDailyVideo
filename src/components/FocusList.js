import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { focusFetch } from '../actions';
import ListItemFocus from './ListItemFocus';

class FocusList extends Component {
    componentWillMount() {
	this.props.focusFetch();

	this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
	this.createDataSource(nextProps)
    }

    createDataSource({ focus_entries }) {
	const ds = new ListView.DataSource({
	    rowHasChanged: (r1, r2) => r1 !== r2
	})

	this.dataSource = ds.cloneWithRows(focus_entries)
    }

    renderRow(focus) {
	return <ListItemFocus focus={focus} />
    }
    
    render() {
	return (
	    <ListView
	      enableEmptySections
	      dataSource={this.dataSource}
	      renderRow={this.renderRow}
	    />
	)
    }
}

const mapStateToProps = state => {
    const focus_entries = _.map(state.focus_entries, (val, uid) => {
	return { ...val, uid}
    })

    return { focus_entries }
}

export default connect(mapStateToProps, { focusFetch })(FocusList);
