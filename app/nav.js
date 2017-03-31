'use strict';

(function () {
    const app = SimpleApp('nav');

    app.data = {
        hdr: {
            label: 'pws'
        },
        links: {
            element: [{
                href: 'https://coreorm.github.io/app-pws/',
                label: 'pws store',
                title: 'Simple.Js'
            }]
        }
    };

    app.template.main = {
        default: '<header>{hdr}{links}</header>'
    };

    app.template.sub = {
        hdr: {
            default: `<div {attr}>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
            <a class="navbar-brand"> {label} </a> </div>`
        },
        links: {
            _type: 'link',
            _wrapper: ['<div class="collapse navbar-collapse" id="menu"> <ul class="navbar-nav mr-auto" id="{id}">', '</ul></div>'],
            default: `<li class="nav-item" id="{id}">
                <a href="{href}" class="nav-link">{label}</a>
            </li>`
        }
    };

    // init app (and auto render only for this one)
    app.init(document.getElementById('nav'), true);

})();
