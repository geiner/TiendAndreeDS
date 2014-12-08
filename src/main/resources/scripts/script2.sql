CREATE TABLE pedido
  (
    n_pedido integer not null,
    tipo_pedido integer not null,
    fecha date,
    estado varchar2(15),
    costo_total float,
    CONSTRAINT pedido_pk PRIMARY KEY (n_pedido)
  ) ;
  CREATE SEQUENCE pedido_seq
  MINVALUE 1
  MAXVALUE 999999999999999999999999999
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  CREATE TABLE detalle_pedido
  (
    n_pedido integer not null,
    cod_producto integer not null,
    cantidad integer,
    costo float,
    CONSTRAINT detallepedido_pk PRIMARY KEY (n_pedido,cod_producto)
  );

  CREATE TABLE venta
  (
    n_pedido integer not null,
    tipo_comprobante integer not null,
    nombres varchar2(50),
    apellidos varchar2(50),
    dni integer,
    direccion varchar2(100),
    ruc varchar2(11),
    CONSTRAINT venta_pk PRIMARY KEY (n_pedido)
  ) ;