/**
 * Created by esantiago on 07/12/2014.
 */
define(['backbone', 'apps/compras/form/model/producto'], function (Backbone, SelectProductoModel) {

    var Producto = Backbone.Collection.extend({

        model: SelectProductoModel,
        setUrlProductos: function(){
            this.url='rest/compras/traer_x_producto';
        }

    });
    return Producto;
});
