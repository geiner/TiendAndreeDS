define([ 'backbone', 'marionette', 'apps/pedidos/form/collection/select_tipoproducto_collection', 'hbs! apps/pedidos/form/templates/select_tipoproducto' ],
    function (Backbone, Marionette, SelectTipoProductoCollection,SelectTipoProductoTemplate) {
        var TipoProducto = Backbone.Marionette.ItemView.extend({
            template: SelectTipoProductoTemplate,
            collection: new SelectTipoProductoCollection(),
            fetchTipoProductos: function (callback) {
                this.collection.setUrlTipoProductos();
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return TipoProducto;
    }
);


