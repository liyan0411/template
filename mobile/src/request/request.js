import server from "./server";

function Myserver() {
  this.server = server;
  this.nowhandle = null;
}
Myserver.prototype.v = function(ob) {
  this.nowhandle = ob;
  return this;
};
// 通过路由关联
Myserver.prototype.parserRouter = function(name, urlOb) {
  var ob = (this[name] = {});
  Object.keys(urlOb).forEach(item => {
    ob[item] = this.sendMes.bind(this, name, item, urlOb[item]);
    ob[item].state = "ready";
  });
};
Myserver.prototype.sendMes = function(moduleName, name, url, config = {}) {
  var type = config.type || "post";
  var data = config.data || {};
  // var bindName = config.bindName || name;
  var isAsy = config.isAsy || true;
  var self = this;
  // axios有请求钱拦截
  // 处理数据，绑定前处理和绑定处理
  var before = function(mes) {
    console.log("请求之前");
    self.canSend = true;
    return mes;
  };
  var defaultFn = function(mes) {
    self[moduleName][name].state = "ready";
    return mes;
  };
  var success = config.success || defaultFn;
  var callback = function(mes) {
    console.log("请求成功", mes);
    success(mes, defaultFn);
  };
  var error = config.error || defaultFn;
  var errorback = function(mes) {
    console.log("请求失败", mes);
    error(mes, defaultFn);
  };
  var state = {
    get: function() {
      server
        .get(url, data)
        .then(before)
        .then(callback)
        .catch(errorback);
    },
    post: function() {
      server
        .post(url, data)
        .then(before)
        .then(callback)
        .catch(errorback);
    }
  };
  if (isAsy) {
    state[type]();
  } else {
    if (self[moduleName][name].state == "ready") {
      self[moduleName][name].state = "pending";
      state[type]();
    }
  }
};
export default new Myserver();
