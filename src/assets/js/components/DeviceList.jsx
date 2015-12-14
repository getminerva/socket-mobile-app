var React = require('react');

var DeviceItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'nickName': 'Sockrates',
			'macId': '00:1a:2b:3c:',
		});
	},
	render: function() {
		return (
			<li className="table-view-cell">
				<h4>{ this.props.nickName }</h4>
				<p>{ this.props.macId }</p>
			</li>
		)
	}
});

var DeviceList = React.createClass({
	getDefaultProps: function() {
		return ({
			'items': []
		});
	},
	render: function() {
		// Map the items in props to the ul
		var listItems = this.props.items.map(function(item) {
			return (
				<DeviceItem
					nickName={item.nickName}
					macId={item.macId}
				/>
			);
		});
		return (
			<ul className="table-view">
				{ listItems }
			</ul>
		);
	}
});

module.exports ={
	DeviceList: DeviceList,
	DeviceItem: DeviceItem,
}
