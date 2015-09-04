//CallListView.js

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var CallView = require('./CallView');

module.exports = Backbone.View.extend({
	el: '#call-list',
	template: _.template($('#tpl-call-list').html()),
	events: {
		'click .sort': 'doSorting',
		'click .filter': 'doFiltering'
	},
	initialize: function(){
		this.render();
		this.listenTo(app.collection, 'add destroy sort call:transformed', this.renderChildrenViews);
	},
	render: function(){
		this.$el.html(this.template());
		this.renderChildrenViews();
		return this;
	},
	renderChildrenViews: function(){
		var $container = this.$('#list-container').empty();
		app.collection.each(function(model){
			var view = new CallView({model: model});
			$container.append(view.render().el);
		});
	},
	doSorting: function(e){
		var $target = $(e.target);
		var direction = $target.hasClass('asc') ? 'desc' : 'asc';
		app.collection.trigger('calls:sort', $target.data('sort'), direction);
		this.$('.sort').removeClass('asc desc');
		this.$('.filter').removeClass('active').first().addClass('active');
		$target.addClass(direction);
	},
	doFiltering: function(e){
		var $target = $(e.target);
		var criteria = $target.data('filter');
		var list;
		switch(criteria){
			case 'all':
				list = app.collection;
				break;
			case 'upcoming':
				list = app.collection.upcoming();
				break;
			case 'finished':
				list = app.collection.finished();
				break;
		}
		var $container = this.$('#list-container').empty();
		list.each(function(model){
			var view = new CallView({model: model});
			$container.append(view.render().el);
		});
		this.$('.filter').removeClass('active');
		$target.addClass('active');
	}
});