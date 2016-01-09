var SocketService = require('./SocketService.js');
var GroupService = require('./GroupService.js');
var UserService = require('./UserService.js');

var BFF = function() {

	var socketService;
	var groupService;
	var userService;

	this.initialize = function() {
		this.socketService = new SocketService();
		this.groupService = new GroupService();
		this.userService = new UserService();

		this.socketService.initialize();
		this.groupService.initialize();
		this.userService.initialize();

		return this;
	}

	// AUTHENTICATION

	this.login = function(uname, pw, cb) {
		cb = arguments[arguments.length - 1];
		if (localStorage.token) {
			if (cb) {
				cb(true, 'No Error.');
			}
			this.onChange(true);
			return ;
		}
		var that = this;
		this.userService.login(uname, pw).then(function(result) {
			localStorage.token = result.token;
			if (cb) {
				cb(true, 'No error.');
			}
			that.onChange(true);
		}, function(error) {
			console.log(error);
			if (cb) {
				cb(false, error.message);
			}
			that.onChange(false);
		});
	}

	this.logout = function(cb) {
		delete localStorage.token;
		if (cb) {
			cb(false);
		}
		this.onChange(false);
	}

	this.getSessionToken = function() {
		return localStorage.token;
	}

	this.loggedIn = function() {
		return !!localStorage.token;
	}

	this.onChange = function() {
		// Meh
	}

	this.initialize();
}

module.exports = BFF;
