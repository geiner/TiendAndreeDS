define([ 'backbone', 'marionette', 'apps/ventas/form/collection/select_producto_collection', 'hbs! apps/ventas/form/templates/select_producto' ],
    function (Backbone, Marionette, SelectProductoCollection,SelectProductoTemplate) {
        var Productos = Backbone.Marionette.ItemView.extend({
            template: SelectProductoTemplate,
            collection: new SelectProductoCollection(),
            fetchProductosVenta: function (id,callback) {
                this.collection.setUrlProductosVenta(id);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Productos;
    }
);


