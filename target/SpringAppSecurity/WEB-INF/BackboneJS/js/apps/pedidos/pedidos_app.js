define(["app"], function(TiendaAndre){

    TiendaAndre.module('PedidosApp', function(PedidosApp, TiendaAndre, Backbone, Marionette, $, _){

        PedidosApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "pedidos": "IniciarPedidos"
                /*"asistencia_docente":"Asistencia_docente"*/

            }
        });

        var API = {
            IniciarPedidos: function(){
                    require(["apps/pedidos/form/formController"], function(PedidosController){
                        PedidosController.PedidosModulo();
                    });
            }
        };

        TiendaAndre.addInitializer(function(){
            new PedidosApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return TiendaAndre.PedidosApp;
});