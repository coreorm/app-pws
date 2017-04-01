'use strict';

(function () {
    const app = SimpleApp('result');

    app.data = {
        rows: {
            element: [{}]
        }
    };

    app.template.main = {
        default: '{rows}'
    };

    app.template.sub = {
        rows: {
            _wrapper: ['<div {attr} class="container-fluid"><div class="row">', '</div></div>'],
            default: `<div {attr} class="col" style="margin: 30px 0 0 0;min-width:300px;"><div class="card">
<div class="card-header">
    <div style="max-width: 100%;overflow: hidden;display: inline-block;white-space: nowrap;text-overflow: ellipsis;">
    <button class="btn btn-sm btn-secondary" style="display: inline-block; margin-right: 10px;"
    data-toggle="popover" data-content="copied!"
    data-placement="left"
    onclick="copy('s_{id}', this)"
    type="button"><i class="fa fa-files-o fa-sm" aria-hidden="true"></i></button>{_s}</div>
    <input type="hidden" value="{_s}" class="form-control" id="s_{id}">
</div>
<div class="card-block">
    <form>
        <div class="form-group">
            <div class="input-group">
            <span class="input-group-btn">
                <button class="btn btn-sm btn-secondary" onclick="copy('u_{id}', this)"
                data-toggle="popover" data-content="copied!"
                data-placement="left"
                type="button"><i class="fa fa-files-o" aria-hidden="true"></i></button>
              </span>
              <input type="text" readonly="readonly" type="text" value="{_u}" class="form-control" id="u_{id}">
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
              <span class="input-group-btn">
                <button class="btn btn-sm btn-secondary" onclick="copy('p_{id}', this)"
                data-toggle="popover" data-content="copied!"
                data-placement="left"
                type="button"><i class="fa fa-files-o" aria-hidden="true"></i></button>
              </span>
              <input type="password" readonly="readonly" value="{_p}" class="form-control" id="p_{id}">
            </div>
        </div>
    </form>
</div></div></div>`
        }
    };

    // init app (and auto render only for this one)
    app.init(document.getElementById('result'), false);

})();
