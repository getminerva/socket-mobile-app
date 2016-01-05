var React = require('react');
var ReactDOM = require('react-dom');
var BFF = require('../services/BFF.js');

var StateIndicator = React.createClass({
	getDefaultProps: function() {
		return ({
			'on': false,
		});
	},
	render: function() {
		var icon = 'icon ion-record ';
		return (
			<i className={ (this.props.on) ? icon + 'state-on': icon + 'state-off'}></i>
		);
	}
});

var SocketItemIcons = React.createClass({
	getDefaultProps: function() {
		return ({
			'proximity': false,
			'alarm': false,
			'notification': false
		});
	},
	render: function() {
		var icp = 'icon ion-android-locate ';
		var ica = 'icon ion-android-alarm-clock ';
		var icn = 'icon ion-android-notifications ';
		return (
			<div>
				<span className={this.props.proximity ? icp + 'icon-active' : icp + 'icon-inactive'}></span>
				<span className={this.props.alarm ? ica + 'icon-active' : ica + 'icon-inactive'}></span>
				<span className={this.props.notification ? icn + 'icon-active' : icn + 'icon-inactive'}></span>
			</div>
		);
	}
});

var SocketListItem = React.createClass({
	contextTypes: {
		'router': React.PropTypes.object,
		'bff': React.PropTypes.object
	},
	getDefaultProps: function() {
		return ({
			'id': 0,
			'nickName': 'undefined',
			'macId': 'xx:xx:xx:xx',
			'proximity': false,
			'alarm': false,
			'notification': false,
		});
	},
	getInitialState: function() {
		return ({
			curBrightness: 50,
			prvBrightness: 0
		});
	},
	handleTap: function(ev) {
		if (ev.tapCount == 2) {
			this.handleDblTap(ev);
		} else {
			this.handleSglTap(ev);
		}
	},
	handleSglTap: function(ev) {
		// TODO: Toggle brightness slider
		console.log("Toggle brightness slider");
	},
	handleDblTap: function(ev) {
		// TODO: Toggle brightness
		console.log("Toggle brightness");
		var oldBrightness = this.state.curBrightness;
		var newBrightness = (this.state.curBrightness > 0 ) ? 0 : this.state.prvBrightness;

		// BTLE Flow
		// ble.connect(this.props.macId, function(success) {
		// 	// On success, client & server data update flow
		// 	ble.write(this.props.macId, service_uuid, characteristic_uuid, data, function(success) {
		//
		// 	}, function(failure) {
		// 		alert("Error writing to " + this.props.nickName + ".");
		// 	});
		// }, function(error) {
		// 	alert("Error connecting to " + this.props.nickName + " :(");
		// });

		// Or Update via web

		// Update backend
		var that = this;
		this.context.bff.socketService.setBrightness(this.props.id, newBrightness).then(function(socketInfo) {
			// Update view
			that.setState({
				'curBrightness': newBrightness,
				'prvBrightness': oldBrightness,
			});
		}, function(error) {
			console.log(error);
		});
	},
	handlePress: function(ev) {
		console.log("Press brightness");
		this.props.history.push('/socket/' + this.props.id);
	},
	componentDidMount: function() {
		// Fetch Socket Info
		var that = this;
		this.context.bff.socketService.findById(this.props.id).then(function(socketInfo) {
			that.setState({
				'nickName': socketInfo.nickName,
				'curBrightness': socketInfo.curBrightness,
				'prvBrightness': socketInfo.prvBrightness,
				'proximity': socketInfo.proximity,
				'alarm': socketInfo.alarm,
				'notification': socketInfo.notification
			});
		}, function(error) {
			console.log(error);
		});

		// Setup touch handlers
		var opts = {}
		var mc = new Hammer.Manager(ReactDOM.findDOMNode(this));

		mc.add(new Hammer.Tap({event: 'dbl-tap', taps: 2}));
		mc.add(new Hammer.Tap({event: 'sgl-tap'}));
		mc.add(new Hammer.Press({event: 'press'}));

		mc.get('dbl-tap').recognizeWith('sgl-tap');
		mc.get('sgl-tap').requireFailure('dbl-tap');

		mc.on('sgl-tap', this.handleSglTap);
		mc.on('dbl-tap', this.handleDblTap);
		mc.on('press', this.handlePress);
	},
	render: function() {
		return (
			<li className="item item-clickable" key={this.props.key}>
				<StateIndicator on={(this.state.curBrightness > 0)} />
				<h4>
					{this.props.nickName}
				</h4>
				<SocketItemIcons
					proximity={this.props.proximity}
					alarm={this.props.alarm}
					notification={this.props.notification}
				/>
			</li>
		)
	}
});

var SocketList = React.createClass({
	getDefaultProps: function() {
		return ({
			'sockets': [],
			'history': null
		});
	},
	render: function() {
		var history = this.props.history;

		var key = 0;
		var listItems = this.props.sockets.map(function(socket) {
			key += 1;
			return (
				<SocketListItem
					key={key}
					id={socket.id}
					nickName={socket.nickName}
					macId={socket.macId}
					proximity={socket.proximity}
					alarm={socket.alarm}
					notification={socket.notification}
					history={history}
				/>
			);
		});

		return (
			<ul className="list">
				{ listItems }
			</ul>
		);
	}
});

module.exports = SocketList
