define(["app", "apps/admin/form/formView"], function(TiendaAndre, View){
    TiendaAndre.module('Admin.Form',function(Admin, TiendaAndre,Backbone, Marionette, $, _){
        Admin.Controller = {
            AdminModulo: function(){
                var adminLayout = new View.Layout();

                TiendaAndre.mainRegion.show(adminLayout);
            }
        }
    });

    return TiendaAndre.Admin.Form.Controller;
});