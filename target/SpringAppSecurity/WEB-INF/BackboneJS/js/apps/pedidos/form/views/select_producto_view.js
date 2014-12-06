define([ 'backbone', 'marionette', 'apps/pedidos/form/collection/select_producto_collection', 'hbs! apps/pedidos/form/templates/select_producto' ],
    function (Backbone, Marionette, SelectProductoCollection,SelectProductoTemplate) {
        var Producto = Backbone.Marionette.ItemView.extend({
            template: SelectProductoTemplate,
            collection: new SelectProductoCollection(),
            fetchProductos: function (categoria,callback) {
                this.collection.setUrlProductos(categoria);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Producto;
    }
);


