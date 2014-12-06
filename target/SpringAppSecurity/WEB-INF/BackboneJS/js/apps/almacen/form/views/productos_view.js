define([ 'backbone', 'marionette', 'apps/almacen/form/collection/productos_collection', 'hbs! apps/almacen/form/templates/tabla_mod_producto' ],
    function (Backbone, Marionette, ProductosCollection,TablaProductoTemplate) {
        var Productos = Backbone.Marionette.ItemView.extend({
            template: TablaProductoTemplate,
            collection: new ProductosCollection(),
            fetchProductos: function (callback) {
                this.collection.setUrlProductos();
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Productos;
    }
);


