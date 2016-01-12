var ActionTypes = require('../constants/ActionTypes.js');

var loadSockets = function(user) {
    return ({
        type: ActionTypes.Sockets.loadSockets,
        user: user
    });
}

module.exports = {
    loadSockets: loadSockets
}
