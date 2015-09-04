// AddCallView.js

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	el: '#add-call',
	template: _.template($('#tpl-add-call').html()),
	events: {
		'click #add-button': 'addCall'
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template());
		return this;
	},
	gatherAttributes: function(){
		return {
			time: this.$('#add-time').val().trim(),
			name: this.$('#add-name').val().trim(),
			phone: this.$('#add-phone').val().trim()
		}
	},
	addCall: function(){
		var model = app.collection.create(this.gatherAttributes());
		if(!model.isValid()){
			this.$('#add-error').html(model.validationError).show();
			model.destroy();
		}else{
			this.$('#add-time, #add-name, #add-phone').val('');
			this.$('#add-error').hide();
		}
	}
});