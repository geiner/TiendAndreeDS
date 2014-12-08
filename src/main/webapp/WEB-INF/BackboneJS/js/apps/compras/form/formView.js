define(["app", "hbs!apps/compras/form/templates/comprasLayout",'apps/compras/form/model/guardar_proveedor',"apps/compras/form/views/proveedores_view"
        ,"apps/compras/form/views/nombre_x_producto","apps/compras/form/views/nombre_x_proveedor","bootstrap"],
    function (TiendaAndre, layoutTpl, GuardarProveedor,TraerProveedor,ProductoView,ProveedorView) {
    TiendaAndre.module('ComprasApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            productoView:new ProductoView(),
            proveedorView:new ProveedorView(),
            traerProveedor:new TraerProveedor(),

            regions:{
                table_proveedor:"#table_proveedor",
                combo_x_producto:"#combo_x_producto",
                combo_x_proveedor:"#combo_x_proveedor"
            },

            events:{
                "click #pestania_registro":"pestania_registro",
                "click #agregar":"habilitar_agregar",
                "click #modificar":"habilitar_modificar",
                "click #guardar_proveedor":"insertar_nuevo_proveedor",
                "click #ver_detalle":"cargar_modificar_proveedor",
                "click #actualizar_proveedor":"actualizar_proveedor"
            },

            onRender:function(){
                this.initialFetch();
                this.combo_x_producto.show(this.productoView);
                this.combo_x_proveedor.show(this.proveedorView);
            },

            initialFetch: function () {
                var self=this;
                this.productoView.fetchProductos();
                this.proveedorView.fetchProveedor();
            },

            pestania_registro:function(){
                //this.combo_x_producto.reset();
                this.productoView.fetchProductos();
                this.proveedorView.setUrlProveedor();
                this.combo_x_producto.show(this.productoView);
                this.combo_x_proveedor.show(this.proveedorView);
                $('#agre').show();
                $('#modi').hide();
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
                var self=this;
                $('#modi').show();
                $('#agre').hide();
                this.traerProveedor.fetchProveedores(function () {
                    self.table_proveedor.show(self.traerProveedor);
                })
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
            },

            cargar_modificar_proveedor:function(ev){
                var self=this;
                var clickedElement=$(ev.currentTarget);
                $('#n_codigo').val(clickedElement.parent().parent().children(':nth-child(1)').text());
                $('#n_nomprove').val(clickedElement.parent().parent().children(':nth-child(2)').text());
                $('#n_direcci').val(clickedElement.parent().parent().children(':nth-child(3)').text());
                $('#n_telef').val(clickedElement.parent().parent().children(':nth-child(4)').text());
                $('#n_mails').val(clickedElement.parent().parent().children(':nth-child(5)').text());
                $('#n_dscp').val(clickedElement.parent().parent().children(':nth-child(6)').text());
            },

            actualizar_proveedor:function(){
                var self=this;
                this.model.get("guardarproveedor").set({
                    "codigo":$('#n_codigo').val(),
                    "nom_proveedor":$('#n_nomprove').val(),
                    "direccion":$('#n_direcci').val(),
                    "telefono":$('#n_telef').val(),
                    "email":$('#n_mails').val(),
                    "descripcion":$('#n_dscp').val()
                });
                this.model.get("guardarproveedor").url = "rest/compras/actualizar_proveedor";
                var self_s = this.model.get("guardarproveedor").save({}, {wait: true});
                self_s.done(function () {});
                self_s.fail(function () {
                    self.traerProveedor.fetchProveedores(function(){
                        alert("actualizacion exitosa")
                        self.table_proveedor.show(self.traerProveedor);
                    });
                });
            }







        });
    });
    return TiendaAndre.ComprasApp.List.View;
});