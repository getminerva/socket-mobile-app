var DeviceItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'nickName': 'Sockrates',
			'macId': '00:1a:2b:3c:',
		});
	},
	render: function() {
		return (
			<li className="table-view-cell">
				<h4>{ this.props.nickName }</h4>
				<p>{ this.props.macId }</p>
			</li>
		)
	}
});

var DeviceList = React.createClass({
	getDefaultProps: function() {
		return ({
			'items': []
		});
	},
	render: function() {
		// Map the items in props to the ul
		var listItems = this.props.items.map(function(item) {
			return (
				<DeviceItem
					nickName={item.nickName}
					macId={item.macId}
				/>
			);
		});
		return (
			<ul className="table-view">
				{ listItems }
			</ul>
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
		var icp = 'ion icon ion-android-locate ';
		var ica = 'ion icon ion-android-alarm-clock ';
		var icn = 'ion icon ion-android-notifications ';
		return (
			<div>
				<span className={this.props.proximity ? icp + 'icon-active' : icp + 'icon-inactive'}></span>
				<span className={this.props.alarm ? ica + 'icon-active' : ica + 'icon-inactive'}></span>
				<span className={this.props.notification ? icn + 'icon-active' : icn + 'icon-inactive'}></span>
			</div>
		);
	}
})

var SocketItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'nickName': 'Sockrates',
			'macId': '00:1a:2b:3c:',
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

		// BTLE Flow(
		ble.connect(this.props.macId, function(success) {
			// On success, client & server data update flow
			ble.write(this.props.macId, service_uuid, characteristic_uuid, data, function(success) {

			}, function(failure) {
				alert("Error writing to " + this.props.nickName + ".");
			});
		}, function(error) {
			alert("Error connecting to " + this.props.nickName + " :(");
		});

	},
	handlePress: function(ev) {
		// TODO: Go to individual page
		console.log("Press brightness");
	},
	componentDidMount: function() {
		// Setup touch handlers
		var opts = {}
		var mc = new Hammer.Manager(this.getDOMNode());

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
			<li className="table-view-cell">
				<h4>{ this.props.nickName }</h4>
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
			'items': []
		});
	},
	render: function() {
		// Map the items in props to the ul
		var listItems = this.props.items.map(function(item) {
			return (
				<SocketItem
					nickName={item.nickName}
					macId={item.macId}
					proximity={item.proximity}
					alarm={item.alarm}
					notification={item.notification}
				/>
			);
		});
		return (
			<ul className="table-view">
				{ listItems }
			</ul>
		);
	}
});

var BluetoothAddView = React.createClass({
	getDefaultProps: function() {
		return ({
			'listService': null		// This shit's necessary
		});
	},
	render: function() {
		return (
			<div>
				<header className='bar bar-standard bar-nav'>
					<a href="#">
						<span className='pull-left icon icon-left icon-nav'></span>
					</a>
				</header>
				<div className="content">
					<button className="btn btn-positive btn-outlined">Tap</button>
					<p>to discover new devices.</p>
				</div>
			</div>
		);
	}
});

var HomeView = React.createClass({
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
				<header className='bar bar-nav'>
					<h1 className='title'>Socket</h1>
					<a href="#add-device">
						<span className='pull-right icon ion-plus'></span>
					</a>
				</header>
				<div className="content">
					<SocketList items={items} />
				</div>
			</div>
		);
	}
});

// import { Router, Route, Link } from 'react-router'

var bff = new BFF();

ReactDOM.render(<HomeView listService={bff.socketService}/>, document.getElementById('app'));
