var React = require('react');

var Toggle = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': 'energized',
			'checked': false,
			'onChange': null
		})
	},
	render: function() {
		return (
			<label className={'toggle toggle-' + this.props.color}>
				<input type="checkbox"
					checked={this.props.checked}
					onChange={this.props.onChange}/>
				<div className="track">
					<div className="handle"></div>
				</div>
			</label>
		);
	}
});

var ToggleItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': 'energized',
			'className': '',
			'checked': false,
			'onChange': null
		})
	},
	render: function() {
		return (
			<div className={'item item-toggle' + ' ' + this.props.className}>
				{this.props.children}
				<Toggle
					color={this.props.color}
					checked={this.props.checked}
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
});

var Range = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': 'energized',
			'value': 50,
			'className': '',
			'onChange': null
		});
	},
	render: function() {
		return (
			<label className={'range range-' + this.props.color}>
				<input
					type="range"
					min="0"
					max="100"
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</label>
		);
	}
});

var RangeItem = React.createClass({
	getDefaultProps: function() {
		return ({
			'color': 'energized',
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
					value={this.props.value}
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
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</label>
		);
	}
});

var Input = React.createClass({
	contextTypes: {
		'hideKeyboardItems': React.PropTypes.function,
		'showKeyboardItems': React.PropTypes.function
	},
	render: function() {
		return (
			<input {...this.props} onfocus={this.context.hideKeyboardItems} onblur={this.showKeyboardItems} />
		)
	}
})


var List = React.createClass({
	getDefaultProps: function() {
		return ({
			'items': []
		});
	},
	render: function() {
		return (
			<div className='list'>
				{this.props.item}
			</div>
		);
	}
});

module.exports = {
	Toggle: Toggle,
	ToggleItem: ToggleItem,
	Range: Range,
	RangeItem: RangeItem,
	TextInputItem: TextInputItem,
	Input: Input,
	List: List
}
