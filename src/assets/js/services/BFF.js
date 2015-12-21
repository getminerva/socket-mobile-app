var SocketService = require('./SocketService.js');
var GroupService = require('./GroupService.js');

var BFF = function() {

	var socketService;
	var groupService;
	var userService;

	this.initialize = function() {
		this.socketService = new SocketService();
		this.groupService = new GroupService();

		this.socketService.initialize();
		this.groupService.initialize();

		return this;
	}

	this.initialize();
}

module.exports = BFF;
