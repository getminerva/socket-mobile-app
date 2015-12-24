var React = require('react');

var BluetoothAddView = React.createClass({
	defaultProps: {
		'listService': null		// This shit's necessary
	},
	scanForDevices: function() {
		var devices = []

		ble.scan([], 60, function(device) {
			devices.push(device);
		}, function(error) {
			console.log('Unable to find devices.');
		});

	},
	componentDidMount: function() {
		// Attach the back button link
		var backButton = document.getElementById('back-btn');
		var scanButton = document.getElementById('scan-btn');

		backButton.addEventListener('click', this.props.history.goBack, false);
		scanButton.addEventListener('click', this.scanForDevices, false);
	},
	render: function() {
		return (
			<div>
				<header className='bar bar-standard bar-nav'>
				<a id="back-btn">
					<span className='pull-left icon icon-left icon-nav'></span>
				</a>
				</header>
				<div className="content">
					<button id="scan-btn" className="btn btn-positive btn-outlined">Tap</button>
					<p>to discover new devices.</p>
				</div>
			</div>
		);
	}
});

module.exports = BluetoothAddView;
