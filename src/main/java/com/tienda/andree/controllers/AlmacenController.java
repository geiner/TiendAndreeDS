package com.tienda.andree.controllers;

import com.tienda.andree.models.EntradaProducto;
import com.tienda.andree.models.Producto;
import com.tienda.andree.services.AlmacenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by GEINER on 04/12/2014.
 */
@Controller
@RequestMapping(value = "/rest/almacen")
public class AlmacenController {
    static final Logger logger = LoggerFactory.getLogger(AlmacenController.class);

    @Autowired
    AlmacenService almacenService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tipo_producto")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Producto> listarTiposProductos(){
        System.out.println("listando tipos de productos");
        return almacenService.ListarTiposProducto();
    };

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/guardar_producto")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String GuardarProducto(@RequestBody Producto producto) {
        System.out.println(producto.getNombre()+"-"+producto.getTipo()+"-"+producto.getUni_medida()+"-"+producto.getPorc_precio()+"-"+producto.getCantidad());
        almacenService.GuardarProducto(producto);
        return "save";
    };

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/traer_productos")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Producto> ListarProductos(){
        System.out.println("listando productos");
        return almacenService.ListarProductos();
    };

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/actualizar_producto")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String ActualizarProducto(@RequestBody Producto producto) {
        System.out.println(producto.getNombre()+"-"+producto.getTipo()+"-"+producto.getPorc_precio()+"-"+producto.getCodigo());
        almacenService.ActualizarProducto(producto);
        return "save";
    }

    @RequestMapping(method = RequestMethod.DELETE, produces = "application/json", value = "/eliminar_producto/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public String EliminarProducto(/*@RequestBody Legajos legajos*/@PathVariable(value = "id") Integer  id) {
        System.out.println("controller"+id);
        almacenService.EliminarProducto(id);
        return "delete " + id;
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/productos/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Producto> ListarProductosxCategoria(@PathVariable(value = "id") Integer  id){
        System.out.println("listando productos x categoria "+id);
        return almacenService.ListarProductosxCategoria(id);
    };

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/registrar_entrada_productos")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String RegistrarEntradaProductos(@RequestBody EntradaProducto entrada) {
        almacenService.RegistrarEntradaProductos(entrada);
        return "save";
    };

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/registrar_detalle_entrada_productos")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String RegistrarDetalleEntradaProductos(@RequestBody EntradaProducto entrada) {
        System.out.println(entrada.getCod_producto()+"-"+entrada.getCod_proveedor()+"-"+entrada.getCantidad()+"-"+entrada.getPrecio_compra());
        almacenService.RegistrarDetalleEntradaProductos(entrada);
        return "save";
    };
}
