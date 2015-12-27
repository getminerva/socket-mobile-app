var React = require('react');
var BackButton = require('./Utilities.jsx').BackButton;

var SocketView = React.createClass({
	getDefaultProps: function() {
		return ({
			'name': 'undefined',
		});
	},
	render: function() {
		return (
			<div>
				<div className='bar bar-header bar-light'>
					<BackButton history={this.props.history}/>
				</div>
				<ul className='list'>
					<li className='item'>
					{this.props.name}
					</li>
					<li className="item range range-positive">
						<i className="icon ion-ios-sunny-outline"></i>
						<input type="range" name="volume" min="0" max="100" value="33" />
						<i className="icon ion-ios-sunny"></i>
					 </li>
					<li className='item item-divider'></li>
					<li className='item item-toggle'>
						Proximity Sense
						<label className="toggle">
							<input id='scan-btn' type="checkbox" />
							<div className="track">
								<div className="handle"></div>
							</div>
						</label>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = SocketView
