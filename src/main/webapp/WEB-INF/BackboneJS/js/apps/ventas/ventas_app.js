define(["app"], function(TiendaAndre){

    TiendaAndre.module('VentasApp', function(VentasApp, TiendaAndre, Backbone, Marionette, $, _){

        VentasApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "ventas": "IniciarVentas"
                /*"asistencia_docente":"Asistencia_docente"*/

            }
        });

        var API = {
            IniciarVentas: function(){
                require(["apps/ventas/form/formController"], function(VentasController){
                    VentasController.VentasModulo();
                });
            }
        };

        TiendaAndre.addInitializer(function(){
            new VentasApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return TiendaAndre.VentasApp;
});