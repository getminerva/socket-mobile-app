var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;
var Range = require('../js/components/Common.jsx').Range;
var Toggle = require('../js/components/Common.jsx').Toggle;
var TextInputItem = require('../js/components/Common.jsx').TextInputItem;
var BFF = require('../js/services/BFF.js');

var SocketView = React.createClass({
	getDefaultProps: function() {
		return ({
			'service': new BFF().socketService,
			'params': {
				'socketId': 0
			}
		});
	},
	getInitialState: function() {
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
	changeBrightness: function(ev) {
		// TODO: Change the brightness of the socket [real-time]
		var level = ev.target.value;
		console.log(level);
		// [TODO] Try it via BT

		// [TODO] Try it via web (if away)

		// Update backend
		var sId = parseInt(this.props.params.socketId);
		var that = this;
		this.props.service.setBrightness(sId, level).then(function(result) {
			// Update app
			// console.log(result);
			that.setState({'curBrightness' : level});
		}, function(error) {
			console.log(error);
		});
	},
	changeProximity: function(ev) {
		// TODO: Change the brightness of the socket [real-time]
		var checked = ev.target.checked;
		console.log(checked);
		// [TODO] Try it via BT

		// Try it via web (if away)

		// Update backend
		var sId = parseInt(this.props.params.socketId);
		var that = this;
		this.props.service.setProximity(sId, checked).then(function(result) {
			// Update app
			console.log(result);
			that.setState({'proximity' : checked});
		}, function(error) {
			console.log(error);
		});
	},
	submitNameChange: function(ev) {
		// TODO: Change name of Socket
		console.log(ev);

		var code = (ev.keyCode) ? ev.keyCode : ev.which;
		console.log(code);

		if (code == 13) {
			// Verify name change is fine.
			alert('Are you sure to want to change \'' + this.state.nickName + '\' to \'' + newName + '\'?' );

			var confirm = false;
			if (confirm) {
				// If so, do it
				this.setState({'nickName': ev.target.value})
			} else {
				// If not, change the value back to normal
				ev.target.value = this.state.nickName;
			}
		}
	},
	componentWillMount: function() {
		// Load the socket info from API
		var sId = parseInt(this.props.params.socketId);
		// console.log(this.props.params.socketId);

		var that = this;
		this.props.service.findById(sId).done(function(newState) {
			that.replaceState(newState);
		});
	},
	render: function() {
		return (
			<div>
				<Header>
					<BackButton history={this.props.history}>Back</BackButton>
				</Header>
				<div className='content has-header'>
					<ul className='list'>
						<li className='item'>
							<div className='row'>
								<div className='col'>
								</div>
								<div className='col col-75'>
									<ul className='list'>
										<TextInputItem
											value={this.state.nickName}
											onChange={this.submitNameChange}
										/>
										<li className='item'>
											{this.state.uuid}
										</li>
									</ul>
								</div>
							</div>
						</li>
						<Range
							color='energized'
							leftIcon='ion-ios-lightbulb'
							rightIcon='ion-ios-lightbulb-outline'
							onChange={this.changeBrightness}
						/>
						<li className='item item-divider'></li>
						<Toggle
							color='energized'
							checked={this.state.proximity}
							onChange={this.changeProximity}>Proximity Sense</Toggle>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = {
	SocketView: SocketView,
};
