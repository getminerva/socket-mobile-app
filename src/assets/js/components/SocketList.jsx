var React = require('react');
var ReactDOM = require('react-dom');
var Range = require('./Common.jsx').Range;

var SocketStateIndicator = React.createClass({
	getDefaultProps: function() {
		return ({
			'on': false,
		});
	},
	render: function() {
		var icon = 'state icon ion-record ';
		return (
			<i className={ icon + (this.props.on ? 'state-on': 'state-off') }></i>
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
			<div className='state-icons'>
				<span className={icp + (this.props.proximity ? 'dark' : '')}></span>
				<span className={ica + (this.props.alarm ? 'dark' : '')}></span>
				<span className={icn + (this.props.notification ? 'dark' : '')}></span>
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
			'toggled': false
		});
	},
	getInitialState: function() {
		return ({
			curBrightness: 50,
			prvBrightness: 0
		});
	},
	changeBrightness: function(ev) {
		var level = ev.target.value;
		// console.log(level);
		// [TODO] Try it via BT

		// [TODO] Try it via web (if away)

		// Update backend
		var sId = parseInt(this.props.id);
		var that = this;
		this.context.bff.socketService.setBrightness(sId, level).then(function(result) {
			// Update view
			that.setState({'curBrightness' : level});
		}, function(error) {
			console.log(error);
		});
	},
	handleDblTap: function(ev) {
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

		mc.on('sgl-tap', this.props.handleSglTap);
		mc.on('dbl-tap', this.handleDblTap);
		mc.on('press', this.handlePress);
	},
	render: function() {
		var range;
		if (this.props.toggled) {
			range = (
				<Range
					value={this.state.curBrightness}
					onChange={this.changeBrightness}
				/>
			);
		}
		return (
			<li className="item item-clickable">
				<SocketStateIndicator on={(this.state.curBrightness > 0)} />
				{this.props.nickName}
				<SocketItemIcons
					proximity={this.props.proximity}
					alarm={this.props.alarm}
					notification={this.props.notification}
				/>
				{range}
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
	getInitialState: function() {
		return ({
			'itemToggled': -1		// -1 means nothing is toggled
		});
	},
	handleSglTap: function(i) {
		var itemToggled = this.state.itemToggled;
		if (itemToggled != -1 && itemToggled == i) {
			this.setState({'itemToggled' : -1});
		} else {
			this.setState({'itemToggled' : i});
		}
	},
	render: function() {
		var that = this;
		var listItems = this.props.sockets.map(function(socket, i) {
			return (
				<SocketListItem
					key={i}
					id={socket.id}
					nickName={socket.nickName}
					macId={socket.macId}
					proximity={socket.proximity}
					alarm={socket.alarm}
					notification={socket.notification}
					toggled={that.state.itemToggled == i}
					handleSglTap={that.handleSglTap.bind(that, i)}
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
