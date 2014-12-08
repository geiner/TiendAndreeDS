/**
 * Created by esantiago on 07/12/2014.
 */
define([ 'backbone', 'marionette', 'apps/compras/form/collection/nombre_proveedor', 'hbs! apps/compras/form/templates/combo_proveedor' ],
    function (Backbone, Marionette, ProveedorCollection,ProveedorTemplate) {
        var Proveedor = Backbone.Marionette.ItemView.extend({
            template: ProveedorTemplate,
            collection: new ProveedorCollection(),
            fetchProveedor: function (callback) {
                this.collection.setUrlProveedor();
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Proveedor;
    }
);