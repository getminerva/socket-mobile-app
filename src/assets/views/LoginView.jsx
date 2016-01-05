var React = require('React');
var BFF = require('../js/services/BFF.js');

var LoginView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'error': false,
			'loggedIn': false
		});
	},
	updateAuth: function(loggedIn) {
		if (loggedIn) {
			this.setState({'error': false});
			this.props.history.push('/');
		} else {
			this.setState({'error': true});
			console.log('Login failure.');
		}
	},
	handleLogin: function(ev) {
		var uname = document.querySelector('.input-user-name').value;
		var pw = document.querySelector('.input-pass-word').value;
		// console.log(uname, pw);
		this.context.bff.login(uname, pw, this.updateAuth);
	},
	handleRegister: function(ev) {
		// [TODO] push to registration flow but with the given info
		this.props.history.push('/register');
	},
	componentWillMount: function() {
		this.setState({'loggedIn': this.context.bff.loggedIn()});
		this.context.bff.onChange = this.updateAuth;
	},
	componentDidMount: function() {
		document.querySelector('.button-register').addEventListener('touchstart', this.handleRegister);
		document.querySelector('.button-login').addEventListener('touchstart', this.handleLogin);

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
						<button
							className='button button-block button-energized button-register'>Register</button>
					</div>
					<div className='col col-50'>
						<button
							className='button button-block button-energized button-login'>Login</button>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = LoginView;
