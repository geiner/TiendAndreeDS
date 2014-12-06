package com.tienda.andree.services.implement;

import com.tienda.andree.models.Producto;
import com.tienda.andree.persistence.AlmacenMapper;
import com.tienda.andree.services.AlmacenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by GEINER on 04/12/2014.
 */
@Service
@Repository
@Transactional
public class AlmacenServiceImpl implements AlmacenService {

    @Autowired
    AlmacenMapper almacenMapper;

    @Override
    public List<Producto> ListarTiposProducto() {
        return almacenMapper.listarTipoProducto();
    }

    @Override
    public void GuardarProducto(Producto producto) {
        System.out.println("service");
        almacenMapper.GuardarProducto(producto);
    }

    @Override
    public List<Producto> ListarProductos() {
        return almacenMapper.listarProductos();
    }

    @Override
    public void ActualizarProducto(Producto producto) {
        almacenMapper.ActualizarProducto(producto);
    }

    @Override
    public void EliminarProducto(Integer id) {
        almacenMapper.EliminarProducto(id);
    }

    @Override
    public List<Producto> ListarProductosxCategoria(Integer id) {
        return almacenMapper.ListarProductosxCategoria(id);
    }
}
