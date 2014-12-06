define(["app"], function(TiendaAndre){

    TiendaAndre.module('AdminApp', function(AdminApp, TiendaAndre, Backbone, Marionette, $, _){

        AdminApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "admin": "IniciarAdmin"
            }
        });

        var API = {
            IniciarAdmin: function(){
                require(["apps/admin/form/formController"], function(AdminController){
                    AdminController.AdminModulo();
                });
            }
        };

        TiendaAndre.addInitializer(function(){
            new AdminApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return TiendaAndre.AdminApp;
});