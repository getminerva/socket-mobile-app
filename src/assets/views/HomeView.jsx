var React = require('react');
var Link = require('react-router').Link;

var BFF = require('../js/services/BFF.js');
var SocketList = require('../js/components/SocketList.jsx').SocketList;

var HomeView = React.createClass({
	getDefaultProps: function() {
		return ({
			'listService': new BFF().socketService	// This shit's necessary
		});
	},
	render: function() {
		// Get list from service
		var items = [];

		if (this.props.listService) {
			this.props.listService.getAll().done(function(sockets) {
				// console.log(sockets);
				items = sockets;
			});
		}

		return (
			<div>
				<header className='bar bar-nav'>
					<h1 className='title'>Socket</h1>
					<Link to='/add'>
						<span className='pull-right icon ion-plus'></span>
					</Link>
				</header>
				<div className="content">
					<SocketList items={items} />
				</div>
			</div>
		);
	}
});

module.exports = HomeView;
