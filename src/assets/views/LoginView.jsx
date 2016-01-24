var React = require('React');
var Input = require('../components/Common.jsx').Input;
var Link = require('react-router').Link;
var Footer = require('./Utilities.jsx').Footer;

var LoginView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'error': false,
			'errorMsg': '',
			'loggedIn': false
		});
	},
	updateAuth: function(loggedIn, errorMsg) {
		if (loggedIn) {
			this.setState({'error': false});
			this.props.history.push('/');
		} else {
			console.log(errorMsg);
			this.setState({
				'error': true,
				'errorMsg': errorMsg
			});
			console.log('Login failure.');
		}
	},
	handleLogin: function(ev) {
		ev.preventDefault();
		var uname = document.querySelector('.input-user-name').value;
		var pw = document.querySelector('.input-pass-word').value;
		// console.log(uname, pw);
		this.context.bff.login(uname, pw, this.updateAuth);
	},
	componentWillMount: function() {
		document.querySelector('#app-container').className = 'energized-bg';
		this.setState({'loggedIn': this.context.bff.loggedIn()});
	},
	componentDidMount: function() {
		document.querySelector('.button-login').addEventListener('touchstart', this.handleLogin);
	},
	componentWillUnmount: function() {
		document.querySelector('#app-container').className = '';
	},
	render: function() {
		return (
			<div className='app-view'>
				<div className='content has-header has-footer'>
					<div className='row'>
						<h1>Socket</h1>
					</div>
					<div className='row'>
						<div className='col text-center assertive'>
							{this.state.errorMsg}
						</div>
					</div>
					<div className='list list-inset'>
						<label className='item item-input rounded'>
							<Input type='text'
								className='input-user-name'
								placeholder='Username'/>
						</label>
					</div>
					<form onSubmit={this.handleLogin} className=' list list-inset'>
						<label className='item item-input rounded'>
							<Input type='password'
								className='input-pass-word'
								placeholder='Password'/>
						</label>
					</form>
					<div className='row'>
						<button
							className='button button-block button-dark button-login'>Login</button>
					</div>
					<div className='row'>
						<Link to='/forgot-password' className='col text-center light'>Forgot Password?</Link>
					</div>
				</div>
				<Footer color='clear'>
					<Link to='/register' className='button button-clear title'>Sign Up for Socket</Link>
				</Footer>
			</div>
		);
	}
});

module.exports = LoginView;
