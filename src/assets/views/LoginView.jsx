var React = require('React');

var BFF = require('../js/services/BFF.js');

var RegisterView = React.createClass({
	render: function() {
		return (
			<div className='content'>
			</div>
		);
	}
});

var LoginView = React.createClass({
	getInitialState: function() {
		var service = new BFF();
		return ({
			'error': false,
			'service': service,
			'loggedIn':  service.loggedIn()
		});
	},
	updateAuth: function(loggedIn) {
		if (loggedIn) {
			console.log('Login success.');
			this.props.history.push('/');
		} else {
			console.log('Login failure.');
		}
	},
	handleLogin: function(ev) {
		var uname = document.querySelector('.input-user-name').value;
		var pw = document.querySelector('.input-pass-word').value;
		// console.log(uname, pw);
		this.state.service.login(uname, pw, this.updateAuth);
	},
	handleRegister: function(ev) {
		// [TODO] push to registration flow but with the given info
	},
	componentWillMount: function() {
		this.state.service.onChange = this.updateAuth;
	},
	render: function() {
		return (
			<div className='content'>
				<div className='floating-header'>
					<h1>Socket</h1>
				</div>
				<div className='list list-inset'>
					<label className='item item-input'>
						<span className='input-label'>Username</span>
						<input type='text' className='input-user-name'/>
					</label>
					<label className='item item-input'>
						<span className='input-label'>Password</span>
						<input type='password' className='input-pass-word'/>
					</label>
				</div>
				<div className='row'>
					<div className='col col-50'>
						<button className='button button-block button-energized'>Register</button>
					</div>
					<div className='col col-50'>
						<button
							className='button button-block button-energized'
							onClick={this.handleLogin}>Login</button>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = LoginView;
