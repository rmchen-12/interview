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

  var self = this,
    views = [];

  this.register = function(view) {
    views.push(view);
  };

  this.notify = function() {
    for (var i = 0; i < views.length; i++) {
      views[i].render(self);
    }
  };
};

myapp.View = function(controller) {
  var $num = $('#num'),
    $incBtn = $('#increase'),
    $decBtn = $('#decrease');

  this.render = function(model) {
    $num.text(model.getVal() + 'rmb');
  };

  /*  绑定事件  */
  $incBtn.click(controller.increase);
  $decBtn.click(controller.decrease);
};

myapp.Controller = function() {
  var model = null,
    view = null;

  this.init = function() {
    /* 初始化Model和View */
    model = new myapp.Model();
    view = new myapp.View(this);

    /* View向Model注册，当Model更新就会去通知View啦 */
    model.register(view);
    model.notify();
  };

  /* 让Model更新数值并通知View更新视图 */
  this.increase = function() {
    model.add(1);
    model.notify();
  };

  this.decrease = function() {
    model.sub(1);
    model.notify();
  };
};
