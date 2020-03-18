myapp.Model = function() {
  var val = 0;

  this.add = function(v) {
    if (val < 100) val += v;
  };

  this.sub = function(v) {
    if (val > 0) val -= v;
  };

  this.getVal = function() {
    return val;
  };
};

myapp.View = function() {
  var $num = $('#num'),
    $incBtn = $('#increase'),
    $decBtn = $('#decrease');

  this.render = function(model) {
    $num.text(model.getVal() + 'rmb');
  };

  this.init = function() {
    var presenter = new myapp.Presenter(this);

    $incBtn.click(presenter.increase);
    $decBtn.click(presenter.decrease);
  };
};

myapp.Presenter = function(view) {
  var _model = new myapp.Model();
  var _view = view;

  _view.render(_model);

  this.increase = function() {
    _model.add(1);
    _view.render(_model);
  };

  this.decrease = function() {
    _model.sub(1);
    _view.render(_model);
  };
};
