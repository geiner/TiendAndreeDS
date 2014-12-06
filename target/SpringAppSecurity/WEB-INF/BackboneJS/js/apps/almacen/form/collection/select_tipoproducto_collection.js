define(['backbone', 'apps/almacen/form/model/select_tipoproducto_model'], function (Backbone, SelectTipoProductoModel) {

    var TipoProducto = Backbone.Collection.extend({

        model: SelectTipoProductoModel,
        setUrlTipoProductos: function(){
            this.url='rest/almacen/tipo_producto';
        }

    });
    return TipoProducto;
});