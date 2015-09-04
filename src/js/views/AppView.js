// AppView.js

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Calls = require('../collections/Calls');
var AddCallView = require('../views/AddCallView');

module.exports = Backbone.View.extend({
	el: '#app',
	calls: new Calls,
	views: {},
	initialize: function(){
		this.views.addView = new AddCallView;
	},
	render: function(){
		this.$el.html('<p>It works!</p>');
		return this;
	}
});