define(["app", "apps/almacen/form/formView"], function(TiendaAndre, View){
    TiendaAndre.module('Almacen.Form',function(Almacen, TiendaAndre,Backbone, Marionette, $, _){
        Almacen.Controller = {
            AlmacenModulo: function(){
                var almacenLayout = new View.Layout();

                TiendaAndre.mainRegion.show(almacenLayout);
            }
        }
    });

    return TiendaAndre.Almacen.Form.Controller;
});