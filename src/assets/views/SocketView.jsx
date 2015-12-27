var React = require('react');
var BackButton = require('./Utilities.jsx').BackButton;
var BFF = require('../js/services/BFF.js');

var SocketView = React.createClass({
	getDefaultProps: function() {
		return ({
			'name': 'undefined',
			'uuid': 'xx:xx:xx:xx'
		});
	},
	render: function() {
		return (
			<div>
				<div className='bar bar-header bar-light'>
					<BackButton history={this.props.history}/>
				</div>
				<div className='content has-header'>
					<ul className='list'>
						<li className='item'>
							<div className='row'>
								<div className='col'>
								</div>
								<div className='col col-75'>
									<ul className='list'>
										<label className="item item-input">
											<input type="text"
												value={this.props.name}
											/>
										</label>
										<li className='item'>
											{this.props.uuid}
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li className='item range range-positive'>
							<i className='icon ion-ios-sunny-outline'></i>
							<input type="range" name="brightness" min="0" max="100" value="33" />
							<i className='icon ion-ios-sunny'></i>
						 </li>
						<li className='item item-divider'></li>
						<li className='item item-toggle'>
							Proximity Sense
							<label className="toggle">
								<input type="checkbox" />
								<div className="track">
									<div className="handle"></div>
								</div>
							</label>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

var SocketViewLoader = React.createClass({
	getDefaultProps: function() {
		return ({
			'params': {
				'socketId': 0		// Need socketId to hit the API
			}
		});
	},
	getInitialState: function() {
		return ({
			'socket': {
				'name': 'undefined'
			}
		});
	},
	componentWillMount: function() {
		// TODO: Load the socket information from the API
		var ss = new BFF().socketService;
		var sId = parseInt(this.props.params.socketId);

		var that = this;
		ss.findById(sId).done(function(socket) {
			that.setState({
				socket: socket
			})
		})
	},
	render: function() {
		var socket = this.state.socket;
		return (
			<SocketView
				name={socket.name}
			/>
		);
	}
})

module.exports = {
	SocketView: SocketView,
	SocketViewLoader: SocketViewLoader
};
