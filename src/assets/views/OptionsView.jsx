var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;
var BFF = require('../js/services/BFF.js');

var OptionsView = React.createClass({
	getDefaultProps: function() {
		return ({
			'authService': new BFF()
		});
	},
	handleLogout: function(ev) {
		 if (confirm("Are you sure you want to logout?")) {
			 this.props.authService.logout();
			 this.props.history.push('/');
		 }
	},
	componentDidMount: function() {
		document.querySelector('.item-logout').addEventListener('touchstart', this.handleLogout);
	},
	render: function() {
		return (
			<div>
				<Header>
					<BackButton history={this.props.history}>Back</BackButton>
					<div className='title'>Options</div>
				</Header>
				<div className='content has-header'>
					<div className='list'>
						<div className='item item-divider'>User Info</div>
						<div className='item'>
							Change Username
						</div>
						<div className='item'>
							Change Password
						</div>
						<div className='item item-logout'>
							Logout
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = OptionsView