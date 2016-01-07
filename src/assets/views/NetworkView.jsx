var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;

var OptionsView = React.createClass({
	contextTypes:  {
		'bff': React.PropTypes.object
	},
	changeNetworkId: function(ev) {
		console.log("Changing Network ID...");
		// TODO: use dialog
	},
	changeNetworkPw: function(ev) {
		console.log("Changing Network Password...");
		// TODO: use dialog
	},
	componentDidMount: function() {
		document.querySelector('.item-network-id').addEventListener('touchend', this.changeNetworkId);
		document.querySelector('.item-network-pw').addEventListener('touchend', this.changeNetworkPw);
	},
	render: function() {
		return (
			<div>
				<Header>
					<BackButton>Back</BackButton>
					<div className='title'>Network Settings</div>
				</Header>
				<div className='content has-header'>
					<div className='list'>
						<div className='item item-network-id'>
							Change Network SSID
						</div>
						<div className='item item-network-pw'>
							Change Network Password
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = OptionsView
