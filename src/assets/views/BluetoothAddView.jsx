var React = require('react');
var Link = require('react-router').Link;

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
					<Link to="/">
						<a>
							<span className='pull-left icon icon-left icon-nav'></span>
						</a>
					</Link>
				</header>
				<div className="content">
					<button className="btn btn-positive btn-outlined">Tap</button>
					<p>to discover new devices.</p>
				</div>
			</div>
		);
	}
});

module.exports = BluetoothAddView;
