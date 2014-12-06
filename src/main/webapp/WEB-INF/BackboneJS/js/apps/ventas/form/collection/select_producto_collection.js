define(['backbone', 'apps/ventas/form/model/select_producto_model'], function (Backbone, SelectProductoModel) {

    var Productos = Backbone.Collection.extend({

        model: SelectProductoModel,
        setUrlProductos: function(id){
            this.url='rest/almacen/productos/'+id;
        }

    });
    return Productos;
});