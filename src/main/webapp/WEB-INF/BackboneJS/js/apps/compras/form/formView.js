define(["app", "hbs!apps/compras/form/templates/comprasLayout","bootstrap"], function (TiendaAndre, layoutTpl) {
    TiendaAndre.module('ComprasApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            events:{
                "click #agregar":"habilitar_agregar",
                "click #modificar":"habilitar_modificar"
            },

            habilitar_agregar: function () {
                $('#agre').show();
                $('#modi').hide();
            },

            habilitar_modificar: function () {
                $('#modi').show();
                $('#agre').hide();
            }
        });
    });
    return TiendaAndre.ComprasApp.List.View;
});