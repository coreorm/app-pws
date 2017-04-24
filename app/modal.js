'use strict';

(function () {
  const app = SimpleApp('modal');

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
      _wrapper: [`<div {attr}>`, `</div>`],
      default: `<div {attr}>
        <label>{_n}</label>
        <div class="form-group">
            <div class="input-group">
              <span class="input-group-btn">
                <button class="btn btn-sm btn-secondary" onclick="copy('{_h}', this)"
                data-toggle="popover" data-content="copied!"
                data-placement="left"
                type="button"><i class="fa fa-files-o" aria-hidden="true"></i></button>
              </span>
              <input type="{type}" readonly="readonly" value="{_v}" class="form-control" id="{_h}">
            </div>
        </div>
</div>`
    }
  };

  // init app (and auto render only for this one)
  app.init(document.getElementById('myModalContent'), false);

})();
