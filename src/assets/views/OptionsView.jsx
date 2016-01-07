var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;

var OptionsView = React.createClass({
	contextTypes:  {
		'router': React.PropTypes.object,
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'userName': ''
		});
	},
	handleLogout: function(ev) {
		var that = this;
		 confirm("Are you sure you want to logout?", function() {
			 that.context.bff.logout();
			 that.context.router.push('/');
		 }, "Logout");
	},
	handleNameChange: function(ev) {
		var newName = ev.target.value;
		this.setState({'userName': newName});
	},
	submitNameChange: function(ev) {
		ev.preventDefault();
		// Get the value
		confirm("Are you sure you want to change your username?", function(btn) {
			if (btn == 1) {
				var newName = ev.target.firstChild.value;
				// [TODO] Submit the change
			} else {
				// Set it back to original
				// TODO use session
				this.setState({'userName': 'admin'});
			}
			console.log(this.state.userName);
		}, "Change Username");
	},
	componentWillMount: function() {
		// [TODO] Get name from session
		// this.context.bff.userService()
		this.setState({'userName': 'admin'});
	},
	componentDidMount: function() {
		var that = this;
		document.querySelector('.item-logout').addEventListener('touchend', this.handleLogout);

		document.querySelector('.item-pass-word').addEventListener('touchend', function() {
			that.context.router.push('/options/password');
		});
		document.querySelector('.item-network').addEventListener('touchend', function () {
			that.context.router.push('/options/network');
		});
	},
	render: function() {
		return (
			<div>
				<Header>
					<BackButton>Back</BackButton>
					<div className='title'>Options</div>
				</Header>
				<div className='content has-header'>
					<div className='list'>
						<div className='item item-divider'>User</div>
						<div className="item item-input item-stacked-label">
							<span className="input-label">username</span>
							<form onSubmit={this.submitNameChange}>
								<input type="text"
									className='item-name'
									onChange={this.handleNameChange} value={this.state.userName}/>
							</form>
						</div>
						<div className='item item-pass-word'>
							Change Password
						</div>
						<div className='item item-logout'>
							Logout
						</div>
						<div className='item item-divider'>Network</div>
						<div className='item item-network'>
							Change Network Settings
						</div>
						<div className='item item-divider'>App</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = OptionsView
