var React = require('react');

var Toggle = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': null
		})
	},
	getInitialState: function() {
		return ({
			'checked': false
		});
	},
	render: function() {

		return (
			<div className='item item-toggle'>
				{this.props.children}
				<label className={'toggle toggle-' + this.props.color}>
					<input type="checkbox" defaultChecked={this.state.checked}/>
					<div className="track">
						<div className="handle"></div>
					</div>
				</label>
			</div>
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
			<label className={'item range range-' + this.props.color}>
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
