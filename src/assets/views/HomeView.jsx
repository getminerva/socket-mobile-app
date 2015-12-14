var React = require('react');
var Link = require('react-router').Link;

var HomeView = React.createClass({
	getDefaultProps: function() {
		return ({
			'listService': new BFF().socketService	// This shit's necessary
		});
	},
	getInitialState: function() {
		return ({
			'tab': 0
		});
	},
	render: function() {
		// Get list from service
		var items = [];

		if (this.props.listService) {
			this.props.listService.getAll().done(function(sockets) {
				items = sockets;
			});
		}

		return (
			<div>
				<header className='bar bar-nav'>
					<h1 className='title'>Socket</h1>
					<Link to='/add'>
						<a>
							<span className='pull-right icon ion-plus'></span>
						</a>
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