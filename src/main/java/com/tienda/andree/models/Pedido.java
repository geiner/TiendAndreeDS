package com.tienda.andree.models;

/**
 * Created by GEINER on 06/12/2014.
 */
public class Pedido {
    private Integer n_pedido;
    private Integer tipo_pedido;
    private String fecha;
    private String estado;
    private Double costo_total;

    private Integer cod_producto;
    private Integer cantidad;
    private Double costo;

    public Integer getN_pedido() {
        return n_pedido;
    }

    public void setN_pedido(Integer n_pedido) {
        this.n_pedido = n_pedido;
    }

    public Integer getTipo_pedido() {
        return tipo_pedido;
    }

    public void setTipo_pedido(Integer tipo_pedido) {
        this.tipo_pedido = tipo_pedido;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Double getCosto_total() {
        return costo_total;
    }

    public void setCosto_total(Double costo_total) {
        this.costo_total = costo_total;
    }

    public Integer getCod_producto() {
        return cod_producto;
    }

    public void setCod_producto(Integer cod_producto) {
        this.cod_producto = cod_producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getCosto() {
        return costo;
    }

    public void setCosto(Double costo) {
        this.costo = costo;
    }
}
