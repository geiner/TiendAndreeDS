package com.tienda.andree.services;

import com.tienda.andree.models.Producto;
import com.tienda.andree.models.Proveedor;

import java.util.List;

/**
 * Created by esantiago on 06/12/2014.
 */
public interface ComprasService {
    void GuardarProveedor(Proveedor proveedor);
    List<Proveedor> ListarProveedor();
    void ActualizarProveedor(Proveedor proveedor);
    List<Producto> listarXProducto();
    List<Proveedor> listarXProveedor();
}
