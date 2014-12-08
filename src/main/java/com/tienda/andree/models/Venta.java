package com.tienda.andree.models;

/**
 * Created by GEINER on 07/12/2014.
 */
public class Venta {
    private Integer n_pedido;
    private Integer tipo_comprobante;
    private String nombres;
    private String apellidos;
    private Integer dni;
    private String direccion;
    private String ruc;

    private String nombre_producto;
    private Integer cantidad;
    private Double porc_precio;
    private Double costo;
    private Double costo_total;
    private String fecha;

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getNombre_producto() {
        return nombre_producto;
    }

    public void setNombre_producto(String nombre_producto) {
        this.nombre_producto = nombre_producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPorc_precio() {
        return porc_precio;
    }

    public void setPorc_precio(Double porc_precio) {
        this.porc_precio = porc_precio;
    }

    public Double getCosto() {
        return costo;
    }

    public void setCosto(Double costo) {
        this.costo = costo;
    }

    public Double getCosto_total() {
        return costo_total;
    }

    public void setCosto_total(Double costo_total) {
        this.costo_total = costo_total;
    }

    public Integer getN_pedido() {
        return n_pedido;
    }

    public void setN_pedido(Integer n_pedido) {
        this.n_pedido = n_pedido;
    }

    public Integer getTipo_comprobante() {
        return tipo_comprobante;
    }

    public void setTipo_comprobante(Integer tipo_comprobante) {
        this.tipo_comprobante = tipo_comprobante;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Integer getDni() {
        return dni;
    }

    public void setDni(Integer dni) {
        this.dni = dni;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }
}
