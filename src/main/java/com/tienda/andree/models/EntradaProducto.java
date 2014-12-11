package com.tienda.andree.models;

/**
 * Created by GEINER on 11/12/2014.
 */
public class EntradaProducto {
    private Integer n_entrada;
    private String fecha;
    private Double costo_total;

    private Integer cod_producto;
    private Integer cod_proveedor;
    private Integer cantidad;
    private Double precio_compra;
    private Double costo_total_producto;

    public Integer getN_entrada() {
        return n_entrada;
    }

    public void setN_entrada(Integer n_entrada) {
        this.n_entrada = n_entrada;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
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

    public Integer getCod_proveedor() {
        return cod_proveedor;
    }

    public void setCod_proveedor(Integer cod_proveedor) {
        this.cod_proveedor = cod_proveedor;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecio_compra() {
        return precio_compra;
    }

    public void setPrecio_compra(Double precio_compra) {
        this.precio_compra = precio_compra;
    }

    public Double getCosto_total_producto() {
        return costo_total_producto;
    }

    public void setCosto_total_producto(Double costo_total_producto) {
        this.costo_total_producto = costo_total_producto;
    }
}
