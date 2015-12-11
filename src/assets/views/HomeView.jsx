window.HomeView = React.createClass({
	getDefaultProps: function() {
		return ({
			'listService': null		// This shit's necessary
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
				<header className='bar bar-standard bar-nav'>
					<h1 className='title'>Socket</h1>
					<a href="#add-device">
						<span className='pull-right icon icon-plus'></span>
					</a>
				</header>
				<div className="content">
					<SocketList items={items} />
				</div>
			</div>
		);
	}
});
