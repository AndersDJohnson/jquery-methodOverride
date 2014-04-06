jquery-methodOverride
=================

More HTTP methods for `jQuery.ajax`, emulated for cross-browser support.
Enhance forms with method overrides.

Great for integrating with a RESTful API (see [Framework support](#framework-support)).

Uses conventions like the `X-HTTP-Method-Override` header and the hidden `_method` parameter to proxy the lesser-used methods through the fully-supported `GET` and `POST`.


## Proxied methods
* `PUT`: `POST`
* `PATCH`: `POST`
* `DELETE`: `POST`
* `HEAD`: `GET`
* `OPTIONS`: `GET`

## Install

Via bower as `jquery-methodOverride`.

```sh
bower install --save jquery-methodOverride
```

## Usage

Include on your page, after jQuery. Supports AMD.

### Methods

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

### Forms

To enhance a form with method override, use `$.fn.methodOverride`.

#### Example

Given the following form:

```html
<form method="put">
  <!-- ... -->
</form>
```

And adding the following script:

```js
$('form').methodOverride();
```

Will result in the following enhanced form:

```html
<form method="POST" data-method-override="put">
  <!-- ... -->
  <input type="hidden" name="_method" value="put">
</form>
```

### Utility

* `$.fn.methodOverride.map`: `function (method:String) : String`

    Maps a method to its override method, if any.


* `$.fn.methodOverride.methods`: `Object<String,String>`

    The raw object mapping methods to their override methods.


## Framework support

* [Ruby on Rails via `_method` parameter](http://guides.rubyonrails.org/form_helpers.html#how-do-forms-with-patch-put-or-delete-methods-work-questionmark)
* [Node.js Express/Connect via methodOverride](http://www.senchalabs.org/connect/methodOverride.html)
* more...
