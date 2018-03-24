import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import DailyVideo from './components/DailyVideo';

const RouterComponent = () => {
    return (
	<Router>
	  <Scene key="root" hideNavBar>
	    <Scene key="auth">
	      <Scene key="login" component={LoginForm} title="Please login" initial />
	    </Scene>

	    <Scene key="main">
	      <Scene
		key="dailyVideo"
		component={DailyVideo}
		title="Daily Video Capture"
		/>
	    </Scene>

	  </Scene>
	</Router>
    )
}

export default RouterComponent;
