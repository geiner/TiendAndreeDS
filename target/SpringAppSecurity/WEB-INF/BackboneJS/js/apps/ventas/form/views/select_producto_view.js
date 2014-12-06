define([ 'backbone', 'marionette', 'apps/ventas/form/collection/select_producto_collection', 'hbs! apps/ventas/form/templates/select_producto' ],
    function (Backbone, Marionette, SelectProductoCollection,SelectProductoTemplate) {
        var Productos = Backbone.Marionette.ItemView.extend({
            template: SelectProductoTemplate,
            collection: new SelectProductoCollection(),
            fetchProductos: function (id,callback) {
                this.collection.setUrlProductos(id);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Productos;
    }
);


