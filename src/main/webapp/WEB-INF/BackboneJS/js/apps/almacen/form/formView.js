define(["app", "hbs!apps/almacen/form/templates/almacenLayout","apps/almacen/form/views/select_tipoproducto_view",'apps/almacen/form/model/guardar_producto',
    "apps/almacen/form/views/productos_view","bootstrap"], function (TiendaAndre, layoutTpl,SelectTipoProductoView,GuardarProducto,TraerProductos) {
    TiendaAndre.module('AlmacenApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            selectTipoProductoView:new SelectTipoProductoView(),
            traerProductos:new TraerProductos(),

            regions:{
                div_tipoproducto:"#div_tipoproducto",
                div_tabla_producto:"#div_tabla_producto",
                div_tipopro_modificar:"#div_tipopro_modificar"
            },
            events:{
                "click #nuevo_producto":"habilitar_nuevo_producto",
                "click #modificar_producto":"habilitar_modificar_producto",
                "click #salida":"habilitar_salida_producto",
                "click #entrada":"habilitar_entrada_producto",
                "click #reportes":"habilitar_reportes",
                "click #guardar_producto":"insertar_nuevo_producto",
                "click #ver_detalle":"cargar_producto_a_modificar",
                "click #actualizar_producto":"actualizar_producto",
                "click #eliminar_producto":"eliminar_producto"
            },

            onRender:function(){
                this.initialFetch();
                this.div_tipoproducto.show(this.selectTipoProductoView);
            },

            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({
                    "guardarproducto":new GuardarProducto()
                });
            },
            initialFetch: function () {
                var self=this;
                this.selectTipoProductoView.fetchTipoProductos();
            },

            habilitar_nuevo_producto:function(){
                this.div_tipopro_modificar.reset();
                this.selectTipoProductoView.fetchTipoProductos();
                this.div_tipoproducto.show(this.selectTipoProductoView);
                $('#nuevo').show();
                $('#modificar').hide()
            },
            habilitar_modificar_producto:function(){
                var self=this;
                $('#nuevo').hide();
                $('#modificar').show();
                this.div_tipopro_modificar.show(this.selectTipoProductoView)
                this.traerProductos.fetchProductos(function(){
                    self.div_tabla_producto.show(self.traerProductos);
                });


            },
            habilitar_salida_producto:function(){
                $('#rsp').show();
                $('#rep').hide();
                $('#grep').hide();
            },
            habilitar_entrada_producto:function(){
                $('#rep').show();
                $('#rsp').hide();
                $('#grep').hide();
            },
            habilitar_reportes:function(){
                $('#grep').show();
                $('#rsp').hide();
                $('#rep').hide();
            },
            insertar_nuevo_producto:function(){
                var self=this;
                this.model.get("guardarproducto").set({
                    "nombre":$('#nom_pro').val(),
                    "tipo":$('#t_producto').val(),
                    "porc_precio":$('#porc_precio').val(),
                    "uni_medida":$('#uni_medida').val(),
                    "cantidad":$('#cantidad').val()
                });

                this.model.get("guardarproducto").url = "rest/almacen/guardar_producto";

                var self_s = this.model.get("guardarproducto").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    alert("el nuevo producto se registro correctamente")
                });
            },

            cargar_producto_a_modificar:function(ev){
                var self=this;
                var clickedElement=$(ev.currentTarget);
                $('#mod_prec_venta').val(clickedElement.attr('data'));
                $('#codigo_modificar').val(clickedElement.parent().parent().attr('id'));
                $('#t_producto').val(clickedElement.parent().parent().children(':nth-child(2)').attr('data'));
                $('#nom_pro_modificar').val(clickedElement.parent().parent().children(':nth-child(3)').text());
            },

            actualizar_producto:function(){
                var self=this;
                this.model.get("guardarproducto").set({
                    "nombre":$('#nom_pro_modificar').val(),
                    "tipo":$('#t_producto').val(),
                    "porc_precio":$('#mod_prec_venta').val(),
                    "codigo":$('#codigo_modificar').val()
                });

                this.model.get("guardarproducto").url = "rest/almacen/actualizar_producto";

                var self_s = this.model.get("guardarproducto").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    self.traerProductos.fetchProductos(function(){
                        alert("actualizacion exitosa")
                        self.div_tabla_producto.show(self.traerProductos);
                    });
                });
            },

            eliminar_producto:function(){
                var self=this;
                var url="rest/almacen/eliminar_producto/"+$('#codigo_modificar').val();
                $.ajax({
                   type:"DELETE",
                    url:url,
                    success: function(){
                        alert("producto eliminado");
                        self.traerProductos.fetchProductos(function(){
                            self.div_tabla_producto.show(self.traerProductos);
                        });
                    },
                    error:function(){
                        alert("producto eliminado");
                        self.traerProductos.fetchProductos(function(){
                            self.div_tabla_producto.show(self.traerProductos);
                            $('#mod_prec_venta').val("");
                            $('#codigo_modificar').val("");
                            $('#t_producto').val("");
                            $('#nom_pro_modificar').val("");
                        });
                    }
                });
            }
        });
    });
    return TiendaAndre.AlmacenApp.List.View;
});