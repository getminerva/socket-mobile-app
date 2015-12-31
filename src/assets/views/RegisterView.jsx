var React = require('react');
var BackButton = require('./Utilities.jsx').BackButton;
var Header = require('./Utilities.jsx').Header;

var RegisterView = React.createClass({
	render: function() {
		return (
			<div>
				<Header color='energized'>
					<BackButton history={this.props.history}>Back</BackButton>
				</Header>
				<div className='content has-header'>
					<div className='list list-inset'>
						<label className='item item-input'>
							<span className='input-label'>E-mail</span>
							<input type='email' className='input-email' />
						</label>
						<label className='item item-input'>
							<span className='input-label'>Username</span>
							<input type='text' className='input-user-name' />
						</label>
						<label className='item item-input'>
							<span className='input-label'>Password</span>
							<input type='password' className='input-pass-word' />
						</label>
						<label className='item item-input'>
							<span className='input-label'>Confirm Password</span>
							<input type='password' className='input-confirm-pass-word' />
						</label>
					</div>
					<div className='row'>
						<div className='col'>
							<button className='button button-block button-energized'>Register</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = RegisterView;
