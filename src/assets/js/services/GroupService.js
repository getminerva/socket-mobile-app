var GroupService = function() {

	var groups;

	this.initialize = function() {
		var promise = new Promise(function(resolve, reject) {
			// No initializion required
			resolve();
		});
		return promise;
	}

	this.findById = function(id) {
		var promise = new Promise(function(resolve, reject) {
			if (id < 0 || groups[groups.length-1].id < id) {
				reject("Invalid ID.");
			} else {
				resolve(groups[id]);
			}
		});
		return promise;
	}

	this.getAll = function() {
		var promise = new Promise(function(resolve, reject) {
			resolve(groups);
		});
		return promise;
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
