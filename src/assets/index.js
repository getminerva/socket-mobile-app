var React = require('react');
var ReactDOM = require('react-dom');
var Rtr = require('react-router');
var Router = Rtr.Router;
var Route = Rtr.Route;
var Link = Rtr.Link;

// COMPONENTS
require('./js/components/SocketList');
require('./js/components/DeviceList');

// VIEWS
require('./views/HomeView');
require('./views/BluetoothAddView');

ReactDOM.render((
	<Router>
		<Route path='/' component={HomeView}>
			<Route path='add' component={BluetoothAddView} />
		</Route>
	</Router>
), document.getElementById('app'));
// Needs <Link ></Link> instead of <a />'

// var bff = new BFF();
//
// ReactDOM.render(
// 	<HomeView listService={bff.socketService}/>, document.getElementById('app'));
