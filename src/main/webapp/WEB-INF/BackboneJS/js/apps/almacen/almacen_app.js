define(["app"], function(TiendaAndre){

    TiendaAndre.module('AlmacenApp', function(AlmacenApp, TiendaAndre, Backbone, Marionette, $, _){

        AlmacenApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "almacen": "IniciarAlmacen"
                /*"asistencia_docente":"Asistencia_docente"*/

            }
        });

        var API = {
            IniciarAlmacen: function(){
                require(["apps/almacen/form/formController"], function(AlmacenController){
                    AlmacenController.AlmacenModulo();
                });
            }
        };

        TiendaAndre.addInitializer(function(){
            new AlmacenApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return TiendaAndre.AlmacenApp;
});