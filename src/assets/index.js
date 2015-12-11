
var bff = new BFF();

ReactDOM.render(<HomeView listService={bff.socketService}/>, document.getElementById('app'));
// ReactDOM.render(<BluetoothAddView />, document.getElementById('app'));

var app = function() {

    var bff;

    // Application Constructor
    this.initialize = function() {
        this.bindEvents();

        bff = new BFF();

        ReactDOM.render(<HomeView listService={bff.socketService} />, document.getElementById('app'));
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    this.bindEvents = function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    this.onDeviceReady = function() {
        app.receivedEvent('deviceready');
    }
    // Update DOM on a Received Event
    this.receivedEvent = function(id) {

        ReactDOM.render(<HomeView listService={bff.socketService} />, document.getElementById('app'));

        console.log('Received Event: ' + id);
    }
};

// new app().initialize();
