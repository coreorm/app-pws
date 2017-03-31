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
            _wrapper: ['<div {attr} class="container-fluid">', '</div>'],
            default: `<div {attr} class="card" style="margin: 10px;">
<div class="card-header">
    {_s}
</div>
<div class="card-block">
    <form type="post" onsubmit="SimpleApp('result').p()">
        <div class="form-group hidden">
            <input type="text" type="text" placeholder="Section" value="{_s}" class="form-control" id="s_{id}">
        </div>
        <div class="form-group">
            <div class="input-group">
              <input type="text" type="text" value="{_u}" class="form-control" id="u_{id}">
              <span class="input-group-btn">
                <button class="btn btn-sm btn-secondary" onclick="copy('u_{id}')" type="button">copy</button>
              </span>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
              <input type="password" value="{_p}" class="form-control" id="p_{id}">
              <span class="input-group-btn">
                <button class="btn btn-sm btn-secondary" onclick="copy('p_{id}')" type="button">copy</button>
              </span>
            </div>
        </div>        
        <div class="form-group">
            <button class="btn btn-success">Save</button>
        </div>
    </form>
</div></div>`
        }
    };

    // init app (and auto render only for this one)
    app.init(document.getElementById('result'), false);

})();
