var React = require('react');

var Toggle = React.createClass({
	getInitialState: function() {
		return ({
			'checked': false
		});
	},
	render: function() {

		return (
			<label className="toggle">
				<input type="checkbox" defaultChecked={this.state.checked}/>
				<div className="track">
					<div className="handle"></div>
				</div>
			</label>
		);
	}
});

var Range = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': null,
			'leftIcon': null,
			'rightIcon': null
		});
	},
	getInitialState: function() {
		return ({
			'curValue': 0
		});
	},
	render: function() {
		var leftIcon = null;
		var rightIcon = null;
		if (this.props.leftIcon != null) {
			leftIcon = <i className={'icon ' + this.props.leftIcon}></i>;
		}
		if (this.props.rightIcon != null) {
			rightIcon = <i className={'icon ' + this.props.rightIcon}></i>;
		}
		return (
			<label className={'range ' + this.props.color}>
				{leftIcon}
				<input
					type="range"
					min="0"
					max="100"
					defaultValue={this.state.curValue}
				/>
				{rightIcon}
			 </label>
		);
	}
});

module.exports = {
	Toggle: Toggle,
	Range: Range
}
