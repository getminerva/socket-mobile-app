window.BluetoothAddView = React.createClass({
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
