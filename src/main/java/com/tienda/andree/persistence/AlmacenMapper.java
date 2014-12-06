package com.tienda.andree.persistence;

import com.tienda.andree.models.Producto;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by GEINER on 04/12/2014.
 */
public interface AlmacenMapper {
    @Select(value = "select tipo,descripcion from tipoproducto")
    @Results(value = {
            @Result(javaType = Producto.class),
            @Result(property = "tipo",column = "tipo"),
            @Result(property = "descripcion",column = "descripcion"),
    })
    List<Producto> listarTipoProducto();

    @Insert(value = "INSERT " +
            "INTO producto " +
            "  ( " +
            "    codigo, " +
            "    nombre, " +
            "    tipo, " +
            "    porc_precio, " +
            "    uni_medida, " +
            "    cantidad " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    producto_seq.nextval, " +
            "    #{produ.nombre}, " +
            "    #{produ.tipo}, " +
            "    #{produ.porc_precio}, " +
            "    #{produ.uni_medida}, " +
            "    #{produ.cantidad} " +
            "  )")
    void GuardarProducto(@Param("produ") Producto producto);

    @Select(value = "SELECT codigo, " +
            "  nombre, " +
            "  p.tipo, " +
            "  tp.descripcion, " +
            "  porc_precio, " +
            "  uni_medida, " +
            "  cantidad " +
            "FROM producto p " +
            "INNER JOIN tipoproducto tp " +
            "ON(p.tipo=tp.tipo)")
    @Results(value = {
            @Result(javaType = Producto.class),
            @Result(property = "codigo",column = "codigo"),
            @Result(property = "nombre",column = "nombre"),
            @Result(property = "tipo",column = "tipo"),
            @Result(property = "descripcion",column = "descripcion"),
            @Result(property = "porc_precio",column = "porc_precio"),
            @Result(property = "uni_medida",column = "uni_medida"),
            @Result(property = "cantidad",column = "cantidad"),
    })
    List<Producto> listarProductos();

    @Update(value ="UPDATE producto " +
            "SET nombre   =#{produ.nombre}, " +
            "  porc_precio=#{produ.porc_precio}, " +
            "  tipo= " +
            "  #{produ.tipo} " +
            "WHERE codigo=#{produ.codigo}" )
    void ActualizarProducto(@Param("produ") Producto producto);

    @Delete(value="DELETE FROM PRODUCTO WHERE codigo=#{id}")
    void EliminarProducto(@Param("id") Integer id);

    @Select(value = "SELECT codigo, " +
            "  nombre " +
            "FROM producto p where tipo=#{id} ")
    @Results(value = {
            @Result(javaType = Producto.class),
            @Result(property = "codigo",column = "codigo"),
            @Result(property = "nombre",column = "nombre"),
    })
    List<Producto> ListarProductosxCategoria(@Param("id") Integer id);
}
