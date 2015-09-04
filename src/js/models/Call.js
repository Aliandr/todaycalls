// Call.js

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var moment = require('moment');

module.exports = Backbone.Model.extend({
	validate: function(attributes, options){
		if(attributes.time.length < 1 || !moment(attributes.time, 'HH:mm').isValid()){
			return 'Time is not valid';
		}
		if(attributes.name.length < 1 || attributes.name.length > 30){
			return 'Name is not valid';
		}
		var phone = attributes.phone.replace(' ', '');
		if(	
				!phone.match(/^\+|^00/) ||
				(phone.match(/^\+/) && phone.length < 13) ||
				(phone.match(/^00/) && phone.length < 14) ||

				(phone.match(/\(/g) || []).length > 1 ||
				phone.indexOf('(') == 0 ||
				phone.indexOf('(') > 7 ||

				(phone.match(/\)/g) || []).length > 1 ||
				phone.indexOf(')') == 0 ||
				phone.indexOf(')') > 7 ||

				(phone.match(/\-/g) || []).length > 1 ||
				phone.indexOf('-') == 0 ||
				phone.indexOf('-') > 7 ){
			return 'Phone is not valid';	
		};
		this.set('name', this.attributes.name.charAt(0).toUpperCase() + this.attributes.name.slice(1), {silent: true});
		this.set('time', moment(this.attributes.time, 'HH:mm').format('HH:mm'), {silent: true});
		this.set('phone', '00' + this.attributes.phone.replace(/\(|\)|\-|\+|^00|\s/g, '').replace(/(\d{3})/g, '$1 '), {silent: true});
		app.collection.trigger('call:transformed');
	}
});