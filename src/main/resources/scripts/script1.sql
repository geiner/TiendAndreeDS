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