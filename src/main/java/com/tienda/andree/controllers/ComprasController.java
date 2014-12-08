package com.tienda.andree.controllers;

import com.tienda.andree.models.Producto;
import com.tienda.andree.models.Proveedor;
import com.tienda.andree.services.ComprasService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by esantiago on 06/12/2014.
 */
@Controller
@RequestMapping(value = "/rest/compras")
public class ComprasController {
    static final Logger logger = LoggerFactory.getLogger(ComprasController.class);

    @Autowired
    ComprasService comprasService;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/guardar_proveedor")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String GuardarProducto(@RequestBody Proveedor proveedor) {
        comprasService.GuardarProveedor(proveedor);
        return "save";
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/traer_proveedor")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Proveedor> ListarProveedor(){
        System.out.println("listando proveedores");
        return comprasService.ListarProveedor();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/actualizar_proveedor")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String ActualizarProducto(@RequestBody Proveedor proveedor) {
        System.out.println("--> "+proveedor.getNom_proveedor()+"-"+proveedor.getCodigo());
        comprasService.ActualizarProveedor(proveedor);
        return "save";
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/traer_x_producto")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Producto> listarXProducto(){
        return comprasService.listarXProducto();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/traer_x_proveedor")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Proveedor> listarXProveedor(){
        return comprasService.listarXProveedor();
    }
}
