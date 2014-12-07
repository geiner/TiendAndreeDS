package com.tienda.andree.services;

import com.tienda.andree.models.Pedido;
import com.tienda.andree.models.Producto;

import java.util.List;

/**
 * Created by GEINER on 06/12/2014.
 */
public interface VentasService {
    List<Pedido> TraerNumeroPedido();

    List<Producto> TraerDatosDeProducto(Integer id);

    void RegistrarPedido(Pedido pedido);

    void RegistrarDetallePedido(Pedido pedido);
}
