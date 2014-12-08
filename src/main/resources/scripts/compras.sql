    CREATE TABLE proveedor
  (
    codigo  INTEGER NOT NULL ,
    nombre  VARCHAR2 (100) ,
    direccion VARCHAR2 (100) ,
    telefono       INTEGER ,
    email varchar2(100),
    descripcion varchar2(100),
    CONSTRAINT proveedor_pk PRIMARY KEY (codigo)
  );
  CREATE SEQUENCE proveedor_seq
  MINVALUE 400
  MAXVALUE 999999999999999999999999999
  START WITH 400
  INCREMENT BY 1
  CACHE 20;

  CREATE TABLE registro_compra
  (
    codigo  INTEGER NOT NULL ,
    cod_producto  INTEGER,
    cod_nombre_proveedor  INTEGER ,
    ruc  INTEGER ,
    cantidad  INTEGER ,
    fecha  VARCHAR2 (10) ,
    monto NUMBER,
    CONSTRAINT registro_compra_pk PRIMARY KEY (codigo)
  );
  CREATE SEQUENCE registro_compra_seq
  MINVALUE 10000
  MAXVALUE 999999999999999999999999999
  START WITH 10000
  INCREMENT BY 1
  CACHE 20;