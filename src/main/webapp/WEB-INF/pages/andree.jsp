<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/andre.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/demo.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/vendor/jquery.mmenu.all.css">
    <script type="text/javascript" src="/assets/js/jquery.js"></script>
    <script type="text/javascript" src="/assets/js/jquery.mmenu.min.all.js"></script>
    <script type="text/javascript" src="/assets/js/andre.js"></script>
    <script type="text/javascript">
        $(function() {
            $('nav#menu').mmenu();
        });
    </script>
</head>
<body>
<!-- <h1>Admin</h1>
        <p>Hello, ${userDetails.username}!</p>

        <p>User authorities: ${userAuthorities}</p>

        <a href="/">Back</a>-->
<nav class="navbar cabecera" role="navigation">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <a href="#" id="head_logo"><img src="/assets/img/logo.fw.png" style="width: 60%;padding-bottom: 10px;"></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right" style="padding-top: 22px;">
                <li><a href="#" style="color: #333;" id="user">${userDetails.username}</a></li>
                <li><a href="j_spring_security_logout">Cerrar Sesion</a></li>
                <li>
                    <a href="#" tabindex="0" data-trigger="focus" id="opciones">
                        <img src="/assets/img/usuario.png" style="width: 36px;margin-top: -9px;border-radius: 6px;"></a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>
<div id="page">
    <sec:authorize access="hasAnyRole('ADMIN')">
    <nav id="menu">
        <ul>
            <li><a href="#inicio" class="bbn">Inicio</a></li>
            <li><a href="#almacen" class="bbn">Almacen</a></li>
            <li><a href="#ventas" class="bbn">Ventas</a></li>
            <li><a href="#compras" class="bbn">Compras</a></li>
        </ul>
    </nav>
    </sec:authorize>
    <sec:authorize access="hasAnyRole('ALMACEN')">
        <nav id="menu">
            <ul>
                <li><a href="#inicio" class="bbn">Inicio</a></li>
                <li><a href="#almacen" class="bbn">Almacen</a></li>
            </ul>
        </nav>
    </sec:authorize>
    <sec:authorize access="hasAnyRole('VENTAS')">
        <nav id="menu">
            <ul>
                <li><a href="#inicio" class="bbn">Inicio</a></li>
                <li><a href="#ventas" class="bbn">Ventas</a></li>
            </ul>
        </nav>
    </sec:authorize>
    <sec:authorize access="hasAnyRole('COMPRAS')">
        <nav id="menu">
            <ul>
                <li><a href="#inicio" class="bbn">Inicio</a></li>
                <li><a href="#compras" class="bbn">Compras</a></li>
            </ul>
        </nav>
    </sec:authorize>
    <div class="navbar navbar-inverse menu" role="navigation">
        <a href="#menu" class="icono_menu"></a>
        <div class="container">
            <div class="navbar-header sv" style="margin-left: 2%;">
                <a class="navbar-brand" style="font-weight: bold;font-size:25px;" href="#">Sistema de Ventas</a>
            </div>
            <!--<div class="navbar-collapse collapse">
                <ul class="nav navbar-nav" style="margin-left: 3.5%;">
                    <li id="inic" class=""><a href="#inicio"><strong>Inicio</strong></a></li>
                    <li id="" class=""><a href="#pedidos" id="inic1"><strong>Pedidos</strong></a></li>
                    <li id="inic2" class=""><a href="#inicio"><strong>Ventas</strong></a></li>
                </ul>
            </div>-->
        </div>
    </div>

    <div id="main-region" class="container">

    </div>
</div>

<script data-main="BackboneJS/js/main.js" src="BackboneJS/js/lib/require.js"></script>
</body>
</html>