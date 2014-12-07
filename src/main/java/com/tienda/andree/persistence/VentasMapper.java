package com.tienda.andree.persistence;

import com.tienda.andree.models.Pedido;
import com.tienda.andree.models.Producto;
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
}
