package com.tienda.andree.persistence;

import com.tienda.andree.models.EntradaProducto;
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

    @Insert(value = "INSERT " +
            "INTO entrada_productos " +
            "  ( " +
            "    n_entrada, " +
            "    fecha, " +
            "    costo_total " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "   entrada_seq.nextval , " +
            "    sysdate, " +
            "    #{entrada.costo_total} " +
            "  )")
    void insertEntradaProducto(@Param("entrada") EntradaProducto entrada);

    @Insert(value = "INSERT " +
            "INTO detalle_entrada_productos " +
            "  ( " +
            "    N_ENTRADA, " +
            "    COD_PRODUCTO, " +
            "    COD_PROVEEDOR, " +
            "    CANTIDAD, " +
            "    PRECIO_COMPRA, " +
            "    COSTO_TOTAL_PRODUCTO " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "   (select max(n_entrada) from entrada_productos), " +
            "    #{entrada.cod_producto}, " +
            "    #{entrada.cod_proveedor}, " +
            "    #{entrada.cantidad}, " +
            "   #{entrada.precio_compra}, " +
            "    #{entrada.costo_total_producto} " +
            "  )")
    void inserDetalleEntradaProductos(@Param("entrada") EntradaProducto entrada);

    @Update(value ="UPDATE producto " +
            "SET cantidad=(select cantidad+#{entrada.cantidad} from producto where codigo=#{entrada.cod_producto}) "+
            "WHERE codigo=#{entrada.cod_producto}" )
    void updateStockProducto(@Param("entrada")EntradaProducto entrada);
}
