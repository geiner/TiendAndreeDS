define(['backbone', 'apps/ventas/form/model/tabla_producto_pedido'], function (Backbone, ProductoModel) {

    var Productos = Backbone.Collection.extend({

        model: ProductoModel,
        setUrlProductosPedido: function(n_pedido){
            this.url='rest/ventas/traerproducto_por_venta/'+n_pedido;
        }

    });
    return Productos;
});