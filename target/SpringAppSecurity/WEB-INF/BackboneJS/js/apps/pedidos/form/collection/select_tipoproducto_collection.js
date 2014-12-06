define(['backbone', 'apps/pedidos/form/model/select_tipoproducto_model'], function (Backbone, SelectTipoProductoModel) {

    var TipoProducto = Backbone.Collection.extend({

        model: SelectTipoProductoModel,
        setUrlTipoProductos: function(){
            this.url='rest/pedido/tipo_producto';
        }

    });
    return TipoProducto;
});