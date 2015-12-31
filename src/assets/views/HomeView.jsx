var React = require('react');
var Link = require('react-router').Link;

var BFF = require('../js/services/BFF.js');
var SocketList = require('../js/components/SocketList.jsx').SocketList;
var Header = require('./Utilities.jsx').Header;

var HomeView = React.createClass({
	getDefaultProps: function() {
		return ({
			'service': new BFF().socketService	// This shit's necessary
		});
	},
	render: function() {
		var items = [];
		this.props.service.getAll().done(function(sockets) {
			items = sockets;
		});
		return (
			<div>
				<Header color='energized'>
					<div className='title'>Socket</div>
					<Link
						to='/add'
						className='button button-clear icon ion-plus'></Link>
					<Link
						to='/options'
						className='button button-clear icon ion-gear-b'></Link>
				</Header>
				<div className="content has-header">
					<SocketList items={items} history={this.props.history}/>
				</div>
			</div>
		);
	}
});

module.exports = HomeView;
