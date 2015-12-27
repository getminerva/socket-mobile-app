var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

// VIEWS
var HomeView = require('./views/HomeView.jsx');
var SocketViewLoader = require('./views/SocketView.jsx').SocketViewLoader;
var BluetoothAddView = require('./views/BluetoothAddView.jsx');

const App = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
})

ReactDOM.render((
	<Router>
		<Route path='/' component={App}>
			<IndexRoute component={HomeView} />
				<Route path='/socket/:socketId' component={SocketViewLoader} />
			<Route path='add' component={BluetoothAddView} />
		</Route>
	</Router>
), document.getElementById('app'));
