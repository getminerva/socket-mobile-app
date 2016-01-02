var React = require('react');
var Link = require('react-router').Link;
var Header = require('./Utilities.jsx').Header;
var SocketList = require('../js/components/SocketList.jsx').SocketList;
var BFF = require('../js/services/BFF.js');

var HomeView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'items': []
		});
	},
	componentDidMount: function() {
		var that = this;
		this.context.bff.socketService.getAll().then(function(sockets) {
			that.setState({'items': sockets});
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		return (
			<div>
				<Header>
					<div className='title'>Socket</div>
					<Link
						to='/add'
						className='button button-clear icon ion-plus'></Link>
					<Link
						to='/options'
						className='button button-clear icon ion-gear-b'></Link>
				</Header>
				<div className="content has-header">
					<SocketList items={this.state.items} history={this.props.history}/>
				</div>
			</div>
		);
	}
});

module.exports = HomeView;
