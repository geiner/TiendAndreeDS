define(['backbone', 'apps/almacen/form/model/producto'], function (Backbone, ProductoModel) {

    var Producto = Backbone.Collection.extend({

        model: ProductoModel,
        setUrlProductos: function(){
            this.url='rest/almacen/traer_productos';
        }

    });
    return Producto;
});