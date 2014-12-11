define(["app", "hbs!apps/ventas/form/templates/ventasLayout", "apps/almacen/form/views/select_tipoproducto_view",
    "apps/ventas/form/views/select_producto_view", "apps/ventas/form/model/pedido", "apps/ventas/form/model/producto",
    "apps/ventas/form/views/tabla_productos_pedido","apps/ventas/form/model/venta","apps/ventas/form/views/tabla_consultar_venta",
    "bootstrap"], function (TiendaAndre, layoutTpl, SelectTipoProductoView, TraerProductos, PedidoModel,
                            ProductoModel,ProductosPedido,VentaModel,ConsultarVenta) {
    TiendaAndre.module('VentasApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,
            selectTipoProductoView: new SelectTipoProductoView(),
            traerProductos: new TraerProductos(),
            productosPedido:new ProductosPedido(),
            consultarVenta:new ConsultarVenta(),

            numero_pedido: null,
            costo_total_pedido: 0,
            tipo_pedido: null,

            cod_producto: [],

            regions: {
                div_select_tipoproducto: "#div_select_tipoproducto",
                div_select_producto: "#div_select_producto",
                div_tabla_productos_rv:"#div_tabla_productos_rv",
                div_tabla_consultar_venta:"#div_tabla_consultar_venta"
            },

            events: {
                "change #tipo_venta": "change_tipo_venta",
                "change #t_producto": "change_producto",
                "click #agregar_producto": "agregar_producto_a_pedido",
                "click .sacar_fila": "sacar_producto_tabla",
                "click #registrar_pedido": "registrar_pedido",
                "click #enviar_almacen": "enviar_almacen",
                "click #registrar_venta": "registrar_venta",
                "click #cancelar_pedido": "cancelar_pedido",
                "change #tipo_comp":"change_tipo_comp",
                "click #registrar_v":"registrar_v",
                "click #buscar_venta":"buscar_venta"
            },

            onRender: function () {
                this.initialFetch();
                this.div_select_tipoproducto.show(this.selectTipoProductoView);
                this.div_select_producto.show(this.traerProductos)
            },

            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({
                    pedidomodel: new PedidoModel(),
                    productomodel: new ProductoModel(),
                    ventamodel:new VentaModel()
                });
            },
            initialFetch: function () {
                var self = this;
                this.selectTipoProductoView.fetchTipoProductos(function () {
                    $('#lb_t_producto').removeClass('col-md-5');
                    $('#div_t_producto').removeClass('col-md-7');
                    $('#lb_t_producto').addClass('col-md-4');
                    $('#div_t_producto').addClass('col-md-8');
                });

                self.traerProductos.fetchProductos(0)
            },

            change_tipo_venta: function () {
                var self = this;
                this.model.get("pedidomodel").url = "rest/ventas/numero_pedido";
                var fetch_s = this.model.get("pedidomodel").fetch({});
                fetch_s.done(function () {
                    self.numero_pedido = self.model.get("pedidomodel").get("n_pedido");
                    $('#n_pedido').val(self.numero_pedido);
                });
                self.tipo_pedido = $('#tipo_venta').val();
                if ($('#tipo_venta').val() == 1) {
                    $('#fila1').show();
                    $('#fila2').show();
                    $('#fila3').show()
                    $('#fila4').show()
                    $('#fila5').show();
                    $('#enviar_almacen').removeAttr('disabled', 'disabled');
                } else {
                    if ($('#tipo_venta').val() == 2) {
                        $('#fila1').show();
                        $('#fila2').show();
                        $('#fila3').show()
                        $('#fila4').show()
                        $('#fila5').show()
                        $('#enviar_almacen').attr('disabled', 'disabled');
                    } else {
                        $('#fila1').hide();
                        $('#fila2').hide();
                        $('#fila3').hide()
                        $('#fila4').hide()
                        $('#fila5').hide();
                        $('#enviar_almacen').attr('disabled', 'disabled');
                    }
                }
            },

            change_producto: function () {
                var self = this;
                self.traerProductos.fetchProductos($('#t_producto').val(), function () {
                    self.div_select_producto.show(self.traerProductos)
                })
            },

            agregar_producto_a_pedido: function () {
                var self = this;
                var id_producto = $('#n_producto').val();
                this.model.get("productomodel").url = "rest/ventas/buscar_producto/" + id_producto;
                var fetch_s = this.model.get("productomodel").fetch({ data: $.param({"id": id_producto}) });
                fetch_s.done(function () {
                    if ($('#cantidad').val() <= self.model.get("productomodel").get("cantidad")) {
                        var codigo = self.model.get("productomodel").get("codigo");
                        self.cod_producto.push(codigo);
                        for (var i = 0; i < self.cod_producto.length; i++) {
                            console.log(self.cod_producto[i] + "-" + i);
                        }
                        var nombre = self.model.get("productomodel").get("nombre");
                        var cantidad = $('#cantidad').val();
                        var stock = self.model.get("productomodel").get("cantidad");
                        var precio_unitario = self.model.get("productomodel").get("porc_precio");
                        var precio_total = precio_unitario * cantidad;
                        self.costo_total_pedido = self.costo_total_pedido + precio_total;
                        $('#costo_total').text(self.costo_total_pedido);
                        $('#tabla_productos_pedido > tbody ').append('<tr id="' + codigo + '">' +
                            '<td>' + nombre + '</td>' +
                            '<td>' + cantidad + '</td>' +
                            '<td>' + stock + '</td>' +
                            '<td>' + precio_unitario + '</td>' +
                            '<td>' + precio_total + '</td>' +
                            '<td><button class="btn btn-danger small sacar_fila"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
                    } else {
                        alert("el stock no abastece")
                    }
                });
            },

            sacar_producto_tabla: function (ev) {
                var self = this;
                var clickedElement = $(ev.currentTarget);
                clickedElement.parent().parent().remove();
                alert(clickedElement.parent().parent().attr('id') + "-")
                alert(self.cod_producto.indexOf(parseInt(clickedElement.parent().parent().attr('id'))))
                self.cod_producto.splice(self.cod_producto.indexOf(parseInt(clickedElement.parent().parent().attr('id'))), 1);
                for (var i = 0; i < self.cod_producto.length; i++) {
                    console.log(self.cod_producto[i]);
                }
                self.costo_total_pedido = self.costo_total_pedido - clickedElement.parent().parent().children(':nth-child(5)').text();
                $('#costo_total').text(self.costo_total_pedido);
            },

            registrar_pedido: function () {
                var self = this;
                this.model.get("pedidomodel").set({
                    "n_pedido": self.numero_pedido,
                    "tipo_pedido": self.tipo_pedido,
                    "estado": "P",
                    "costo_total": self.costo_total_pedido
                });

                this.model.get("pedidomodel").url = "rest/ventas/registrar_pedido";

                var self_s = this.model.get("pedidomodel").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    alert("pedido registrado")
                    for (var i = 0; i < self.cod_producto.length; i++) {
                        var contador = i;
                        self.model.get("pedidomodel").set({
                            "n_pedido": self.numero_pedido,
                            "cod_producto": self.cod_producto[i],
                            "cantidad": $('#' + self.cod_producto[i]).children(':nth-child(2)').text(),
                            "costo": $('#' + self.cod_producto[i]).children(':nth-child(5)').text()
                        });

                        self.model.get("pedidomodel").url = "rest/ventas/registrar_detalle_pedido";

                        var self_s = self.model.get("pedidomodel").save({}, {wait: true});

                        self_s.done(function () {
                        });

                        self_s.fail(function () {
                            if (contador == (self.cod_producto.length - 1)) {
                                self.cod_producto.length = 0;
                                /*$('#tabla_productos_pedido > tbody > tr ').remove();
                                 $('#fila1').hide();
                                 $('#fila2').hide();
                                 $('#fila3').hide();
                                 $('#fila4').hide();
                                 $('#fila5').hide();
                                 $('#tipo_venta').val(99);*/
                                $('#t_producto').val(99);
                                $('#n_producto').val(99);
                                $('#cantidad').val("");
                                $('#cancelar_pedido').attr('disabled', 'disabled');
                                self.costo_total_pedido = 0;
                            }
                        });
                    }
                });

            },

            enviar_almacen: function () {
                alert("update")
            },

            registrar_venta: function () {
                var self=this;
                $('#m_pedido_venta').val(this.numero_pedido)
                $('#rv').click();
                var costo_total=0;
                this.productosPedido.fetchProductosPedido(this.numero_pedido, function () {
                    for(var i=0;i<self.productosPedido.collection.length;i++){
                        costo_total=costo_total+self.productosPedido.collection.at(i).get("costo");
                        if(i==(self.productosPedido.collection.length-1)){
                            $('#poner_costo').text(costo_total);
                        };
                    }
                });
                self.div_tabla_productos_rv.show(self.productosPedido);
            },

            cancelar_pedido: function () {
                var self=this;
                self.cod_producto.length = 0;
                $('#tabla_productos_pedido > tbody > tr ').remove();
                $('#fila1').hide();
                $('#fila2').hide();
                $('#fila3').hide();
                $('#fila4').hide();
                $('#fila5').hide();
                $('#tipo_venta').val(99);
                $('#t_producto').val(99);
                $('#n_producto').val(99);
                $('#cantidad').val("");
                self.costo_total_pedido = 0;
            },

            change_tipo_comp: function () {
                if($('#tipo_comp').val()==1){
                    $('#div_ruc').hide();
                    $('#ruc').val("")
                }else{
                    $('#div_ruc').show();
                    $('#ruc').val("")
                }
            },

            registrar_v: function () {
                var self=this;
                $('#r_nombres').val($('#nombres').val());
                $('#r_apellidos').val($('#apellidos').val());
                $('#r_dni').val($('#dni').val());
                $('#r_direccion').val($('#direccion').val());
                $('#r_n_pedido').val($('#m_pedido_venta').val());
                $('#r_usuario').val($('#user').text());

                $('#f_nombres').val($('#nombres').val());
                $('#f_apellidos').val($('#apellidos').val());
                $('#f_dni').val($('#dni').val());
                $('#f_direccion').val($('#direccion').val());
                $('#f_n_pedido').val($('#m_pedido_venta').val());
                $('#f_usuario').val($('#user').text());
                $('#f_ruc').val($('#ruc').val());
                self.model.get("ventamodel").set({
                    "n_pedido": self.numero_pedido,
                    "tipo_comprobante": $('#tipo_comp').val(),
                    "nombres": $('#nombres').val(),
                    "apellidos": $('#apellidos').val(),
                    "dni": $('#dni').val(),
                    "direccion": $('#direccion').val(),
                    "ruc": $('#ruc').val()
                });

                self.model.get("ventamodel").url = "rest/ventas/registrar_venta";

                var self_s = self.model.get("ventamodel").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    alert("se registro la venta");
                    if($('#tipo_comp').val()==1){
                       $('#boton_boleta_venta').click();
                    }else{
                        $('#boton_factura_venta').click();
                    }
                });
            },

            buscar_venta: function () {
                var self=this;
                var costo_total=0;
                this.consultarVenta.fetchConsultarVenta($('#pedido_ingresado').val(), function () {
                    for(var i=0;i<self.consultarVenta.collection.length;i++){
                        costo_total=costo_total+self.consultarVenta.collection.at(i).get("costo");
                        if(i==(self.consultarVenta.collection.length-1)){
                            $('#text_costo_total').text(costo_total);
                            $('#consultar_nombre').val(self.consultarVenta.collection.at(i).get("nombres"));
                            $('#consultar_apellidos').val(self.consultarVenta.collection.at(i).get("apellidos"));
                            $('#consultar_dni').val(self.consultarVenta.collection.at(i).get("dni"));
                            $('#consultar_direccion').val(self.consultarVenta.collection.at(i).get("direccion"));
                            $('#consultar_fecha').val(self.consultarVenta.collection.at(i).get("fecha"))
                        };
                    };
                });
                this.div_tabla_consultar_venta.show(this.consultarVenta);
            }
        });
    });
    return TiendaAndre.VentasApp.List.View;
});