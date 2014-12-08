package com.tienda.andree.persistence;


import com.tienda.andree.models.Producto;
import com.tienda.andree.models.Proveedor;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by esantiago on 06/12/2014.
 */
public interface ComprasMapper {

    @Insert(value = "INSERT " +
            "INTO proveedor " +
            "  ( " +
            "    codigo, " +
            "    nombre, " +
            "    direccion, " +
            "    telefono, " +
            "    email, " +
            "    descripcion " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    proveedor_seq.nextval, " +
            "    #{provee.nom_proveedor}, " +
            "    #{provee.direccion}, " +
            "    #{provee.telefono}, " +
            "    #{provee.email}, " +
            "    #{provee.descripcion} " +
            "  )")
    void GuardarProveedor(@Param("provee") Proveedor proveedor);

    @Select(value = "SELECT codigo, " +
            "  nombre, " +
            "  direccion, " +
            "  telefono, " +
            "  email, " +
            "  descripcion " +
            "FROM proveedor ")
    @Results(value = {
            @Result(javaType = Proveedor.class),
            @Result(property = "codigo",column = "codigo"),
            @Result(property = "nom_proveedor",column = "nombre"),
            @Result(property = "direccion",column = "direccion"),
            @Result(property = "telefono",column = "telefono"),
            @Result(property = "email",column = "email"),
            @Result(property = "descripcion",column = "descripcion"),
    })
    List<Proveedor> listarProveedor();

    @Update(value ="UPDATE proveedor " +
            "SET " +
            "  nombre   =#{provee.nom_proveedor}, " +
            "  direccion=#{provee.direccion}, " +
            "  telefono=#{provee.telefono}, " +
            "  email=#{provee.email}, " +
            "  descripcion=#{provee.descripcion} " +
            "WHERE codigo=#{provee.codigo}" )
    void actualizarProveedor(@Param("provee") Proveedor proveedor);

    @Select(value = "SELECT codigo, " +
            "  nombre " +
            "FROM producto ")
    @Results(value = {
            @Result(javaType = Producto.class),
            @Result(property = "codigo",column = "codigo"),
            @Result(property = "nombre",column = "nombre"),
    })
    List<Producto> listarXProducto();

    @Select(value = "SELECT codigo, " +
            "  nombre " +
            "FROM proveedor ")
    @Results(value = {
            @Result(javaType = Proveedor.class),
            @Result(property = "codigo",column = "codigo"),
            @Result(property = "nom_proveedor",column = "nombre"),
    })
    List<Proveedor> listarXProveedor();


}
