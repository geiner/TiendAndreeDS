define(['backbone', 'apps/pedidos/form/model/select_producto_model'], function (Backbone, SelectProductoModel) {

    var Producto = Backbone.Collection.extend({

        model: SelectProductoModel,
        setUrlProductos: function(categoria){
            this.url='rest/pedido/producto/'+categoria;
        }

    });
    return Producto;
});