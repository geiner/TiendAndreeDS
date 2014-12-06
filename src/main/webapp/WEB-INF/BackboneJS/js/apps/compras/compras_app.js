define(["app"], function(TiendaAndre){

    TiendaAndre.module('ComprasApp', function(ComprasApp, TiendaAndre, Backbone, Marionette, $, _){

        ComprasApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "compras": "IniciarCompras"
                /*"asistencia_docente":"Asistencia_docente"*/

            }
        });

        var API = {
            IniciarCompras: function(){
                require(["apps/compras/form/formController"], function(ComprasController){
                    ComprasController.ComprasModulo();
                });
            }
        };

        TiendaAndre.addInitializer(function(){
            new ComprasApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return TiendaAndre.ComprasApp;
});