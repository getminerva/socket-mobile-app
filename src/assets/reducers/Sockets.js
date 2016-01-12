var ActionTypes = require('../constants/ActionTypes.js');



const initialState = {
    sockets: []
};

var sockets = function(state, action) {
    state = typeof state !== 'undefined' ? state : initialState;
    switch (action.type) {
        case (ActionTypes.Sockets.loadSockets):
            // TODO: Contact API, move bff/API querying logic into here.
            console.log("Loading Sockets...");
            state = {
                sockets: []
            };
            return (state);
        default:
            return (state);
    }
};

module.exports = sockets;
