package com.tienda.andree.models;

/**
 * Created by GEINER on 04/12/2014.
 */
public class Producto {
    private Integer tipo;
    private String descripcion;
    private Integer codigo;
    private String nombre;
    private Integer porc_precio;
    private String uni_medida;
    private Integer cantidad;

    public Integer getTipo() {
        return tipo;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getPorc_precio() {
        return porc_precio;
    }

    public void setPorc_precio(Integer porc_precio) {
        this.porc_precio = porc_precio;
    }

    public String getUni_medida() {
        return uni_medida;
    }

    public void setUni_medida(String uni_medida) {
        this.uni_medida = uni_medida;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}
