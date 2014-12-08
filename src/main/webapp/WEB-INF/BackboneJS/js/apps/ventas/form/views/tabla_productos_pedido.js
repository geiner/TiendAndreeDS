define([ 'backbone', 'marionette', 'apps/ventas/form/collection/tabla_productos_pedidos',
        'hbs! apps/ventas/form/templates/tabla_productos_venta' ],
    function (Backbone, Marionette, TablaProductoCollection,TablaProductoTemplate) {
        var Productos = Backbone.Marionette.ItemView.extend({
            template: TablaProductoTemplate,
            collection: new TablaProductoCollection(),
            fetchProductosPedido: function (n_pedido,callback) {
                this.collection.setUrlProductosPedido(n_pedido);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Productos;
    }
);


