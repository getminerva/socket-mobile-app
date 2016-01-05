var React = require('react');
var Link = require('react-router').Link;

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
			'color': 'energized'
		});
	},
	render: function() {
		return (
			<div className={'bar bar-header bar-' + this.props.color}>
				{this.props.children}
			</div>
		);
	}
});

var TabItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'active': false,
			'to': '/'
		});
	},
	render: function() {
		var tabClass = 'tab-item' + ( (this.props.active) ? ' active' : '');
		return (
			<Link className={tabClass} to={this.props.to}>
				{this.props.children}
			</Link>
		);
	}
});

var Tabs = React.createClass({
	getDefaultProps: function() {
		return ({
			'os': 'android',		// Linked to Cordova's platformId
			'bgColor': 'energized',
			'color': 'royal'
		});
	},
	render: function() {
		var tabsClass = 'tabs ';
		tabsClass += 'tabs-' + this.props.bgColor + ' ';
		tabsClass += 'tabs-color-' + this.props.color + ' ';
		switch (this.props.os) {
			case 'android':
				tabsClass += 'tabs-striped tabs-top';
				break;
			case 'ios':
			case 'windows':
			default:
				tabsClass += 'tabs-striped';
				break;
		};
		return (
			<div className={tabsClass}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = {
	BackButton: BackButton,
	Header: Header,
	Tabs: Tabs,
	TabItem: TabItem
}
