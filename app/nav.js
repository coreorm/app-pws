'use strict';

(function () {
    const app = SimpleApp('nav');

    app.data = {
        hdr: {
            label: 'pws'
        },
        links: {
            element: [{
                href: '/',
                label: 'pws store',
                title: 'Simple.Js'
            }]
        }
    };

    app.template.main = {
        default: '<div class="container container-fluid">{hdr}{links}</div>'
    };

    app.template.sub = {
        hdr: {
            default: '<div {attr} class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu">' + '<span class="sr-only">Toggle navigation</span>' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '</button><label class="navbar-brand"> {label} </label>' + '</div>'
        },
        links: {
            _type: 'link',
            _wrapper: ['<div class="collapse navbar-collapse" id="menu"> <ul class="nav navbar-nav" id="{id}">', '</ul></div>'],
            default: '<li id="{id}"><a href="{href}">{label}</a></li>'
        }
    };

    // init app (and auto render only for this one)
    app.init(document.getElementById('nav'), true);

})();
