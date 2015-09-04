// app.js

var Calls = require('./collections/Calls');
var AddCallView = require('./views/AddCallView');
var CallListView = require('./views/CallListView');
var NextCallView = require('./views/NextCallView');

window.app = {};
app.collection = new Calls;
app.addCallView = new AddCallView;
app.callListView = new CallListView;
app.nextCallView = new NextCallView;