define(["app", "hbs!apps/pedidos/form/templates/pedidosLayout","apps/pedidos/form/views/select_tipoproducto_view",
    "apps/pedidos/form/views/select_producto_view",/*"apps/pedidos/form/view/input_numpedido_view",*/
    "bootstrap"], function (TiendaAndre, layoutTpl,SelectTipoProductoView,SelectProductoView) {
    TiendaAndre.module('PedidosApp.Form.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            selectTipoProductoView:new SelectTipoProductoView(),
            selectProductoView:new SelectProductoView(),

            regions:{
                div_select_tipoproducto:"#div_select_tipoproducto",
                div_select_producto:'#div_select_producto'
            },
            events:{
                "change #t_producto":"change_productos"
            },
            onRender:function(){
                this.initialFetch();
                this.div_select_tipoproducto.show(this.selectTipoProductoView);
                this.div_select_producto.show(this.selectProductoView);
            },
            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({
                });
            },
            initialFetch: function () {
                var self=this;
                this.selectTipoProductoView.fetchTipoProductos();
            },
            change_productos: function () {
                var self=this;
                self.selectProductoView.fetchProductos($('#t_producto').val());
            }
        });
    });
    return TiendaAndre.PedidosApp.Form.View;
});