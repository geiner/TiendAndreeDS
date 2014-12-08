package com.tienda.andree.services.implement;

import com.tienda.andree.models.Pedido;
import com.tienda.andree.models.Producto;
import com.tienda.andree.models.Venta;
import com.tienda.andree.persistence.VentasMapper;
import com.tienda.andree.services.VentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by GEINER on 06/12/2014.
 */
@Service
@Repository
@Transactional
public class VentasServiceImpl implements VentasService{

    @Autowired
    VentasMapper ventasMapper;

    @Override
    public List<Pedido> TraerNumeroPedido() {
        return ventasMapper.TraerNumeroPedido();
    }

    @Override
    public List<Producto> TraerDatosDeProducto(Integer id) {
        return ventasMapper.TraerDatosDeProducto(id);
    }

    @Override
    public void RegistrarPedido(Pedido pedido) {
        ventasMapper.RegistrarPedido(pedido);
    }

    @Override
    public void RegistrarDetallePedido(Pedido pedido) {
        ventasMapper.RegistrarDetallePedido(pedido);
        ventasMapper.actualizar_stock(pedido);
    }

    @Override
    public List<Producto> TraerProductosPorPedido(Integer pedido) {
        return ventasMapper.TraerProductosPorPedido(pedido);
    }

    @Override
    public void RegistrarVenta(Venta venta) {
        ventasMapper.RegistrarVenta(venta);
    }

    @Override
    public List<Venta> ConsultarVenta(Integer pedido) {
        return ventasMapper.ConsultarVenta(pedido);
    }
}
