'use strict';

(function () {
    let data = {};
    // services
    const req = (url, apiKey, method, data, callback) => {
        let payload = {
            url: url,
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            method: method,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (res) {
                callback(res, null);
            },
            async: true,
            error: function (x, m, err) {
                callback(m, err);
            },
            crossDomain: true
        };
        if (data) {
            payload.data = JSON.stringify(data);
        }
        jQuery.ajax(payload);
    };

    const read = (es, key, cb) => {
        req(es + '/read', key, 'get', null, cb);
    };

// 1. create app
    const app = SimpleApp('my-app');

// 2. setup templates
// main template
    app.template.main = {
        default: `<form class="hidden" id="frm_init">
        <div class="form-group">
            <label for="endpoint">endpoint</label>
            {endpoint}
        </div>
        <div class="form-group">
            <label for="apikKey">endpoint</label>
            {apiKey}
        </div>
        <div class="form-group">
            {button}
        </div>
    </form>
    <form class="hidden" id="frm_pws">
        <div class="form-group">
            <label for="section">section</label>
            {section}
        </div>
        <div class="form-group">
            <label for="u">username</label>
            {u}
        </div>
        <div class="form-group">
            <label for="p">password</label>
            {p}
        </div>
        <div class="form-group">
            {saveBtn}
        </div>
    </form>
`
    };
// 2.1 single elements
    app.template.sub = {};
    app.template.sub.apiKey = {
        _type: 'input',
        default: '<input {attr}>'
    };
    app.template.sub.button = {
        _type: 'button',
        default: '<button {attr}>{_caption}</button>'
    };
    app.template.sub.saveBtn = {
        _type: 'button',
        default: '<button {attr}>{_caption}</button>'
    };
    app.template.sub.endpoint = {
        _type: 'input',
        default: '<input {attr}>'
    };
    app.template.sub.section = {
        _type: 'input',
        default: '<input {attr}>'
    };
    app.template.sub.u = {
        _type: 'input',
        default: '<input {attr}>'
    };
    app.template.sub.p = {
        _type: 'input',
        default: '<input {attr}>'
    };


// 3. provide data
// 3.1 single elements
    app.data.apiKey = {
        placeholder: 'enter you apiKey',
        class: 'form-control',
        type: 'password',
        name: 'apiKey'
    };
    app.data.button = {
        type: 'button',
        class: 'btn btn-primary',
        _caption: 'submit'
    };
    app.data.endpoint = {
        placeholder: 'enter you endpoint',
        class: 'form-control',
        name: 'endpoint'
    };
    app.data.saveBtn = {
        type: 'button',
        class: 'btn btn-primary',
        _caption: 'save/update'
    };
    app.data.section = {
        class: 'form-control',
        name: 'section'
    };
    app.data.p = {
        class: 'form-control',
        type: 'password',
        name: 'password'
    };
    app.data.u = {
        class: 'form-control',
        name: 'u'
    };
// before render
    app.on(SimpleAppWillRender, 'default', function () {
        // verify if endpoint/key saved already
        if (!app.state.endpoint) {
            jQuery('#frm_init').removeClass('hidden');
            return;
        }

        read(app.state.endpoint, app.state.apiKey, function (r, e) {
            if (e) {
                jQuery('#frm_init').removeClass('hidden');
            }
            try {
                data = atob(r.data);
                jQuery('#frm_pws').removeClass('hidden');
            } catch (e) {
                jQuery('#frm_init').removeClass('hidden');
            }
        });
    });

// render to div: example 1 and force render
    app.init(document.getElementById('pws'), false);
    app.render(true);
// finally: callbacks
    app.on(SimpleAppStateIsUpdated, 'button', function () {
        // just refresh
        location.reload();
    });

})
();
