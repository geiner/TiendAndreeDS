define(["marionette"], function(Marionette){

    var TiendaAndre = new Marionette.Application();

    TiendaAndre.addRegions({
        headerRegion: "#header-region",
        mainRegion: "#main-region"
    });

    TiendaAndre.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    TiendaAndre.getCurrentRoute = function(){
        return Backbone.history.fragment
    };

    TiendaAndre.on("initialize:after", function(){
        if(Backbone.history){
            require(["apps/inicio/inicio_app"
                ,"apps/almacen/almacen_app","apps/ventas/ventas_app",
                "apps/compras/compras_app","apps/admin/admin_app"], function () {       //para cada modulo agregar la url donde se encuentra apps/planillas/planillas_app
                Backbone.history.start();

                if(TiendaAndre.getCurrentRoute() === ""){
                    TiendaAndre.trigger("iniciar:list");   //inicia con contratos
                }
            });
        }
    });

    return TiendaAndre;
});
