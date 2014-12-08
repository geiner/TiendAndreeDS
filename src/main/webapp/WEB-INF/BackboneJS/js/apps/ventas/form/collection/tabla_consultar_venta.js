define(['backbone', 'apps/ventas/form/model/tabla_consultar_venta_model'], function (Backbone, VentaModel) {

    var Venta = Backbone.Collection.extend({

        model: VentaModel,
        setUrlConsultarVenta: function(n_pedido){
            this.url='rest/ventas/consultar_venta/'+n_pedido;
        }

    });
    return Venta;
});