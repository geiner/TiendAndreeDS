define(["app", "hbs!apps/ventas/form/templates/ventasLayout","apps/almacen/form/views/select_tipoproducto_view",
    "apps/ventas/form/views/select_producto_view","apps/ventas/form/model/pedido","apps/ventas/form/model/producto",
    "bootstrap"], function (TiendaAndre, layoutTpl,SelectTipoProductoView,TraerProductos,PedidoModel,ProductoModel) {
    TiendaAndre.module('VentasApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,
            selectTipoProductoView:new SelectTipoProductoView(),
            traerProductos:new TraerProductos(),

            numero_pedido:null,
            costo_total_pedido:0,
            tipo_pedido:null,

            cod_producto:[],

            regions:{
                div_select_tipoproducto:"#div_select_tipoproducto",
                div_select_producto:"#div_select_producto"
            },

            events:{
                "change #tipo_venta":"change_tipo_venta",
                "change #t_producto":"change_producto",
                "click #agregar_producto":"agregar_producto_a_pedido",
                "click .sacar_fila":"sacar_producto_tabla",
                "click #registrar_pedido":"registrar_pedido"
            },

            onRender:function(){
                this.initialFetch();
                this.div_select_tipoproducto.show(this.selectTipoProductoView);
                this.div_select_producto.show(this.traerProductos)
            },

            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({
                    pedidomodel:new PedidoModel(),
                    productomodel:new ProductoModel()
                });
            },
            initialFetch: function () {
                var self=this;
                this.selectTipoProductoView.fetchTipoProductos(function(){
                    $('#lb_t_producto').removeClass('col-md-5');
                    $('#div_t_producto').removeClass('col-md-7');
                    $('#lb_t_producto').addClass('col-md-4');
                    $('#div_t_producto').addClass('col-md-8');
                });

                self.traerProductos.fetchProductos(0)
            },

            change_tipo_venta:function(){
                var self=this;
                this.model.get("pedidomodel").url = "rest/ventas/numero_pedido";
                var fetch_s = this.model.get("pedidomodel").fetch({});
                fetch_s.done(function () {
                    self.numero_pedido=self.model.get("pedidomodel").get("n_pedido");
                    $('#n_pedido').val(self.numero_pedido);
                });
                self.tipo_pedido=$('#tipo_venta').val();
                if($('#tipo_venta').val()==1){
                    $('#fila1').show();
                    $('#fila2').show();
                    $('#fila3').show()
                    $('#fila4').show()
                    $('#fila5').show()
                }else{
                    if($('#tipo_venta').val()==2){
                        $('#fila1').show();
                        $('#fila2').show();
                        $('#fila3').show()
                        $('#fila4').show()
                        $('#fila5').show()
                    }else{
                        $('#fila1').hide();
                        $('#fila2').hide();
                        $('#fila3').hide()
                        $('#fila4').hide()
                        $('#fila5').hide()
                    }
                }
            },

            change_producto:function(){
                var self=this;
                self.traerProductos.fetchProductos($('#t_producto').val(),function(){
                    self.div_select_producto.show(self.traerProductos)
                })
            },

            agregar_producto_a_pedido: function () {
                var self=this;
                var id_producto=$('#n_producto').val();
                this.model.get("productomodel").url = "rest/ventas/buscar_producto/"+id_producto;
                var fetch_s = this.model.get("productomodel").fetch({ data: $.param({"id": id_producto}) });
                fetch_s.done(function () {
                    if($('#cantidad').val()<=self.model.get("productomodel").get("cantidad")){
                        var codigo=self.model.get("productomodel").get("codigo");
                        self.cod_producto.push(codigo);
                        var nombre=self.model.get("productomodel").get("nombre");
                        var cantidad=$('#cantidad').val();
                        var stock=self.model.get("productomodel").get("cantidad");
                        var precio_unitario=self.model.get("productomodel").get("porc_precio");
                        var precio_total=precio_unitario*cantidad;
                        self.costo_total_pedido=self.costo_total_pedido+precio_total;
                        $('#costo_total').text(self.costo_total_pedido);
                        $('#tabla_productos_pedido > tbody ').append('<tr id="'+codigo+'">'+
                            '<td>'+nombre+'</td>' +
                            '<td>'+cantidad+'</td>' +
                            '<td>'+stock+'</td>' +
                            '<td>'+precio_unitario+'</td>' +
                            '<td>'+precio_total+'</td>' +
                            '<td><button class="btn btn-danger small sacar_fila"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
                    }else{
                        alert("el stock no abastece")
                    }
                });
            },

            sacar_producto_tabla: function (ev) {
                var self=this;
                var clickedElement=$(ev.currentTarget);
                clickedElement.parent().parent().remove();
                this.cod_producto.indexOf(clickedElement.parent().parent().attr('id'), 1)
                self.costo_total_pedido=self.costo_total_pedido-clickedElement.parent().parent().children(':nth-child(5)').text();
                $('#costo_total').text(self.costo_total_pedido);
            },

            registrar_pedido: function () {
                var self=this;
                this.model.get("pedidomodel").set({
                    "n_pedido":self.numero_pedido,
                    "tipo_pedido":self.tipo_pedido,
                    "estado":"P",
                    "costo_total":self.costo_total_pedido
                });

                this.model.get("pedidomodel").url = "rest/ventas/registrar_pedido";

                var self_s = this.model.get("pedidomodel").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    alert("pedido registrado")
                    for(var i=0;i<self.cod_producto.length;i++){
                        self.model.get("pedidomodel").set({
                            "n_pedido":self.numero_pedido,
                            "cod_producto":self.cod_producto[i],
                            "cantidad":$('#'+self.cod_producto[i]).children(':nth-child(2)').text(),
                            "costo":$('#'+self.cod_producto[i]).children(':nth-child(5)').text()
                        });

                        self.model.get("pedidomodel").url = "rest/ventas/registrar_detalle_pedido";

                        var self_s = self.model.get("pedidomodel").save({}, {wait: true});

                        self_s.done(function () {
                        });

                        self_s.fail(function () {
                            alert("detalle pedido registrado")
                            self.cod_producto.indexOf(self.cod_producto[i], 1)
                        });
                    }
                });

            }
        });
    });
    return TiendaAndre.VentasApp.List.View;
});