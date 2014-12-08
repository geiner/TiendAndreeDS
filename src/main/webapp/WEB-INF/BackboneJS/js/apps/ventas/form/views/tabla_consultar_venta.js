define([ 'backbone', 'marionette', 'apps/ventas/form/collection/tabla_consultar_venta',
        'hbs! apps/ventas/form/templates/tabla_consultar_venta' ],
    function (Backbone, Marionette, TablaConsultarCollection,TablaConsultarTemplate) {
        var Ventas = Backbone.Marionette.ItemView.extend({
            template: TablaConsultarTemplate,
            collection: new TablaConsultarCollection(),
            fetchConsultarVenta: function (n_pedido,callback) {
                this.collection.setUrlConsultarVenta(n_pedido);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback)
            }
        });
        return Ventas;
    }
);


