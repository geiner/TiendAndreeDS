define(["app", "hbs!apps/admin/form/templates/adminLayout","bootstrap"], function (TiendaAndre, layoutTpl) {
    TiendaAndre.module('AdminApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,
            events:{
                "click #agregar":"habilitar_agregar",
                "click #modificar":"habilitar_modificar",
                "click #nuevo_producto":"habilitar_nuevo_producto",
                "click #modificar_producto":"habilitar_modificar_producto"
            },

            habilitar_agregar: function () {
                $('#agre').show();
                $('#modi').hide();
            },

            habilitar_modificar: function () {
                $('#modi').show();
                $('#agre').hide();
            },

            habilitar_nuevo_producto:function(){
                $('#nuevo').show();
                $('#modificar').hide()
            },
            habilitar_modificar_producto:function(){
                $('#nuevo').hide();
                $('#modificar').show()
            }



        });
    });
    return TiendaAndre.AdminApp.List.View;
});