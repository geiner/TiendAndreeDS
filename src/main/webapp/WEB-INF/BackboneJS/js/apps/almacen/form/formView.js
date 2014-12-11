define(["app", "hbs!apps/almacen/form/templates/almacenLayout", "apps/almacen/form/views/select_tipoproducto_view", 'apps/almacen/form/model/guardar_producto',
    "apps/almacen/form/views/productos_view", "apps/almacen/form/views/select_tipoproducto_view", "apps/ventas/form/views/select_producto_view",
    "apps/compras/form/views/nombre_x_proveedor","apps/almacen/form/model/entrada",
    "bootstrap"], function (TiendaAndre, layoutTpl, SelectTipoProductoView, GuardarProducto, TraerProductos, SelectTipoProducto,
                            TraerProductos2,ProveedorView,EntradaProducto) {
    TiendaAndre.module('AlmacenApp.List.View', function (View, TiendaAndre, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            precio_total_entrada:0,
            cod_producto: [],
            cod_proveedor: [],

            selectTipoProductoView: new SelectTipoProductoView(),
            traerProductos: new TraerProductos(),
            selectTipoProducto: new SelectTipoProducto(),
            traerProductos2: new TraerProductos2(),
            proveedorView:new ProveedorView(),

            regions: {
                div_tipoproducto: "#div_tipoproducto",
                div_tabla_producto: "#div_tabla_producto",
                div_tipopro_modificar: "#div_tipopro_modificar",
                div_entrada_productos_tipo: "#div_entrada_productos_tipo",
                div_entrada_productos: "#div_entrada_productos",
                combo_x_proveedor:"#combo_x_proveedor"
            },
            events: {
                "click #nuevo_producto": "habilitar_nuevo_producto",
                "click #modificar_producto": "habilitar_modificar_producto",
                "click #salida": "habilitar_salida_producto",
                "click #entrada": "habilitar_entrada_producto",
                "click #reportes": "habilitar_reportes",
                "click #guardar_producto": "insertar_nuevo_producto",
                "click #ver_detalle": "cargar_producto_a_modificar",
                "click #actualizar_producto": "actualizar_producto",
                "click #eliminar_producto": "eliminar_producto",
                "change #t_producto": "change_producto",
                "click #entrada_agregar_tabla":"agregar_producto_tabla_entrada",
                "click .sacar_fila_entrada": "sacar_producto_tabla",
                "click #entrada_guardar":"registrar_entrada_productos"
            },

            onRender: function () {
                this.initialFetch();
                this.div_tipoproducto.show(this.selectTipoProductoView);
                this.div_entrada_productos.show(this.traerProductos2);
                this.combo_x_proveedor.show(this.proveedorView);
            },

            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({
                    "guardarproducto": new GuardarProducto(),
                    "entradaproducto":new EntradaProducto()
                });
            },
            initialFetch: function () {
                var self = this;
                this.selectTipoProductoView.fetchTipoProductos();
                self.traerProductos2.fetchProductosVenta(0, function () {
                    $('#lb_n_producto').removeClass('col-md-4');
                    $('#div_n_producto').removeClass('col-md-8');
                    $('#lb_n_producto').addClass('col-md-5');
                    $('#div_n_producto').addClass('col-md-7');
                });
                this.proveedorView.fetchProveedor();
            },

            habilitar_nuevo_producto: function () {
                var self=this;
                this.div_tipopro_modificar.reset();
                this.div_entrada_productos.reset();
                setTimeout(function(){
                    self.selectTipoProductoView.fetchTipoProductos();
                    self.div_tipoproducto.show(self.selectTipoProductoView);
                },1000)
                $('#nuevo').show();
                $('#modificar').hide()
            },
            habilitar_modificar_producto: function () {
                var self = this;
                $('#nuevo').hide();
                $('#modificar').show();
                this.div_tipopro_modificar.show(this.selectTipoProductoView)
                this.traerProductos.fetchProductos(function () {
                    self.div_tabla_producto.show(self.traerProductos);
                });
            },
            habilitar_salida_producto: function () {
                $('#rsp').show();
                $('#rep').hide();
                $('#grep').hide();
            },
            habilitar_entrada_producto: function () {
                var self = this;
                this.div_tipoproducto.reset();
                setTimeout(function () {
                    self.selectTipoProducto.fetchTipoProductos(function () {
                        self.div_entrada_productos_tipo.show(self.selectTipoProducto);
                    });
                }, 1000);
                self.proveedorView.fetchProveedor();
                self.combo_x_proveedor.show(self.proveedorView);
                $('#rep').show();
                $('#rsp').hide();
                $('#grep').hide();
            },
            habilitar_reportes: function () {
                $('#grep').show();
                $('#rsp').hide();
                $('#rep').hide();
            },
            insertar_nuevo_producto: function () {
                var self = this;
                this.model.get("guardarproducto").set({
                    "nombre": $('#nom_pro').val(),
                    "tipo": $('#t_producto').val(),
                    "porc_precio": $('#porc_precio').val(),
                    "uni_medida": $('#uni_medida').val(),
                    "cantidad": $('#cantidad').val()
                });

                this.model.get("guardarproducto").url = "rest/almacen/guardar_producto";

                var self_s = this.model.get("guardarproducto").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    alert("el nuevo producto se registro correctamente")
                });
            },

            cargar_producto_a_modificar: function (ev) {
                var self = this;
                var clickedElement = $(ev.currentTarget);
                $('#mod_prec_venta').val(clickedElement.attr('data'));
                $('#codigo_modificar').val(clickedElement.parent().parent().attr('id'));
                $('#t_producto').val(clickedElement.parent().parent().children(':nth-child(2)').attr('data'));
                $('#nom_pro_modificar').val(clickedElement.parent().parent().children(':nth-child(3)').text());
            },

            actualizar_producto: function () {
                var self = this;
                this.model.get("guardarproducto").set({
                    "nombre": $('#nom_pro_modificar').val(),
                    "tipo": $('#t_producto').val(),
                    "porc_precio": $('#mod_prec_venta').val(),
                    "codigo": $('#codigo_modificar').val()
                });

                this.model.get("guardarproducto").url = "rest/almacen/actualizar_producto";


                var self_s = this.model.get("guardarproducto").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function () {
                    self.traerProductos.fetchProductos(function () {
                        alert("actualizacion exitosa")
                        self.div_tabla_producto.show(self.traerProductos);
                    });
                });
            },

            eliminar_producto: function () {
                var self = this;
                var url = "rest/almacen/eliminar_producto/" + $('#codigo_modificar').val();
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success: function () {
                        alert("producto eliminado");
                        self.traerProductos.fetchProductos(function () {
                            self.div_tabla_producto.show(self.traerProductos);
                        });
                    },
                    error: function () {
                        alert("producto eliminado");
                        self.traerProductos.fetchProductos(function () {
                            self.div_tabla_producto.show(self.traerProductos);
                            $('#mod_prec_venta').val("");
                            $('#codigo_modificar').val("");
                            $('#t_producto').val("");
                            $('#nom_pro_modificar').val("");
                        });
                    }
                });
            },

            change_producto: function () {
                var self = this;
                self.traerProductos2.fetchProductosVenta($('#t_producto').val(), function () {
                    self.div_entrada_productos.show(self.traerProductos2);
                    $('#lb_n_producto').removeClass('col-md-4');
                    $('#div_n_producto').removeClass('col-md-8');
                    $('#lb_n_producto').addClass('col-md-5');
                    $('#div_n_producto').addClass('col-md-7');
                });
            },

            agregar_producto_tabla_entrada:function(){
                var self=this;
                var cod_producto=$('#n_producto').val();
                var nombre_producto=$("#n_producto option:selected").html();
                var cod_proveedor=$('#combo_proveedor').val();
                var nombre_proveedor=$("#combo_proveedor option:selected").html();
                var cantidad=$('#entrada_cantidad').val();
                var precio_compra=$('#entrada_precio_compra').val();
                var precio_total = (precio_compra * cantidad).toFixed(2);
                this.cod_producto.push($('#n_producto').val());
                this.cod_proveedor.push($('#combo_proveedor').val());
                this.precio_total_entrada=this.precio_total_entrada+parseFloat(precio_total);
                $('#costo_total').text(self.precio_total_entrada);
                $('#tabla_productos_entrada > tbody ').append('<tr id="' + cod_producto + '">' +
                    '<td>' + nombre_producto + '</td>' +
                    '<td>' + nombre_proveedor + '</td>' +
                    '<td>' + cantidad + '</td>' +
                    '<td>' + precio_compra + '</td>' +
                    '<td>' + precio_total + '</td>' +
                    '<td><button class="btn btn-danger small sacar_fila_entrada" data="'+cod_proveedor+'"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
            },

            sacar_producto_tabla: function (ev) {
                var self = this;
                var clickedElement = $(ev.currentTarget);
                clickedElement.parent().parent().remove();
                self.cod_producto.splice(self.cod_producto.indexOf(parseInt(clickedElement.parent().parent().attr('id'))), 1);
                self.cod_proveedor.splice(self.cod_proveedor.indexOf(parseInt(clickedElement.attr('data'))));
                for (var i = 0; i < self.cod_producto.length; i++) {
                    console.log(self.cod_producto[i]+"/"+self.cod_proveedor[i]);
                }
                self.precio_total_entrada = self.precio_total_entrada - parseFloat(clickedElement.parent().parent().children(':nth-child(5)').text());
                $('#costo_total').text(self.precio_total_entrada);
            },

            registrar_entrada_productos:function(){
                var self=this;
                this.model.get("entradaproducto").set({
                    "costo_total": parseFloat(self.precio_total_entrada)
                });

                this.model.get("entradaproducto").url = "rest/almacen/registrar_entrada_productos";

                var self_s = this.model.get("entradaproducto").save({}, {wait: true});

                self_s.done(function () {
                });

                self_s.fail(function(){
                    alert("entrada de productos registrada")
                    for (var i = 0; i < self.cod_producto.length; i++) {
                        var contador = i;
                        self.model.get("entradaproducto").set({
                            "cod_producto": self.cod_producto[i],
                            "cod_proveedor": self.cod_proveedor[i],
                            "cantidad": parseInt($('#' + self.cod_producto[i]).children(':nth-child(3)').text()),
                            "precio_compra": parseFloat($('#' + self.cod_producto[i]).children(':nth-child(4)').text()),
                            "costo_total_producto": parseFloat($('#' + self.cod_producto[i]).children(':nth-child(5)').text()).toFixed(2)
                        });

                        self.model.get("entradaproducto").url = "rest/almacen/registrar_detalle_entrada_productos";

                        var self_s = self.model.get("entradaproducto").save({}, {wait: true});

                        self_s.done(function () {
                        });

                        self_s.fail(function () {
                            if (contador == (self.cod_producto.length - 1)) {
                                self.cod_producto.length = 0;
                                self.cod_proveedor.length = 0;
                                $('#t_producto').val(99);
                                $('#n_producto').val(99);
                                $('#entrada_cantidad').val("");
                                $('#entrada_precio_compra').val("");
                                self.precio_total_entrada = 0;
                            }
                        });
                    }
                })

            }
        });
    });
    return TiendaAndre.AlmacenApp.List.View;
});