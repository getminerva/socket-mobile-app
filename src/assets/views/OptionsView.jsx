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
	handleLogout: function() {
		this.props.authService.logout();
		this.props.history.push('/');
	},
	render: function() {
		return (
			<div>
				<Header color='energized'>
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
						<div className='item' onClick={this.handleLogout}>
							Logout
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = OptionsView
