define(["app", "apps/compras/form/formView"], function(TiendaAndre, View){
    TiendaAndre.module('Compras.Form',function(Compras, TiendaAndre,Backbone, Marionette, $, _){
        Compras.Controller = {
            ComprasModulo: function(){
                var comprasLayout = new View.Layout();

                TiendaAndre.mainRegion.show(comprasLayout);
            }
        }
    });

    return TiendaAndre.Compras.Form.Controller;
});