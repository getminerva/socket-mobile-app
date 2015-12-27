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

	this.getAll = function() {
		var deferred = $.Deferred();
		deferred.resolve(sockets);
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
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'undefined',
			'rssi': 0,
			'curBrightness': 50,
			'proximity': false,
			'alarm': false,
			'notification': false
		},
		{
			'id': 1,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'Sockrates',
			'rssi': 0,
			'curBrightness': 50,
			'proximity': true,
			'alarm': false,
			'notification': false
		},
		{
			'id': 2,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'Sockatoa',
			'rssi': 0,
			'curBrightness': 50,
			'proximity': false,
			'alarm': false,
			'notification': false
		},
		{
			'id': 3,
			'uuid': 'xx-xx-xx-xx-xx-xx',
			'macAddress': '00:00:00:00:00:00',
			'nickName': 'Sockiavelli',
			'rssi': 0,
			'curBrightness': 50,
			'proximity': false,
			'alarm': false,
			'notification': false
		}
	];
}

module.exports = SocketService;
