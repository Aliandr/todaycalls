// CallView.js

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var moment = require('moment');

module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#tpl-call').html()),
	events: {
		'click .delete-call': 'deleteCall'
	},
	initialize: function(options){
		this.render();
	},
	presenter: function(){
		return {
			time: moment(this.model.get('time'), 'HH:mm').format('HH:mm'),
			name: this.model.get('name'),
			phone: this.model.get('phone'),
			isPast: moment(this.model.get('time'), 'HH:mm').isBefore(moment())
		};
	},
	render: function(){
		this.$el.html(this.template(this.presenter()));
		return this;
	},
	deleteCall: function(){
		if(confirm('Information about call to '+this.model.get('name')+' at '+this.model.get('time')+' will be permanently deleted. Are you sure?')){
			this.model.destroy();
			this.remove();
		}
	}
});