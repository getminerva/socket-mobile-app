var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;
var ToggleItem = require('../components/Common.jsx').ToggleItem;

var DiscoveredItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'name': 'undefined',
			'id': 'xx-xx-xx-xx-xx-xx',
			'rssi': 0
		});
	},
	render: function() {
		return (
			<li className='item'>
				this.props.name
				<div className='item-note'>this.props.id</div>
			</li>
		);
	}
});

var BluetoothAddView = React.createClass({
	getInitialState: function() {
		return ({
			'searching': false,
			'devices': []
		});
	},
	scanForDevices: function() {
		console.log("Started scanning...");

		if (ble) {
			if (ble.isEnabled()) {
				var devs = [];
				var that = this;
				ble.startScan([], function(device) {
					devs.push(device);
					that.setState({'devices': devs});
				});
			} else {
				confirm(function(btn) {
					if (btn==1) {
						// TODO: Take them to settings and enable that shit
						console.log("Going to settings...");
					}
				}, "Enable bluetooth", ["Settings", "Cancel"] )
			}
		} else {
			// Sorry, no support for BLE or it doesn't exist
			console.log("Sorry, no support for BLE.")
		}
	},
	stopScanForDevices: function() {
		console.log('Stopped scanning');
		// TODO

		if (ble) {
			// TODO
			ble.stopScan(function() {
				console.log("Finished")
			});
		} else {
			// Sorry, no support for BLE or it doesn't exist
		}
	},
	handleChange: function(ev) {
		// console.log(ev);
		this.setState({'searching': ev.target.checked});
		if (this.state.searching) {
			this.scanForDevices();
		} else {
			this.stopScanForDevices();
		}
	},
	render: function() {
		var items = this.state.devices.map(function(dev) {
			return (
				<DiscoveredItem
					name={dev.name}
					id={dev.id}
					rssi={dev.rssi}
				/>
			);
		});

		return (
			<div>
				<Header>
					<BackButton>Cancel</BackButton>
					<div className="title">Discover</div>
				</Header>
				<div className="content has-header">
					<ul className="list">
						<ToggleItem
							color='energized'
							value={this.props.searching}
							onChange={this.handleChange}>
							Scan for new Devices
						</ToggleItem>
						<li className='item item-divider'>Detected devices</li>
						{items}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = BluetoothAddView;
