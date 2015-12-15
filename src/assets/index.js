// var React = require('react');
// var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

// VIEWS
var HomeView = require('./views/HomeView.jsx');
var BluetoothAddView = require('./views/BluetoothAddView.jsx');

const App = React.createClass({
	render: function() {
		return (
			<div id='app'>
				{this.props.children}
			</div>
		);
	}
})

ReactDOM.render((
	<Router>
		<Route path='/' component={App}>
			<Route path='home' component={HomeView} />
			<Route path='add' component={BluetoothAddView} />
		</Route>
	</Router>
), document.body);
