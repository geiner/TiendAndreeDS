$(function () {
   $('.home_btna').click(function () {
       $('#formulario').fadeIn( 2000, "linear" );
       $('#boton_login').fadeOut( 1600, "linear" );
   });
    $('.cancelar').click(function () {
        $('#formulario').fadeOut( 1600, "linear" );
        $('#boton_login').fadeIn( 2000, "linear" );
    });

    $('.bbn').click(function(ev){
        var href= $(ev.currentTarget);
        var url=href.attr("href")
        window.location="http://localhost:8081/andree"+url;
    });
});