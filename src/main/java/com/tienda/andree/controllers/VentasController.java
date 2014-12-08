package com.tienda.andree.controllers;

import com.tienda.andree.models.Pedido;
import com.tienda.andree.models.Producto;
import com.tienda.andree.models.Venta;
import com.tienda.andree.services.VentasService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by GEINER on 06/12/2014.
 */
@Controller
@RequestMapping(value = "/rest/ventas")
public class VentasController {
    static final Logger logger = LoggerFactory.getLogger(VentasController.class);

    @Autowired
    VentasService ventasService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/numero_pedido")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Pedido TraerNumeroPedido() {
        List<Pedido> pedido = ventasService.TraerNumeroPedido();
        if (pedido.size() == 0)
            return null;
        return pedido.get(0);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/buscar_producto/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Producto TraerDatosDeProducto(@PathVariable(value = "id") Integer id) {
        List<Producto> producto= ventasService.TraerDatosDeProducto(id);
        if (producto.size() == 0)
            return null;
        return producto.get(0);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/registrar_pedido")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String RegistrarPedido(@RequestBody Pedido pedido) {
        ventasService.RegistrarPedido(pedido);
        return "save";
    };

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/registrar_detalle_pedido")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String RegistrarDetallePedido(@RequestBody Pedido pedido) {
        ventasService.RegistrarDetallePedido(pedido);
        return "save";
    };

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/traerproducto_por_venta/{pedido}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Producto> TraerProductosPorPedido(@PathVariable(value = "pedido") Integer pedido) {
        System.out.println("traendo productos por pedido");
        return ventasService.TraerProductosPorPedido(pedido);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/registrar_venta")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String RegistrarVenta(@RequestBody Venta venta) {
        System.out.println(venta.getN_pedido()+"-"+venta.getTipo_comprobante()+"-"+venta.getRuc());
        ventasService.RegistrarVenta(venta);
        return "save";
    };

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/consultar_venta/{pedido}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Venta> ConsultarVenta(@PathVariable(value = "pedido") Integer pedido) {
        System.out.println("traendo consulta de venta");
        return ventasService.ConsultarVenta(pedido);
    }
}
