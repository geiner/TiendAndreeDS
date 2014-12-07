package com.tienda.andree.services.implement;

import com.tienda.andree.models.Proveedor;
import com.tienda.andree.persistence.ComprasMapper;
import com.tienda.andree.services.ComprasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by esantiago on 06/12/2014.
 */
@Service
@Repository
@Transactional
public class ComprasServiceImpl implements ComprasService {
    @Autowired
    ComprasMapper comprasMapper;

    @Override
    public void GuardarProveedor(Proveedor proveedor) {
        System.out.println("service");
        comprasMapper.GuardarProveedor(proveedor);
    }
    @Override
    public List<Proveedor> ListarProveedor() {
        System.out.println("mostrar tabla");
        return comprasMapper.listarProveedor();
    }
}
