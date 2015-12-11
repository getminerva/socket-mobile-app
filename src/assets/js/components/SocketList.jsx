window.SocketItemIcons = React.createClass({
	getDefaultProps: function() {
		'proximity': false,
		'alarm': false,
		'notification': false
	},
	render: function() {

		return (
			<div>
				<span className=""></span>
				<span className=""></span>
				<span className=""></span>
			</div>
		);
	}
})

window.SocketItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'nickName': 'Sockrates',
			'macId': '00:1a:2b:3c:',
			'proximity': false,
			'alarm': false,
			'notification': false,
		});
	},
	render: function() {
		return (
			<li className="table-view-cell">
				<h4>{ this.props.nickName }</h4>
				<p>Proximity: {this.props.proximity}</p>
				<p>Alarm: {this.props.alarm}</p>
				<p>Notification: {this.props.notification}</p>
			</li>
		)
	}
});

window.SocketList = React.createClass({
	getDefaultProps: function() {
		return ({
			'items': []
		});
	},
	render: function() {
		// Map the items in props to the ul
		var listItems = this.props.items.map(function(item) {
			return (
				<SocketItem
					nickName={item.nickName}
					macId={item.macId}
					proximity={item.proximity}
					alarm={item.alarm}
					notification={item.notification}
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
