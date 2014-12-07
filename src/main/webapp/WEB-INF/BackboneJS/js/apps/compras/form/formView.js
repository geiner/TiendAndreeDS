define(["app", "hbs!apps/compras/form/templates/comprasLayout",'apps/compras/form/model/guardar_proveedor',"apps/compras/form/views/proveedores_view","bootstrap"],
    function (TiendaAndre, layoutTpl, GuardarProveedor,TraerProveedor) {
    TiendaAndre.module('ComprasApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            traerProveedor:new TraerProveedor(),

            regions:{
                table_proveedor:"#table_proveedor"
            },

            events:{
                "click #agregar":"habilitar_agregar",
                "click #modificar":"habilitar_modificar",
                "click #guardar_proveedor":"insertar_nuevo_proveedor"
            },

            initialize: function () {
                this.model = new Backbone.Model();
                this.model.set({
                    "guardarproveedor":new GuardarProveedor()
                });
            },


            habilitar_agregar: function () {
                $('#agre').show();
                $('#modi').hide();
            },

            habilitar_modificar: function () {
                $('#modi').show();
                $('#agre').hide();
            },

            insertar_nuevo_proveedor:function(){
                var self=this;
                this.model.get("guardarproveedor").set({
                    "nom_proveedor":$('#n_nompro').val(),
                    "direccion":$('#n_direcc').val(),
                    "telefono":$('#n_tele').val(),
                    "email":$('#n_mail').val(),
                    "descripcion":$('#n_dsc').val()
                });
                this.model.get("guardarproveedor").url = "rest/compras/guardar_proveedor";
                var self_s = this.model.get("guardarproveedor").save({}, {wait: true});
                self_s.done(function () {});
                self_s.fail(function () {
                    alert("el nuevo proveedor se registro correctamente")
                });
            }



        });
    });
    return TiendaAndre.ComprasApp.List.View;
});