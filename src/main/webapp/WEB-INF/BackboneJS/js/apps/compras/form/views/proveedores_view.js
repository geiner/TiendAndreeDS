/**
 * Created by esantiago on 06/12/2014.
 */
define([ 'backbone', 'marionette', 'apps/compras/form/collection/proveedores_collection', 'hbs! apps/compras/form/templates/tabla_proveedores' ],
    function (Backbone, Marionette, ProveedorCollection,TablaProveedorTemplate) {
        var Proveedor = Backbone.Marionette.ItemView.extend({
            template: TablaProveedorTemplate,
            collection: new ProveedorCollection(),
            fetchProveedores: function (callback) {
                this.collection.setUrlProveedor();
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Proveedor;
    }
);