var React = require('react');

var Toggle = React.createClass({
	getInitialState: function() {
		return ({
			'checked': false
		});
	},
	render: function() {

		return (
			<label className="toggle">
				<input id='scan-btn' type="checkbox" />
				<div className="track">
					<div className="handle"></div>
				</div>
			</label>
		);
	}
});

module.exports = {
	Toggle: Toggle
}
