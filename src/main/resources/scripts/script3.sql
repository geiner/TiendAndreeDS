CREATE TABLE entrada_productos
  (
    n_entrada integer not null,
    fecha date,
    costo_total float,
    CONSTRAINT entrada_producto_pk PRIMARY KEY (n_entrada)
  ) ;
  CREATE SEQUENCE entrada_seq
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
 CREATE TABLE detalle_entrada_productos
  (
    n_entrada integer not null,
    cod_producto integer not null,
    cod_proveedor integer not null,
    cantidad integer,
    precio_compra float,
    costo_total_producto float,
    CONSTRAINT detalleentrada_pk PRIMARY KEY (n_entrada,cod_producto)
  );