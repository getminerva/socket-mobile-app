// import { Router, Route, Link } from 'react-router'

var bff = new BFF();

ReactDOM.render(
	<HomeView listService={bff.socketService}/>, document.getElementById('app'));
