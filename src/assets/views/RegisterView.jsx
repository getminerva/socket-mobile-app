var React = require('react');
var Header = require('./Utilities.jsx').Header;
var BackButton = require('./Utilities.jsx').BackButton;

var RegisterView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'pw-match': false
		});
	},
	pwChange: function(ev) {
		// Make sure both passwords arethe same
	},
	handleRegister: function(ev) {
		// Make sure all inputs are valid
		var email = document.querySelector('.input-email').value;
		var userName = document.querySelector('.input-user-name').value;
		var passWord = document.querySelector('.input-pass-word').value;

		console.log("Registering...");
		var that = this;
		this.context.bff.userService.createUser({
			'email': email,
			'userName': userName,
			'passWord': passWord
		}).then(function(newUser) {
			// log em in
			console.log("Welcome to Socket, " + userName);
			that.context.bff.login(userName, passWord, function() {
				that.props.history.push('/');
			});
		}, function(error) {
			console.log(error);
		});
	},
	componentDidMount: function() {
		var pwInputs = document.getElementsByClassName('input-pass-word');

		pwInputs[0].addEventListener(this.pwChange);
		pwInputs[1].addEventListener(this.pwChange);

		document.querySelector('.button-register').addEventListener('touchend', this.handleRegister);
	},
	render: function() {
		return (
			<div>
				<Header>
					<BackButton history={this.props.history}>Back</BackButton>
				</Header>
				<div className='content has-header'>
					<div className='list list-inset'>
						<label className='item item-input'>
							<span className='input-label'>E-mail</span>
							<input type='email' className='input-email' required/>
						</label>
						<label className='item item-input'>
							<span className='input-label'>Username</span>
							<input type='text' className='input-user-name' required/>
						</label>
						<label className='item item-input'>
							<span className='input-label'>Password</span>
							<input type='password' className='input-pass-word' />
						</label>
						<label className='item item-input'>
							<span className='input-label'>Confirm Password</span>
							<input type='password' className='input-pass-word' />
						</label>
					</div>
					<div className='row'>
						<div className='col'>
							<button className='button button-block button-energized button-register'>Register</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = RegisterView;
