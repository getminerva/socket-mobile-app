var React = require('react');
var Link = require('react-router').Link;

var BFF = require('../js/services/BFF.js');
var SocketList = require('../js/components/SocketList.jsx').SocketList;

var HomeView = React.createClass({
	getDefaultProps: function() {
		return ({
			'service': new BFF().socketService	// This shit's necessary
		});
	},
	render: function() {
		// Get list from service
		var items = [];

		this.props.service.getAll().done(function(sockets) {
			// console.log(sockets);
			items = sockets;
		});

		return (
			<div>
				<div className='bar bar-header bar-light'>
					<div className='title'>Socket</div>
					<Link to='/add' className='button button-clear button-positive icon ion-plus'></Link>
				</div>
				<div className="content has-header">
					<SocketList items={items} history={this.props.history}/>
				</div>
			</div>
		);
	}
});

module.exports = HomeView;
