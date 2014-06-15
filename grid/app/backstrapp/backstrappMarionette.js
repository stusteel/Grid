define([
  'underscore',
  'backbone',
  'marionette',
  'handlebars'/*,
  './templateLoader'*/
],

function(_, Backbone, Marionette, Handlebars/*, Loader*/) {

    var ns = {}
      , mario = Backbone.Marionette;

    // append to ns
    ns.Marionette = mario;

    // layout
    ns.Layout = mario.Layout;
    ns.Region = mario.Region;

    // views
    ns.ItemView = mario.ItemView;
    ns.CollectionView = mario.CollectionView;
    ns.CompositeView = mario.CompositeView;

    // add an App
    ns.app = new ns.Marionette.Application();
    ns.app.store = new Backbone.Model();
    ns.renderer = mario.Renderer;

/* - removed asynch template load
    Backbone.Marionette.TemplateCache.loadTemplate = function(templateId, callback) {
        var self = this;

        Loader.fetchTemplate(templateId, function(tmpl) {
            var ret = (_.isFunction(tmpl)) ? tmpl : Handlebars.compile(tmpl);
            callback.call(self, ret);
        });
    };
*/

Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
      return Handlebars.compile(rawTemplate);
  };


    var renderTemplate = function (template, data) {
        if (!template) return null;
        var rendering = template(data);
        //if ($.i18n && rendering && rendering.length > 2) $(rendering).i18n();
        return rendering;
    };

    ns.renderer.renderTemplate = renderTemplate;

    return ns;

});