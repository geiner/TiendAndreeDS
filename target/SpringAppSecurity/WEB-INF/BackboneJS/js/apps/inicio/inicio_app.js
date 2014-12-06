define(["app"], function(TiendaAndre){

    TiendaAndre.module('InicioApp', function(InicioApp, TiendaAndre, Backbone, Marionette, $, _){

        InicioApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "inicio": "IniciarModulo"
            }
        });

        var API = {
            IniciarModulo: function(){
                    require(["apps/inicio/principal/principalController"], function(PrincipalController){
                        PrincipalController.IniciarModulo();
                    });
            }
        };

        TiendaAndre.on("iniciar:list", function(){
            console.log(' on submodulos list');
            TiendaAndre.navigate("inicio");
            API.IniciarModulo();
        });

        TiendaAndre.addInitializer(function(){
            new InicioApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return TiendaAndre.InicioApp;
});