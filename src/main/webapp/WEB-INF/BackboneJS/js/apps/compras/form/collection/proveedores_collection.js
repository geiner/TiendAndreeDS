/**
 * Created by esantiago on 06/12/2014.
 */
define(['backbone', 'apps/compras/form/model/proveedor'], function (Backbone, ProveedorModel) {

    var Proveedor = Backbone.Collection.extend({

        model: ProveedorModel,
        setUrlProveedor: function(){
            this.url='rest/compras/traer_proveedor';
        }

    });
    return Proveedor;
});
