var React = require('react');
var BackButton = require('./Utilities.jsx').BackButton;
var Toggle = require('../js/components/Common.jsx').Toggle;

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
				<h1>this.props.name</h1>
				<span>this.props.id</span>
			</li>
		);
	}
});

var BluetoothAddView = React.createClass({
	getInitialState: function() {
		return ({
			'devices': []
		});
	},
	scanForDevices: function() {
		console.log("Started scanning...");
		// TODO

		if (ble) {
			if (ble.isEnabled()) {
				var devices = this.state.devices
				ble.startScan([], function(device) {
					devices.push(device);
				})
			} else {
				// TODO: Enable that shit
			}
		} else {
			// Sorry, no support for BLE or it doesn't exist
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
		if (ev.target.checked) {
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
				<div className='bar bar-header bar-light'>
					<BackButton history={this.props.history}>Cancel</BackButton>
					<div className="title">Discover</div>
				</div>
				<div className="content has-header">
					<ul className="list">
						<Toggle
							color='energized'
							onChange={this.handleChange}>Scan for new Devices
						</Toggle>
						<li className='item item-divider'>Detected devices</li>
						{items}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = BluetoothAddView;
