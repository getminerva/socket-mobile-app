var BFF = function() {

	var socketService;
	var groupService;
	var userService;

	this.initialize = function() {
		this.socketService = new SocketService();
		this.groupService = new GroupService();
	}

	this.initialize();
}
