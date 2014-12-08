/**
 * Created by esantiago on 07/12/2014.
 */
define(['backbone', 'apps/compras/form/model/proveedor'], function (Backbone, SelectProveedorModel) {

    var Proveedor = Backbone.Collection.extend({

        model: SelectProveedorModel,
        setUrlProveedor: function(){
            this.url='rest/compras/traer_x_proveedor';
        }

    });
    return Proveedor;
});