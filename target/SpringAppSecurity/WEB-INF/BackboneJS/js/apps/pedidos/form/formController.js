define(["app", "apps/pedidos/form/formView"], function(TiendaAndre, View){
    TiendaAndre.module('Pedidos.Form',function(Pedidos, TiendaAndre,Backbone, Marionette, $, _){
        Pedidos.Controller = {
            PedidosModulo: function(){
                var pedidosLayout = new View.Layout();

                TiendaAndre.mainRegion.show(pedidosLayout);
            }
        }
    });

    return TiendaAndre.Pedidos.Form.Controller;
});