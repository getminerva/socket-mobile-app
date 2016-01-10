var React = require('react');
var Link = require('react-router').Link;
var Header = require('./Utilities.jsx').Header;
var Tabs = require('./Utilities.jsx').Tabs;
var TabItem = require('./Utilities.jsx').TabItem;
var SocketList = require('../js/components/SocketList.jsx');

var SocketListView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object,
		'router': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'items': [],
			'tab': 0,
		});
	},
	switchTab: function(tabNum) {
		this.setState({'tab': tabNum});
	},
	componentDidMount: function() {
		// [TODO] Attach touch handlers

		var that = this;
		switch (this.state.tab) {
			case 0:
				that.context.bff.socketService.getAll().then(function(sockets) {
					that.setState({'items': sockets});
				}, function(error) {
					console.log(error);
				});
				break;
			case 1:
			default:
				that.context.bff.groupService.getAll().then(function(groups) {
					that.setState({'items': groups});
				}, function(error) {
					console.log(error);
				});
				break;
		}
	},
	render: function() {
		return (
			<div className='app'>
				<Header>
					<div className='title'>Socket</div>
					<Link
						to='/add'
						className='button button-clear icon ion-plus'></Link>
					<Link
						to='/options'
						className='button button-clear icon ion-gear-b'></Link>
				</Header>
				{
				// <Tabs os='android'>
				// 	<TabItem to='/'>SINGLE</TabItem>
				// 	<TabItem to='/groups'>GROUPS</TabItem>
				// </Tabs>
				}
				<div className="content has-header">
					<SocketList sockets={this.state.items}/>
				</div>
			</div>
		);
	}
});

module.exports = SocketListView;
