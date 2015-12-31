var React = require('react');

var BackButton = React.createClass({
	getDefaultProps: function() {
		return ({
			'history': null		// Need the history object
		});
	},
	componentDidMount: function() {
		// Attach return function to the button
		document.querySelector('.button-return').addEventListener('click',
			this.props.history.goBack);
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
