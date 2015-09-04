// Calls.js

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
Backbone.LocalStorage = require("backbone.localstorage");
var moment = require('moment');

var Call = require('../models/Call');

module.exports = Backbone.Collection.extend({
	model: Call,
	localStorage: new Backbone.LocalStorage('today-calls'),
	initialize: function(){
		this.fetch();
		this.on('calls:sort', this.doSorting);
	},
	comparator: function(model){
		return moment(model.get('time'), 'HH:mm').unix();
	},
	doSorting: function(field, direction){
		switch(field){
			case 'time':
				if(direction == 'desc'){
					this.comparator = function(model){
						return -moment(model.get('time'), 'HH:mm').unix();
					}
				}else{
					this.comparator = function(model){
						return moment(model.get('time'), 'HH:mm').unix();
					}
				}
				break;
			case 'name':
				if(direction == 'desc'){
					this.comparator = function(modelA, modelB){
						if (modelA.get('name') > modelB.get('name')) return -1; 
  					if (modelB.get('name') > modelA.get('name')) return 1;
  					return 0;
					}
				}else{
					this.comparator = function(modelA, modelB){
						if (modelA.get('name') > modelB.get('name')) return 1; 
  					if (modelB.get('name') > modelA.get('name')) return -1;
  					return 0;
					}
				}
				break;
		}
		this.sort();
		return this;
	},
	upcoming: function(){
		return new Backbone.Collection(this.filter(function(model){
			return moment(model.get('time'), 'HH:mm').isAfter(moment());
		}));
	},
	finished: function(){
		return new Backbone.Collection(this.filter(function(model){
			return moment(model.get('time'), 'HH:mm').isBefore(moment());
		}));
	},
	next: function(){
		return this.clone().doSorting('time', 'asc').upcoming().at(0);
	}
});