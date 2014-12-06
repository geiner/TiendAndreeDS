define(["app", "apps/ventas/form/formView"], function(TiendaAndre, View){
    TiendaAndre.module('Ventas.Form',function(Ventas, TiendaAndre,Backbone, Marionette, $, _){
        Ventas.Controller = {
            VentasModulo: function(){
                var ventasLayout = new View.Layout();

                TiendaAndre.mainRegion.show(ventasLayout);
            }
        }
    });

    return TiendaAndre.Ventas.Form.Controller;
});