window.SocketItemIcons = React.createClass({
	getDefaultProps: function() {
		return ({
			'proximity': false,
			'alarm': false,
			'notification': false
		});
	},
	render: function() {
		var icp = 'ion icon ion-android-locate ';
		var ica = 'ion icon ion-android-alarm-clock ';
		var icn = 'ion icon ion-android-notifications ';
		return (
			<div>
				<span className={this.props.proximity ? icp + 'icon-active' : icp + 'icon-inactive'}></span>
				<span className={this.props.alarm ? ica + 'icon-active' : ica + 'icon-inactive'}></span>
				<span className={this.props.notification ? icn + 'icon-active' : icn + 'icon-inactive'}></span>
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
	getInitialState: function() {
		return ({
			curBrightness: 50,
			prvBrightness: 0
		});
	},
	handleTap: function(ev) {
		if (ev.tapCount == 2) {
			this.handleDblTap(ev);
		} else {
			this.handleSglTap(ev);
		}
	},
	handleSglTap: function(ev) {
		// TODO: Toggle brightness slider
		console.log("Toggle brightness slider");
	},
	handleDblTap: function(ev) {
		// TODO: Toggle brightness
		console.log("Toggle brightness");
	},
	handlePress: function(ev) {
		// TODO: Go to individual page
		console.log("Press brightness");
	},
	componentDidMount: function() {
		// Setup touch handlers
		var opts = {}
		var mc = new Hammer.Manager(this.getDOMNode());

		mc.add(new Hammer.Tap({event: 'dbl-tap', taps: 2}));
		mc.add(new Hammer.Tap({event: 'sgl-tap'}));
		mc.add(new Hammer.Press({event: 'press'}));

		mc.get('dbl-tap').recognizeWith('sgl-tap');
		mc.get('sgl-tap').requireFailure('dbl-tap');

		mc.on('sgl-tap', this.handleSglTap);
		mc.on('dbl-tap', this.handleDblTap);
		mc.on('press', this.handlePress);
	},
	render: function() {
		return (
			<li className="table-view-cell">
				<h4>{ this.props.nickName }</h4>
				<SocketItemIcons
					proximity={this.props.proximity}
					alarm={this.props.alarm}
					notification={this.props.notification}
				/>
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
