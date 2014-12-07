CREATE TABLE tipoproducto
  (
    tipo        INTEGER NOT NULL ,
    descripcion VARCHAR2 (45),
    CONSTRAINT tipoproducto_pk PRIMARY KEY (tipo)
  ) ;
  CREATE SEQUENCE tipoproducto_seq
  MINVALUE 100
  MAXVALUE 999999999999999999999999999
  START WITH 100
  INCREMENT BY 1
  CACHE 20;
  insert into tipoproducto(tipo,descripcion)values(tipoproducto_seq.nextval,'FIDEOS');
  insert into tipoproducto(tipo,descripcion)values(tipoproducto_seq.nextval,'REPOSTERIA');
  insert into tipoproducto(tipo,descripcion)values(tipoproducto_seq.nextval,'SALSAS');
  insert into tipoproducto(tipo,descripcion)values(tipoproducto_seq.nextval,'MENESTRAS');
  insert into tipoproducto(tipo,descripcion)values(tipoproducto_seq.nextval,'LACTEOS');
  insert into tipoproducto(tipo,descripcion)values(tipoproducto_seq.nextval,'FRUTAS SECAS');
  

CREATE TABLE producto
  (
    codigo  INTEGER NOT NULL ,
    nombre  VARCHAR2 (45) ,
    tipo INTEGER ,
    porc_precio       NUMBER ,
    uni_medida varchar2(10),
    cantidad     INTEGER,
    CONSTRAINT producto_pk PRIMARY KEY (codigo)
  );

  CREATE SEQUENCE producto_seq
  MINVALUE 100
  MAXVALUE 999999999999999999999999999
  START WITH 100
  INCREMENT BY 1
  CACHE 20;

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
  MINVALUE 100
  MAXVALUE 999999999999999999999999999
  START WITH 100
  INCREMENT BY 1
  CACHE 20;