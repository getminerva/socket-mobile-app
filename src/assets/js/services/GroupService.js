var GroupService = function() {

	var groups;

	this.initialize = function() {
		// No Initialization required
		var deferred = $.Deferred();
		deferred.resolve();
		return deferred.promise();
	}

	this.findById = function(id) {
		var deferred = $.Deferred();
		var group = null;
		var l = groups.length;
		for (var i = 0; i < l; i++) {
			if (groups[i].id === id) {
				group = groups[i];
				break;
			}
		}
		deferred.resolve(group);
		return deferred.promise();
	}

	this.createGroup = function(groupInfo) {
		// TODO: Some data verification

		// Give it an ID & uuid

		// groups.push(groupInfo);

		return;
	}

	groups = [
		{
			'id': 0,
			'uuid': 'aa:bb:cc:dd',
			'groupName': 'Bedroom',
			'sockets': [
				0
			],
			'curBrightness': 50
		}
	];
}

module.exports = GroupService;
