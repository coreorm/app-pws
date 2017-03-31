'use strict';

(function () {
    const app = SimpleApp('result');

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
        default: '{rows}'
    };

    app.template.sub = {
        rows: {
            _wrapper: ['<div {attr}>', '</div>'],
            default: `<div {attr}>
<div class="panel-heading">{_hdr}</div> 
<div class="panel-body">{_desc} 
<div class="{_extra}" id="{exampleId}"></div> 
</div></div>`
        }
    };

    // init app (and auto render only for this one)
    app.init(document.getElementById('result'), true);

})();
