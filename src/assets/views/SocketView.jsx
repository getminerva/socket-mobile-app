var React = require('react');
var BackButton = require('./Utilities.jsx').BackButton;
var BFF = require('../js/services/BFF.js');

var SocketView = React.createClass({
	getDefaultProps: function() {
		return ({
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'undefined',
			'rssi': 0,
			'curBrightness': 50,
			'proximity': false,
			'alarm': false,
			'notification': false
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
												defaultValue={this.props.nickName}
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
							<i className='icon ion-ios-lightbulb'></i>
							<input type="range" name="brightness" min="0" max="100" defaultValue={this.props.curBrightness} />
							<i className='icon ion-ios-lightbulb-outline'></i>
						 </li>
						<li className='item item-divider'></li>
						<li className='item item-toggle'>
							Proximity Sense
							<label className="toggle">
								<input type="checkbox" defaultChecked={this.props.proximity}/>
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
				'id': 0,
				'uuid': 'xx-xx-xx-xx-xx-xx',
				'macAddress': '00:00:00:00:00:00',
				'nickName': 'undefined',
				'rssi': 0,
				'curBrightness': 50,
				'proximity': false,
				'alarm': false,
				'notification': false
			}
		});
	},
	componentWillMount: function() {
		// TODO: Load the socket information from the API
		var ss = new BFF().socketService;
		var sId = parseInt(this.props.params.socketId);
		// console.log(this.props.params.socketId);

		var that = this;
		ss.findById(sId).done(function(socket) {
			console.log(socket);
			that.setState({
				socket: socket
			})
		});
	},
	render: function() {
		var dev = this.state.socket;
		return (
			<SocketView
				uuid={dev.uuid}
				macAddress={dev.macAddress}
				nickName={dev.nickName}
				rssi={dev.rssi}
				curBrightness={dev.curBrightness}
				proximity={dev.proximity}
				alarm={dev.alarm}
				notification={dev.notification}
				history={this.props.history}
			/>
		);
	}
})

module.exports = {
	SocketView: SocketView,
	SocketViewLoader: SocketViewLoader
};