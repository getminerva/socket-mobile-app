var expect = require('expect');
var deepfreeze = require('deep-freeze');

var ActionTypes = require('../../constants/ActionTypes.js')
var sockets = require('../../reducers/Sockets.js');

const initialState = {
    sockets: []
};

const stateAfterAdd = {
    sockets: []
}

deepfreeze(initialState);

describe('socket reducer:', function() {

    it('should return the initial state', function() {
        expect(
            sockets(undefined, {})
        ).toEqual(initialState);
    });

    it('should return the initial state for blank actions', function() {
        expect(
            sockets(initialState, {})
        ).toEqual(initialState);
    });

    it('should return the initial state for undefined actions', function() {
        expect(
            sockets(initialState, {
                type: 'blargle_fargle_dargle'
            })
        ).toEqual(initialState);
    });

    it('should load sockets', function() {
        expect(
            sockets(initialState, {
                type: ActionTypes.Sockets.loadSockets,
                user: 'admin'
            })
        ).toEqual(stateAfterAdd);
    });

});
