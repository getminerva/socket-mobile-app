var React = require('react');

var Toggle = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': null,
			'checked': false,
			'onChange': null
		})
	},
	render: function() {
		return (
			<div className='item item-toggle'>
				{this.props.children}
				<label className={'toggle toggle-' + this.props.color}>
					<input type="checkbox"
						defaultChecked={this.props.checked}
						onChange={this.props.onChange}/>
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
			'rightIcon': null,
			'value': 50,
			'onChange': null
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
					defaultValue={this.props.value}
					onChange={this.props.onChange}
				/>
				{rightIcon}
			 </label>
		);
	}
});


var TextInputItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'value': '',
			'onChange': null
		});
	},
	render: function() {
		return (
			<label className="item item-input">
				<input type="text"
					defaultValue={this.props.value}
					onChange={this.props.onChange}
				/>
			</label>
		);
	}
});

module.exports = {
	Toggle: Toggle,
	Range: Range,
	TextInputItem: TextInputItem
}
