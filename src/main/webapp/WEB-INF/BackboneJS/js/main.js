requirejs.config({
    baseUrl: "BackboneJS/js",
    paths: {
        backbone: "lib/backbone",
        "backbone.picky": "lib/backbone.picky",
        "backbone.syphon": "lib/backbone.syphon",
        "handlebars": "lib/handlebars",
        hbs: "lib/require-handlebars",
        jquery: "lib/jquery",
        json2: "lib/json2",
        'marionette': "lib/backbone.marionette",
//		tpl: "lib/tpl",
        text: "lib/text",
        underscore: "lib/underscore",
        'bootstrap': 'lib/bootstrap',
        'backbone-validation-orig': 'lib/backbone-validation',
        'backbone-validation': 'lib/resthub/backbone-validation-ext'
    },
    shim: {                                          //para decir quien se importa primero
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        "handlebars": {
            exports: "Handlebars"
        },
        jquery: {
            exports: "$"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        underscore: {
            exports: "_"
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: "$.fn.popover"
        },
        'backbone-validation':{
            deps: ['backbone'],
            exports: "backbone-validation"
        }
    },
    urlArgs: 'appversion=' + Math.round((Math.random() * 10000000000000))         //para que no se cachee en el navegador
});

require(["app"], function (TiendaAndre) {
    TiendaAndre.start();
});
