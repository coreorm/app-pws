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
        default: `<form class="form-horizontal hidden" id="frm_init">
        <div class="form-group">
            <label for="endpoint">endpoint</label>
            {endpoint}
        </div>
        <div class="form-group">
            <label for="apikKey">API Key</label>
            {apiKey}
        </div>
        <div class="form-group">
            {button}
        </div>
    </form>
    <form class="hidden" id="frm_pws">
        {search}
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
    app.template.sub.search = {
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
    app.data.search = {
        class: 'form-control',
        placeholder: 'Enter keyword to search',
        name: 'search'
    };
// before render
    app.on(SimpleAppWillRender, 'default', function () {
        read(app.state.endpoint, app.state.apiKey, function (r, e) {
            if (e) {
                jQuery('#frm_init').removeClass('hidden');
            }
            try {
                data = JSON.parse(atob(r.data));
                jQuery('#frm_pws').removeClass('hidden');
            } catch (e) {
                console.log(e);
                jQuery('#frm_init').removeClass('hidden');
            }
        });
        // always clear keyword
        app.state.search = '';
    });

// render to div: example 1 and force render
    app.init(document.getElementById('pws'), false);
    app.render(true);
// finally: callbacks
    app.on(SimpleAppStateIsUpdated, 'button', function () {
        // just refresh
        location.reload();
    });
    app.on(SimpleAppStateIsUpdated, 'search', function (obj) {
        if (!obj.state.search || obj.state.search.length <= 2) {
            SimpleApp('result').data.rows.element = [];
            SimpleApp('result').render();
            return;
        }
        // just refresh
        let key = obj.state.search.toLowerCase();
        let dataFound = [];
        for (let section in data) {
            if (section.toLowerCase().indexOf(key) >= 0) {
                for (let k in data[section]) {
                    if (data[section][k].u) {
                        dataFound.push({
                            _s: section,
                            _h: k,
                            _u: data[section][k].u,
                            _p: data[section][k].p,
                        });
                    }
                }
            } else {
                // find only valid ones
                for (let n in data[section]) {
                    let pair = data[section][n];
                    if (pair.u && pair.u.toLowerCase().indexOf(key) >= 0) {
                        dataFound.push({
                            _s: section,
                            _h: n,
                            _u: pair.u,
                            _p: pair.p,
                        });
                    }
                }
            }
        }
        SimpleApp('result').data.rows.element = dataFound;
        SimpleApp('result').render();
    });

})
();
