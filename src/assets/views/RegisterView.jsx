var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;

var RegisterView = React.createClass({
	contextTypes: {
		'router': React.PropTypes.object,
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'error': false,
			'errorMsg': '',
			'email': '',
			'userName': '',
			'passWord': '',
			'passWordConf': '',
			'pwMatch': true
		});
	},
	updateUserName: function(ev) {
		this.setState({'userName': ev.target.value})
	},
	updateEmail: function(ev) {
		this.setState({'email': ev.target.value})
	},
	updatePassWord: function(ev) {
		this.setState({'passWord': ev.target.value})
	},
	updatePassWordConf: function(ev) {
		this.setState({
			'passWordConf': ev.target.value,
			'pwMatch': this.state.passWord === ev.target.value,
		});
	},
	validateInputs: function() {
		// Check if all values are present
		var state = this.state;
		if (
			state.email.length == 0 ||
			state.userName.length == 0 ||
			state.passWord.length == 0 ||
			state.passWordConf.length == 0
		) {
			this.setState({
				'error': true,
				'errorMsg': "One or more values are missing."
			});
			return false;
		}
		// TODO: Check if e-mail has been used
		// TODO: Check if user exists

		// Check if passwords match
		if (!state.pwMatch) {
			this.setState({
				'error': true,
				'errorMsg': "Passwords don't match."
			});
			return false;
		}

		// Everything's A-OK
		this.setState({
			'error': false,
			'errorMsg': ''
		})
		return true;
	},
	handleRegister: function(ev) {
		ev.preventDefault();
		// Make sure all inputs are valid
		if (this.validateInputs()) {
			console.log("Registering...");
			var that = this;
			this.context.bff.userService.createUser({
				'email': that.state.email,
				'userName': that.state.userName,
				'passWord': that.state.passWord
			}).then(function(newUser) {
				// log em in
				that.context.bff.login(userName, passWord, function() {
					that.context.router.push('/');
				});
			}, function(error) {
				this.setState({
					'error': true,
					'errorMsg': error.message
				});
				console.log(error);
			});
		} else {
			console.log(this.state.errorMsg);
		}
	},
	componentDidMount: function() {
		// FIXME: change back to touchend after testing functions
		document.querySelector('#app-container').className = 'energized-bg';
		document.querySelector('.button-register').addEventListener('click', this.handleRegister);
	},
	componentWillUnmount: function() {
		document.querySelector('#app-container').className = '';
	},
	render: function() {
		return (
			<div className='app'>
				<Header color='clear'>
					<BackButton>Back</BackButton>
					<div className='title'>Register</div>
				</Header>
				<div className='content has-header'>
					<div className='row'>
						<div className='col text-center assertive'>
							{this.state.errorMsg}
						</div>
					</div>
					<div className='list list-inset'>
						<form onSubmit={this.handleRegister}>
							<label className='item item-input'>
								<input type='email'
									className='input-email'
									placeholder='E-mail'
									value={this.state.email}
									onChange={this.updateEmail}
									required/>
							</label>
							<label className='item item-input'>
								<input type='text'
									className='input-user-name'
									placeholder='Username'
									value={this.state.userName}
									onChange={this.updateUserName}
									required/>
							</label>
							<label className='item item-input'>
								<input type='password'
									className='input-pass-word'
									placeholder='Password'
									value={this.state.passWord}
									onChange={this.updatePassWord}
									required/>
							</label>
							<label className='item item-input'>
								<input type='password'
									className='input-pass-word-conf'
									placeholder='Confirm Password'
									value={this.state.passWordConf}
									onChange={this.updatePassWordConf}
									required/>
							</label>
						</form>
					</div>
					<div className='row'>
						<div className='col'>
							<button className='button button-block button-dark button-register'>Register</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = RegisterView;
