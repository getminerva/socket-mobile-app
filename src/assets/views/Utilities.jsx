var React = require('react');

var BackButton = React.createClass({
	// contextTypes: {
	// 	'router': object.isRequired	// Context is a new thing in React, and React Router 2.0.0 is fine with using them
	// },
	getDefaultProps: function() {
		return ({
			'history': null		// Need the history object
		});
	},
	componentDidMount: function() {
		// Attach return function to the button
		document.querySelector('.button-return')
			.addEventListener('touchstart', this.props.history.goBack);
		// document.querySelector('.button-return')
		// 	.addEventListener('touchstart', this.context.router.goBack);
	},
	render: function() {
		return (
			<a className='button button-clear button-return icon-left ion-chevron-left'>{this.props.children}</a>
		);
	}
});

var Header = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': 'light'
		});
	},
	render: function() {
		return (
			<div className={'bar bar-header bar-' + this.props.color}>
				{this.props.children}
			</div>
		);
	}
})

module.exports = {
	BackButton: BackButton,
	Header: Header
}
