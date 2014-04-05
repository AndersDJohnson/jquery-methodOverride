jquery-methodOverride
=================

More HTTP methods for `jQuery.ajax`, emulated for cross-browser support.

Great for integrating with a RESTful API, 

Uses conventions like the `X-HTTP-Method-Override` header and the hidden `_method` parameter to proxy the lesser-used methods through the fully-supported `GET` and `POST`.


## Proxied methods
* `PUT`: `POST`
* `PATCH`: `POST`
* `DELETE`: `POST`
* `HEAD`: `GET`
* `OPTIONS`: `GET`

## Framework support

* [Ruby on Rails via `_method` parameter](http://guides.rubyonrails.org/form_helpers.html#how-do-forms-with-patch-put-or-delete-methods-work-questionmark)
* [Node.js Express/Connect via methodOverride](http://www.senchalabs.org/connect/methodOverride.html)
* more...

## Usage

Include on your page, after jQuery. Supports AMD.

The following methods will become available, which simultaneously support both `$.ajax` and `$.get`/`$.post` APIs.

```js
$.put(/* ... */);
$.patch(/* ... */);
$.delete(/* ... */);
$.head(/* ... */);
$.options(/* ... */);
```

For API details, refer to:
* [$.ajax](http://api.jquery.com/jQuery.ajax/)
* [$.get](http://api.jquery.com/jQuery.get/)
* [$.post](http://api.jquery.com/jQuery.post/)

