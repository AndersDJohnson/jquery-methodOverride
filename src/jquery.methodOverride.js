(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var methods = {
    'put': 'post',
    'patch': 'post',
    'delete': 'post',
    'head': 'get',
    'options': 'get'
  };

  var out = $.map(methods, function (proxyMethod, method) {

    var httpMethod = method.toUpperCase();
    var proxyHttpMethod = proxyMethod.toUpperCase();

    $[method] = function (url, data, callback, type) {

      var settings;

      // passing in a settings object
      if ($.isPlainObject(url)) {
        settings = url;
      }
      else {
        // shift arguments if data argument was omitted
        if ( $.isFunction( data ) ) {
          type = type || callback;
          callback = data;
          data = undefined;
        }

        settings = {
          url: url,
          dataType: type,
          data: data,
          success: callback
        };
      }

      settings = $.extend({}, {
        type: proxyHttpMethod
      }, settings);

      settings.headers = $.extend({}, {
        "X-HTTP-Method-Override": httpMethod
      }, settings.headers);

      settings.data = $.extend({}, {
        _method: httpMethod
      }, settings.data);

      return $.ajax(settings);
    };

    return $[method];
  });

  return out;
}));
