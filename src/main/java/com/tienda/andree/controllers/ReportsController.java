package com.tienda.andree.controllers;

import com.tienda.andree.services.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("/rest/reportes")
public class ReportsController {

	protected static Logger logger = LoggerFactory.getLogger(ReportsController.class);

    @Autowired
    private ReportService reportsService;


    @RequestMapping(value = "/boleta_venta/pdf",method = RequestMethod.POST)
    public void mostrarBoletaVenta(HttpServletResponse response,String nombres, String apellidos,  Integer dni,String direccion, Integer n_pedido, String usuario) {
        reportsService.BoletaVenta(response,nombres,apellidos,dni,direccion,n_pedido,usuario);
    }

    @RequestMapping(value = "/factura_venta/pdf",method = RequestMethod.POST)
    public void mostrarFacturaVenta(HttpServletResponse response,String nombres, String apellidos,  Integer dni,String direccion, Integer n_pedido, String usuario,String ruc) {
        reportsService.FacturaVenta(response,nombres,apellidos,dni,direccion,n_pedido,usuario,ruc);
    }

}
