import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import FocusList from './components/FocusList';
import FocusCreate from './components/FocusCreate';
import FocusDetail from './components/FocusDetail';
import DailyVideo from './components/DailyVideo';
import Menu from './components/Menu';
import Quote from './components/Quote';

const RouterComponent = () => {
    return (
	<Router>
	  <Scene key="root" hideNavBar>
	    <Scene key="auth">
	      <Scene key="login" component={LoginForm} title="Please login" initial />
	    </Scene>

	    <Scene key="main">
	      <Scene key="menu" component={Menu} title="Menu" initial />
	      <Scene
		onRight={() => Actions.focusCreate()}
		rightTitle="Add"
		key="focusList"
		component={FocusList}
		title="Your Focus List"
		/>
	      <Scene
		key="focusCreate"
		component={FocusCreate}
		title="Create New Focus"
		/>
	      <Scene
		onRight={() => Actions.focusEdit()}
		rightTitle="Edit"
		key="focusDetail"
		component={FocusDetail}
		title="Focus Detail View"
		/>
	      <Scene
		key="dailyVideo"
		component={DailyVideo}
		title="Daily Video Capture"
		/>
	      <Scene
		key="dailyQuote"
		component={Quote}
		title="Daily Quote" />
	    </Scene>

	  </Scene>
	</Router>
    )
}

export default RouterComponent;
