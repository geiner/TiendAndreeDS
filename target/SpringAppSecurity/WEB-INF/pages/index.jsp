<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!doctype>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/andre.css">
    <script type="text/javascript" src="/assets/js/jquery.js"></script>
    <script type="text/javascript" src="/assets/js/andre.js"></script>
</head>
<body>

<header class="header1">
    <div class="container">
        <div class="navbar">
            <a href="#"><img src="/assets/img/logo.fw.png" style="width: 330px;" class="logo"></a>

            <div class="nav navbar-nav navbar-right">
                <ul class="nav">
                    <li><a class="signup" style="margin-top: 38%;" href="#">ACERCA DE</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row contenido" style="text-align: center;color: rgba(255, 255, 255,1);">
        <div>
            <h1>Bienvenido a Tienda Andre </h1>

            <p>Tienda Andre le ofrece los productos de mejor calidad en </p>

            <p>buen estado y al alcance de su bolsillo</p>

            <div id="boton_login">
                <button type="button" class="home_btna">
                    <span><img src="/assets/img/login.png" style="width:10%;padding-bottom: 10px;"></span> INICIAR SESION
                </button>
            </div>
        </div>
    </div>
    <br/>

    <div class="col-md-12" style="align-content: center;">
        <div class="col-md-4">
        </div>
        <form action="/login" method="POST" style="display: none;" id="formulario">
            <div class="col-md-4 cont_form">
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <input type="text" placeholder="USUARIO" class="trans form-control usu" name="user"/>
                    </div>
                </div>
                <br/>

                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <input type="password" placeholder="CONTRASEÑA" class=" trans form-control contra" name="password"/>
                    </div>
                </div>
                <br/>

                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-4">
                        <button class="btn btn_login aceptar" type="submit">ACEPTAR</button>
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn_login cancelar" type="reset">CANCELAR</button>
                    </div>
                </div>
            </div>
        </form>

    </div>
</header>
<!--<form name="f" action="/j_spring_security_check" method="POST">
    <table>
        <tbody><tr><td>User:</td><td><input type="text" name="j_username" value=""></td></tr>
        <tr><td>Password:</td><td><input type="password" name="j_password"></td></tr>
        <tr><td><input type="checkbox" name="_spring_security_remember_me"></td><td>Remember me on this computer.</td></tr>
        <tr><td colspan="2"><input name="submit" type="submit" value="Login"></td></tr>
        </tbody></table>
</form>-->
</body>
</html>