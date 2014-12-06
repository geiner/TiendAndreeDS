define(["app", "apps/inicio/principal/principalView"], function(TiendaAndre, View){
    TiendaAndre.module('PrincipalApp.List',function(Principal, TiendaAndre,Backbone, Marionette, $, _){
        Principal.Controller = {
            IniciarModulo: function(){
                var inicioLayout = new View.Layout();

                TiendaAndre.mainRegion.show(inicioLayout);
            }
        }
    });

    return TiendaAndre.PrincipalApp.List.Controller;
});