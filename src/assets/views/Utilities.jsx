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

module.exports = {
	BackButton: BackButton
}
