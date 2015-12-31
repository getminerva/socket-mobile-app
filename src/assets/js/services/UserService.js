var bcrypt = require('bcryptjs');

var UserService = function() {

	var users;

	this.initialize = function() {
		// No Initialization required
		var promise = new Promise(function(resolve, reject) {
			resolve();
		});
		return promise;
	}

	this.findById = function(id) {
		// Assumes everything is sorted rn
		var promise = new Promise(function(resolve, reject) {
			if (id < 0 || users[users.length-1].id < id) {
				reject("Invalid ID.");
			} else {
				resolve(users[id]);
			}
		});
		return promise;
	}

	this.findByUserName = function(uname) {
		var promise = new Promise(function(resolve, reject) {
			var user = null;

			for (var i=0; i < users.length; i++) {
				if (users[i].userName = uname) {
					user = users[i];
					break;
				}
			}

			if (user != null) {
				resolve(user);
			} else {
				reject(Error("Cannot find user with usernam '" + uname + "'"));
			}
		});

		return promise;
	}

	this.getAllUsers = function() {
		var promise = new Promise(function(resolve, reject) {
			resolve(users);
		});
		return promise;
	}

	this.createUser = function(userInfo) {
		// TODO: Some data verification
	}

	this.login = function(uname, pw) {
		var that = this;
		var promise = new Promise(function(resolve, reject) {
			// hash & salt and Compare the uname and pw
			var user = null;

			var ErrorMsg = null;
			that.findByUserName(uname).then(function(userData) {
				if (bcrypt.compareSync(pw, userData.passWordHash)) {
					resolve({
						'token': Math.random().toString(36).substring(7)
					});
				} else {
					reject("Wrong password.");
				}
			}, function(error) {
				reject(error);
			});
		});

		return promise;
	}

	users = [
		{
			'id': 0,
			'uuid': 'aa-bb-cc-dd-ee-ff',
			'userName': 'admin',
			'passWordHash': bcrypt.hashSync('admin', bcrypt.genSaltSync(10))
		}
	];
}

module.exports = UserService;
