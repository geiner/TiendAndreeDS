package com.tienda.andree.persistence;

import com.tienda.andree.models.Pedido;
import com.tienda.andree.models.Producto;
import com.tienda.andree.models.Venta;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by GEINER on 06/12/2014.
 */
public interface VentasMapper {
    @Select(value = "select (nvl(max(n_pedido),0)+1) n_pedido from pedido")
    @Results(value = {
            @Result(javaType = Pedido.class),
            @Result(property = "n_pedido",column = "n_pedido"),
    })
    List<Pedido> TraerNumeroPedido();

    @Select(value = "SELECT codigo ,nombre,cantidad,porc_precio FROM producto WHERE codigo=#{id}")
    @Results(value = {
            @Result(javaType = Producto.class),
            @Result(property = "codigo",column = "codigo"),
            @Result(property = "nombre",column = "nombre"),
            @Result(property = "cantidad",column = "cantidad"),
            @Result(property = "porc_precio",column = "porc_precio"),
    })
    List<Producto> TraerDatosDeProducto(@Param("id") Integer id);

    @Insert(value = "INSERT " +
            "INTO pedido " +
            "  ( " +
            "    n_pedido, " +
            "    tipo_pedido, " +
            "    fecha, " +
            "    estado, " +
            "    costo_total " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    #{pedido.n_pedido}, " +
            "    #{pedido.tipo_pedido}, " +
            "    sysdate, " +
            "    #{pedido.estado}, " +
            "    #{pedido.costo_total} " +
            "  )")
    void RegistrarPedido(@Param("pedido") Pedido pedido);

    @Insert(value = "INSERT " +
            "INTO detalle_pedido " +
            "  ( " +
            "    n_pedido, " +
            "    cod_producto, " +
            "    cantidad, " +
            "    costo " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    #{pedido.n_pedido}, " +
            "    #{pedido.cod_producto}, " +
            "    #{pedido.cantidad}, " +
            "    #{pedido.costo} " +
            "  )")
    void RegistrarDetallePedido(@Param("pedido") Pedido pedido);

    @Update(value = "UPDATE PRODUCTO pro " +
            "SET CANTIDAD = " +
            "  (SELECT (cantidad - #{pedido.cantidad}) " +
            "  FROM producto p " +
            "  WHERE p.codigo=#{pedido.cod_producto} " +
            "  ) " +
            "WHERE pro.codigo=#{pedido.cod_producto}")
    void actualizar_stock(@Param("pedido") Pedido pedido);

    @Select(value = "SELECT pro.nombre, " +
            "  dp.cantidad, " +
            "  dp.costo, " +
            "  pro.porc_precio " +
            "FROM pedido pe " +
            "INNER JOIN detalle_pedido dp " +
            "ON(pe.n_pedido =dp.n_pedido " +
            "AND pe.n_pedido=#{pedido}) " +
            "INNER JOIN producto pro " +
            "ON(pro.codigo=dp.cod_producto)")
    @Results(value = {
            @Result(javaType = Producto.class),
            @Result(property = "nombre",column = "nombre"),
            @Result(property = "cantidad",column = "cantidad"),
            @Result(property = "porc_precio",column = "porc_precio"),
            @Result(property = "costo",column = "costo"),
    })
    List<Producto> TraerProductosPorPedido(@Param("pedido") Integer pedido);

    @Insert(value = "INSERT " +
            "INTO venta " +
            "  ( " +
            "    n_pedido, " +
            "    tipo_comprobante, " +
            "    nombres, " +
            "    apellidos, " +
            "    dni, " +
            "    direccion, " +
            "    ruc " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    #{venta.n_pedido}, " +
            "    #{venta.tipo_comprobante}, " +
            "    #{venta.nombres}, " +
            "    #{venta.apellidos}, " +
            "    #{venta.dni}, " +
            "    #{venta.direccion}, " +
            "    #{venta.ruc} " +
            "  )")
    void RegistrarVenta(@Param("venta") Venta venta);

    @Select(value = "SELECT v.nombres, " +
            "  v.apellidos, " +
            "  v.dni, " +
            "  v.direccion, " +
            "  to_char(p.fecha,'dd/mm/yyyy') as fecha, " +
            "  pro.nombre AS nombre_producto , " +
            "  dp.cantidad, " +
            "  pro.porc_precio, " +
            "  dp.costo, " +
            "  p.costo_total " +
            "FROM venta v " +
            "INNER JOIN pedido p " +
            "ON(v.n_pedido =p.n_pedido " +
            "AND v.n_pedido=#{pedido}) " +
            "INNER JOIN detalle_pedido dp " +
            "ON(p.n_pedido=dp.n_pedido) " +
            "INNER JOIN producto pro " +
            "ON(pro.codigo=dp.cod_producto)")
    @Results(value = {
            @Result(javaType = Venta.class),
            @Result(property = "nombres",column = "nombres"),
            @Result(property = "apellidos",column = "apellidos"),
            @Result(property = "dni",column = "dni"),
            @Result(property = "direccion",column = "direccion"),
            @Result(property = "fecha",column = "fecha"),
            @Result(property = "nombre_producto",column = "nombre_producto"),
            @Result(property = "cantidad",column = "cantidad"),
            @Result(property = "porc_precio",column = "porc_precio"),
            @Result(property = "costo",column = "costo"),
            @Result(property = "costo_total",column = "costo_total"),
    })
    List<Venta> ConsultarVenta(@Param("pedido")Integer pedido);
}
