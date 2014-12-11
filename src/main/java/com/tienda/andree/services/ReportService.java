package com.tienda.andree.services;

import javax.servlet.http.HttpServletResponse;


public interface ReportService {


    void BoletaVenta(HttpServletResponse response, String nombres, String apellidos, Integer dni, String direccion, Integer n_pedido, String usuario);

    void FacturaVenta(HttpServletResponse response, String nombres, String apellidos, Integer dni, String direccion, Integer n_pedido, String usuario, String ruc);
}
