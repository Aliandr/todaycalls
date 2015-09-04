// NextCallView.js

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	el: '#next-call',
	template: _.template($('#tpl-next-call').html()),
	initialize: function(){
		this.listenTo(app.collection, 'add destroy call:transformed', this.updateCall);
		this.updateCall();
	},
	updateCall: function(){
		this.model = app.collection.next();
		this.render();
	},
	render: function(){
		if(this.model){
			this.$el.html(this.template(this.model.toJSON()));
		}else{
			this.$el.html('<p>No calls scheduled. Add one &rarr;</p>')
		}
		return this;
	}
});