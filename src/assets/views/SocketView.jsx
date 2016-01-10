var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;
var RangeItem = require('../js/components/Common.jsx').RangeItem;
var ToggleItem = require('../js/components/Common.jsx').ToggleItem;
var TextInputItem = require('../js/components/Common.jsx').TextInputItem;

var SocketView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getDefaultProps: function() {
		return ({
			'params': {
				'socketId': 0
			}
		});
	},
	getInitialState: function() {
		return ({
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'originalName': 'undefined',
			'nickName': 'undefined',
			'rssi': 0,
			'curBrightness': 75,
			'prvBrightness': 0,
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
		this.context.bff.socketService.setBrightness(sId, level).then(function(result) {
			// Update view
			that.setState({'curBrightness' : level});
		}, function(error) {
			console.log(error);
		});
	},
	changeProximity: function(ev) {
		var checked = ev.target.checked;
		console.log(checked);
		// [TODO] Try it via BT

		// Try it via web (if away)

		// Update backend
		var sId = parseInt(this.props.params.socketId);
		var that = this;
		this.context.bff.socketService.setProximity(sId, checked).then(function(result) {
			// Update app
			console.log(result);
			that.setState({'proximity' : checked});
		}, function(error) {
			console.log(error);
		});
	},
	handleNameChange: function(ev) {
		this.setState({'nickName': ev.target.value});
	},
	submitNameChange: function(ev) {
		ev.preventDefault();
		var newName = this.state.nickName;
		if (newName != this.state.originalName) {
			// Verify name change is fine.
			confirm('Are you sure to want to change \'' + this.state.originalName + '\' to \'' + newName + '\'?' , function (btn) {
				if (btn == 1) {
					// If so, do it
					//  [TODO] Update API
					this.setState({'originalName': this.state.nickName});
				} else {
					// [TODO] Else, change it back to the original
					this.setState({'nickName': this.originalName });
				}
			}, "Rename Socket", ["Yes", "No"]);
		} else {
			document.querySelector('.input-name').blur();
		}
	},
	deleteSocket: function(ev) {
		confirm('Are you sure you want to remove ' + this.state.originalName + '? This action cannot be undone.' function(btn) {
			// TODO
			if (btn == 1) {
				console.log('Deleting ' + this.state.originalName + '...');
			}
		}, "Remove Socket", ['Remove', 'Cancel']);
	},
	componentWillMount: function() {
		// Load the socket info from API
		var sId = parseInt(this.props.params.socketId);
		var that = this;
		this.context.bff.socketService.findById(sId).then(function(socketInfo) {
			// console.log(socketInfo);
			that.setState({
				'originalName': socketInfo.nickName,
				'nickName': socketInfo.nickName,
				'curBrightness': socketInfo.curBrightness,
				'proximity': socketInfo.proximity
			});
		}, function(error) {
			console.log(error);
		});
	},
	componentDidMount: function() {
		document.querySelector('.button-close').addEventListener('touchend', this.deleteSocket);
	},
	render: function() {
		return (
			<div>
				<Header>
					<BackButton history={this.props.history}>Back</BackButton>
					<button className='button button-close pull-right icon ion-close'></button>
				</Header>
				<div className='content has-header'>
					<ul className='list'>
						<form className='item item-input' onSubmit={this.submitNameChange}>
							<span className='input-label'>Name</span>
							<input type='text'
								className='input-name text-right'
								value={this.state.nickName}
								onChange={this.handleNameChange}
							/>
						</form>
						<div className='item'>
							MAC Address
							<span className='item-note'>
								{this.state.uuid}
							</span>
						</div>
						<li className='item stable-bg'>
							Brightness
						</li>
						<RangeItem
							color='energized'
							leftIcon='ion-ios-lightbulb'
							rightIcon='ion-ios-lightbulb-outline'
							value={this.state.curBrightness}
							onChange={this.changeBrightness}
						/>
						<ToggleItem
							color='balanced'
							className='stable-bg'
							checked={this.state.proximity}
							onChange={this.changeProximity}>
							Proximity Sense
						</ToggleItem>
						<label className='item item-input'>
							<span className='input-label'>
								Activation distance
							</span>
							<input type='number' size='3'/>
						</label>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = {
	SocketView: SocketView,
};
