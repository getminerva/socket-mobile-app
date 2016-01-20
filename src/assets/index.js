var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;

// VIEWS
var SocketListView = require('./views/SocketListView.jsx');
var SocketView = require('./views/SocketView.jsx').SocketView;
var GroupListView = require('./views/GroupListView.jsx');
var GroupView = require('./views/GroupView.jsx');
var LoginView = require('./views/LoginView.jsx');
var RegisterView = require('./views/RegisterView.jsx');
var OptionsView = require('./views/OptionsView.jsx');
var NetworkView = require('./views/NetworkView.jsx');
var BluetoothAddView = require('./views/BluetoothAddView.jsx');

// services
var BFF = require('./services/BFF.js');
const Bff = new BFF();

const App = React.createClass({
	childContextTypes: {
		'router': React.PropTypes.object,
		'bff': React.PropTypes.object,
		'hideKeyboardItems': React.PropTypes.function
		'showKeyboardItems': React.PropTypes.function
	},
	getDefaultProps: function() {
		return ({
			'bff': Bff
		});
	},
	getChildContext: function() {
		return ({
			'router': this.props.history,
			'bff': this.props.bff,
			'hideKeyboardItems': this.hideKeyboardItems,
			'showKeyboardItems': this.showKeyboardItems
		});
	},
	hideKeyboardItems: function(e) {
		var el = document.querySelector('#app-container');
		el.className += " keyboard-open";
	},
	showKeyboardItems: function(e) {
		var el = document.querySelector('#app-container');
		el.className = el.className.replace( /(?:^|\s)keyboard-open(?!\S)/g , '' );
	},
	setAppBackground: function(e) {
		// TODO: Make app brackground info here
		// document.querySelector('');
	},
	render: function() {
		return (this.props.children);
	}
});

var requireAuth = function(nextState, replaceState) {
	if (!Bff.loggedIn()) {
		replaceState({ nextPathName : nextState.location.pathname}, '/login');
	}
}

// CORDOVA BINDING
document.addEventListener('deviceready', function() {
	if (cordova.platformId == 'android') {
		StatusBar.backgroundColorByHexString("#997800");
	}
	navigator.splashscreen.hide();
	window.alert = navigator.notification.alert;
	window.confirm = navigator.notification.confirm;
	window.prompt = navigator.notification.prompt;
});

ReactDOM.render((
	<Router>
		<Route path='/' component={App}>
			<Route path='login' component={LoginView} />
			<Route path='register' component={RegisterView} />
			<IndexRoute component={SocketListView} onEnter={requireAuth}/>
				<Route path='socket/:socketId' component={SocketView} />
			<Route path='groups' component={GroupListView} onEnter={requireAuth}/>
				<Route path='groups/:groupId' component={GroupView} />
			<Route path='options' component={OptionsView} onEnter={requireAuth} />
				<Route path='options/network' component={NetworkView} />
			<Route path='add' component={BluetoothAddView} />
		</Route>
	</Router>
), document.getElementById('app-container'));
