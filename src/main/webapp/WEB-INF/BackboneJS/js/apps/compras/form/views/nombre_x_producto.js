/**
 * Created by esantiago on 07/12/2014.
 */
define([ 'backbone', 'marionette', 'apps/compras/form/collection/nombre_producto', 'hbs! apps/compras/form/templates/combo_producto' ],
    function (Backbone, Marionette, SelectProductoCollection,SelectProductoTemplate) {
        var Producto = Backbone.Marionette.ItemView.extend({
            template: SelectProductoTemplate,
            collection: new SelectProductoCollection(),
            fetchProductos: function (callback) {
                this.collection.setUrlProductos();
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Producto;
    }
);
