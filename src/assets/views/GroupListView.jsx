var React = require('react');
var Link = require('react-router').Link;
var Header = require('./Utilities.jsx').Header;
var Tabs = require('./Utilities.jsx').Tabs;
var TabItem = require('./Utilities.jsx').TabItem;
var GroupList = require('../components/GroupList.jsx');

var GroupListView = React.createClass({
	contextTypes: {
		'bff': React.PropTypes.object
	},
	getInitialState: function() {
		return ({
			'items': []
		});
	},
	componentDidMount: function() {
		var that = this;
		this.context.bff.groupService.getAll().then(function(groups) {
			that.setState({'items': groups});
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		return (
			<div>
				<Header>
					<div className='title'>Socket</div>
					<Link
						to='/options'
						className='button button-clear icon ion-gear-b'></Link>
				</Header>
				<Tabs>
					<TabItem to='/'>SOCKETS</TabItem>
					<TabItem to='/groups'>GROUPS</TabItem>
				</Tabs>
				<div className="content has-subheader">
					<GroupList groups={this.state.items} history={this.props.history}/>
				</div>
			</div>
		);
	}
});

module.exports = GroupListView;
