var SocketService = function() {

	var sockets;

	this.initialize = function() {
		// No Initialization required
		var deferred = $.Deferred();
		deferred.resolve();
		return deferred.promise();
	}

	this.findById = function(id) {
		var deferred = $.Deferred();
		var socket = null;
		var l = sockets.length;
		for (var i = 0; i < l; i++) {
			if (sockets[i].id === id) {
				socket = sockets[i];
				break;
			}
		}
		deferred.resolve(socket);
		return deferred.promise();
	}

	this.createSocket = function(socketInfo) {
		// TODO: Some data verification

		// Give it an ID & uuid
		socketInfo.id = 1;
		societInfo.uuid = 'bb:cc:dd:aa';

		sockets.push(socketInfo);

		return;
	}

	sockets = [
		{
			'id': 0,
			'uuid': 'aa:bb:cc:dd',
			'nickName': 'Sockrates',
			'macAddress': '00:00:00:00',
			'curBrightness': 50
		}
	];
}
