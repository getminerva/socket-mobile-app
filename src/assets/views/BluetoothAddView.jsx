var React = require('react');

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
	componentDidMount: function() {
		// Attach the back button link
		var backButton = document.getElementById('back-btn');
		backButton.addEventListener('click', this.props.history.goBack, false);

		var scanButton = document.getElementById('scan-btn');
		var that = this;
		scanButton.addEventListener('click', function() {
			if (scanButton.checked) {
				that.scanForDevices();
			} else {
				that.stopScanForDevices();
			}
		});
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
					<a id="back-btn" className='button button-clear icon-left ion-chevron-left'>Back</a>
					<div className="title">Discover</div>
				</div>
				<div className="content has-header">
					<ul className="list">
						<li className='item item-toggle'>
							Search for new devices
							<label className="toggle">
								<input id='scan-btn' type="checkbox" />
								<div className="track">
									<div className="handle"></div>
								</div>
							</label>
						</li>
						<li className='item item-divider'>Detected devices</li>
						{items}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = BluetoothAddView;
