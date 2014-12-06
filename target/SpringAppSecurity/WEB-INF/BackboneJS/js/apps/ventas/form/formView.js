define(["app", "hbs!apps/ventas/form/templates/ventasLayout","apps/almacen/form/views/select_tipoproducto_view","apps/ventas/form/views/select_producto_view",
    "bootstrap"], function (TiendaAndre, layoutTpl,SelectTipoProductoView,TraerProductos) {
    TiendaAndre.module('VentasApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,
            selectTipoProductoView:new SelectTipoProductoView(),
            traerProductos:new TraerProductos(),

            regions:{
                div_select_tipoproducto:"#div_select_tipoproducto",
                div_select_producto:"#div_select_producto"
            },

            events:{
                "change #tipo_venta":"change_tipo_venta",
                "change #t_producto":"change_producto"
            },

            onRender:function(){
                this.initialFetch();
                this.div_select_tipoproducto.show(this.selectTipoProductoView);
            },

            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({

                });
            },
            initialFetch: function () {
                var self=this;
                this.selectTipoProductoView.fetchTipoProductos(function(){
                    $('#lb_t_producto').removeClass('col-md-5');
                    $('#div_t_producto').removeClass('col-md-7');
                    $('#lb_t_producto').addClass('col-md-4');
                    $('#div_t_producto').addClass('col-md-8');
                });
            },

            change_tipo_venta:function(){
                if($('#tipo_venta').val()==1){
                    $('#fila1').show();
                    $('#fila2').show();
                    $('#fila3').show()
                    $('#fila4').show()
                    $('#fila5').show()
                }else{
                    if($('#tipo_venta').val()==2){
                        $('#fila1').show();
                        $('#fila2').show();
                        $('#fila3').show()
                        $('#fila4').show()
                        $('#fila5').show()
                    }else{
                        $('#fila1').hide();
                        $('#fila2').hide();
                        $('#fila3').hide()
                        $('#fila4').hide()
                        $('#fila5').hide()
                    }
                }
            },

            change_producto:function(){
                var self=this;
                self.traerProductos.fetchProductos($('#t_producto').val(),function(){
                    self.div_select_producto.show(self.traerProductos)
                })
            }
        });
    });
    return TiendaAndre.VentasApp.List.View;
});