define([
	'underscore',
    './backstrappCQRS',
    './backstrappMarionette',
    './baseCollection',
    './baseModel',
    './baseController',
    './baseRouter',
    './extendedItemView',
    './baseCommand',
    './qs'
],

function(_, BackstrappCQRS, BackstrappMarionette, BaseCollection, BaseModel, BaseController, BaseRouter, ExtendedItemView, BaseCommand, qs) {

	var ns = _.extend(BackstrappCQRS, BackstrappMarionette);

	ns.Collection = BaseCollection;
	ns.Model = BaseModel;
	ns.Controller = BaseController;
	ns.Router = BaseRouter;
	ns.ExtendedItemView = ExtendedItemView;
	ns.Command = BaseCommand;
	ns.qs = qs;

	return ns;
});

