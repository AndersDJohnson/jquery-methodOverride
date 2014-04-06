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
    'PUT': 'POST',
    'PATCH': 'POST',
    'DELETE': 'POST',
    'HEAD': 'GET',
    'OPTIONS': 'GET'
  };

  /**
   * Update a form element, mapping its method attribute,
   *  and adding hidden _method input.
   */
  var methodOverride = function () {
    this.each(function () {
      var $form = $(this);

      var method = $form.attr('method');
      if (method) {
        var overrideMethod = methodOverride.map(method);
        if (overrideMethod !== method) {
          $form.attr('method', overrideMethod);
          $form.attr('data-method-override', method);

          var $methodInput = $('<input type="hidden" name="_method" />');
          $methodInput.val(method);
          $form.append($methodInput);
        }
      }
    });
  };

  methodOverride.methods = methods;

  /**
   * Map a method to its override, if any.
   */
  methodOverride.map = function (method) {
    var upperCaseMethod = method.toUpperCase();
    var overrideMethod;
    if (methods.hasOwnProperty(upperCaseMethod)) {
      overrideMethod = methods[upperCaseMethod];
    }
    return overrideMethod ? overrideMethod : method;
  };

  $.ajaxPrefilter(function (options, originalOptions, xhr) {

    var httpMethod = options.type;
    var proxyHttpMethod = methods[httpMethod];

    if (proxyHttpMethod) {

      var proxyMethod = proxyHttpMethod.toLowerCase();

      $.extend(options, {
        type: proxyHttpMethod
      });

      options.headers = $.extend({
        "X-HTTP-Method-Override": httpMethod
      }, options.headers);

      /**
       * Add _method to data.
       * TODO: Consider using `$.deparam`: https://gist.github.com/cowboy/1025817
       * TODO: Does this work with FormData?
       */
      var extraData = {
        _method: httpMethod
      };
      var extraDataParam = $.param(extraData);

      if (options.data) {
        options.data += '&' + extraDataParam;
      }
      else {
        options.data = extraDataParam;
      }

    }

  });

  $.map(methods, function (proxyHttpMethod, httpMethod) {

    var method = httpMethod.toLowerCase();

    $[method] = function (url, data, callback, type) {

      // shift arguments if data argument was omitted
      if ( $.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      var settings = {
        url: url,
        type: httpMethod,
        dataType: type,
        data: data,
        success: callback
      };

      return $.ajax(settings);
    };

    return $[method];
  });

  $.fn.methodOverride = methodOverride;

  return methodOverride;
}));
