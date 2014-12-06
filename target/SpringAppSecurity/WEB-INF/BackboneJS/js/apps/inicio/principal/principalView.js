define(["app", "hbs!apps/inicio/principal/templates/submodulos","bootstrap"], function (TiendaAndre, layoutTpl) {
    TiendaAndre.module('PrincipalApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl
        });
    });
    return TiendaAndre.PrincipalApp.List.View;
});