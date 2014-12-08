package com.tienda.andree.models;

/**
 * Created by esantiago on 07/12/2014.
 */
public class RegistroCompra {
    private int codigo;
    private int cod_producto;
    private int cod_nombre_proveedor;
    private int ruc;
    private int cantidad;
    private String fecha;
    private double monto;

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public int getCod_producto() {
        return cod_producto;
    }

    public void setCod_producto(int cod_producto) {
        this.cod_producto = cod_producto;
    }

    public int getCod_nombre_proveedor() {
        return cod_nombre_proveedor;
    }

    public void setCod_nombre_proveedor(int cod_nombre_proveedor) {
        this.cod_nombre_proveedor = cod_nombre_proveedor;
    }

    public int getRuc() {
        return ruc;
    }

    public void setRuc(int ruc) {
        this.ruc = ruc;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
