package com.tienda.andree.services;

import com.tienda.andree.models.Producto;

import java.util.List;

/**
 * Created by GEINER on 04/12/2014.
 */
public interface AlmacenService {
    List<Producto> ListarTiposProducto();

    void GuardarProducto(Producto producto);

    List<Producto> ListarProductos();

    void ActualizarProducto(Producto producto);

    void EliminarProducto(Integer id);

    List<Producto> ListarProductosxCategoria(Integer id);
}
