var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;
var RangeItem = require('../js/components/Common.jsx').RangeItem;
var ToggleItem = require('../js/components/Common.jsx').ToggleItem;
var TextInputItem = require('../js/components/Common.jsx').TextInputItem;

var GroupView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getDefaultProps: function() {
		return ({
			'params': {
				'groupId': 0
			}
		});
	},
	getInitialState: function() {
		return ({
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'groupName': 'undefined',
			'curBrightness': 75,
			'prvBrightness': 0,
			'proximity': false,
			'sockets': []
		});
	},
	changeBrightness: function(ev) {
		// TODO: Change the brightness of the socket [real-time]
		var level = ev.target.value;
		console.log(level);
		// [TODO] Try it via BT

		// [TODO] Try it via web (if away)

		// Update backend
		var sId = parseInt(this.props.params.groupId);
		var that = this;
		this.context.bff.groupService.setBrightness(sId, level).then(function(result) {
			// Update view
			that.setState({'curBrightness' : level});
		}, function(error) {
			console.log(error);
		});
	},
	changeProximity: function(ev) {
		// TODO: Change the brightness of the socket [real-time]
		var checked = ev.target.checked;
		console.log(checked);
		// Try it via web

		// Update backend
		var sId = parseInt(this.props.params.groupId);
		var that = this;
		this.context.bff.groupService.setProximity(sId, checked).then(function(result) {
			// Update app
			console.log(result);
			that.setState({'proximity' : checked});
		}, function(error) {
			console.log(error);
		});
	},
	handleNameChange: function(ev) {
		this.setState({'groupName': ev.target.value});
	},
	submitNameChange: function(ev) {
		console.log(ev);

		// Verify name change is fine
		confirm('Are you sure to want to change \'' + this.state.nickName + '\' to \'' + newName + '\'?', function(btn) {
			var newName;

			if (btn == 1) {
				// OK
				//  [TODO] Update API
				newName = this.state.groupName;
			} else {
				// If not, change the value back to normal
				newName = 'bedroom';
			}
			this.setState({'groupName': newName});
		}, "Change Group Name?");
	},
	componentWillMount: function() {
		// Load the socket info from API
		var sId = parseInt(this.props.params.groupId);
		var that = this;
		this.context.bff.groupService.findById(sId).then(function(groupInfo) {
			// console.log(groupInfo);
			that.setState({
				'groupName': groupInfo.groupName,
				'curBrightness': groupInfo.curBrightness,
				'proximity': groupInfo.proximity
			});
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		var sockets = this.state.sockets.map(function(socket) {
			return (
				<div className='item'>
					<h4>socket.groupName</h4>
				</div>
			)
		});
		return (
			<div>
				<Header>
					<BackButton>Back</BackButton>
				</Header>
				<div className='content has-header'>
					<ul className='list'>
						<li className='item'>
							<form onSubmit={this.submitNameChange}>
								<TextInputItem
									value={this.state.groupName}
									onChange={this.handleNameChange}
								/>
							</form>
						</li>
						<RangeItem
							color='energized'
							leftIcon='ion-ios-lightbulb'
							rightIcon='ion-ios-lightbulb-outline'
							value={this.state.curBrightness}
							onChange={this.changeBrightness}
						/>
						<li className='item item-divider'></li>
						<ToggleItem
							color='energized'
							checked={this.state.proximity}
							onChange={this.changeProximity}
							>Proximity Sense
						</ToggleItem>
						<li className='item item-divider'>Sockets</li>
						{sockets}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = GroupView;
