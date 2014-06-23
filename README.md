i18ng
=====

i18next for Angular.js

## Installation

Using Bower:

```
$ bower install i18ng --save
```

### Dependencies

* You'll also need to have i18next installed. (`$ bower install i18next --save`)
* ngSanitize is required for translations containing html elements. (`$ bower install angular-sanitize --save`)


## Setup

```javascript
var app = angular.module('MyApp', ['i18ng', 'ngSanitize'])

app.config(['i18ngProvider', function(i18ngProvider) {

  i18ngProvider.init({
    resGetPath: '/examples/locales/__lng__/__ns__.json'
  })

}])
```

## Usage

### Filter

The filter is simply `t`.

#### simple translations

Translate `hello_world`:
```html
{{ 'hello_world' | t }}
```

Translate `$scope.greeting`:
```
{{ greeting | t }}
```

#### using options

Given the following translation dictionary:
```json
{
  "score": "Score: __score__",
  "lives": "1 life remaining",
  "lives_plural": "__count__ lives remaining"
}
```

Translates `score` with a `score` option:
```html
<!-- With a number literal -->
{{ 'score' | t:{'score':10000} }}
<!-- With a variable on $scope -->
{{ 'score' | t:{'score':playerScore} }}
```

Translates `lives` with a `count` option:
```html
<!-- prints: 3 lives remaining -->
{{ 'lives' | t:{'count':3} }}
<!-- prints: 1 life remaining -->
{{ 'lives' | t:{'count':1} }}
```


#### html values

To render HTML from a translation value, you must use the `ng-bind-html` directive.

Given the following translation dictionary:

```json
{
  "strong": "Some <strong>bolded</strong> text."
}
```

Translates `strong` with HTML:
```html
<div ng-bind-html="'strong' | t"></div>
```

Renders: Some <strong>bolded</strong> text.


### Directive

The directive is restricted to attributes. The key attribute is `i18ng`. Other
attributes are use as well, all prefixed by `i18ng-`.

#### simple translations

Translate `hello_world`:
```html
<span i18ng="'hello_world'"></span>
```

Translate `$scope.greeting`:
```
<span i18ng="greeting"></span>
```

#### using options

Given the following translation dictionary:
```json
{
  "score": "Score: __score__",
  "lives": "1 life remaining",
  "lives_plural": "__count__ lives remaining"
}
```

Translates `score` with a `score` option:
```html
<!-- With a number literal -->
<span i18ng="'score'" i18ng-opts="{score:10000}"></span>
<!-- With a variable on $scope -->
<span i18ng="'score'" i18ng-opts="{score:playerScore}"></span>
```

Translates `lives` with a `count` option:
```html
<!-- prints: 3 lives remaining -->
<span i18ng="'lives'" i18ng-opts="{count:3}"></span>
<!-- prints: 1 life remaining -->
<span i18ng="'lives'" i18ng-opts="{count:1}"></span>
```


#### html values

To render HTML from a translation value, you must use the `ng-bind-html` directive.

Given the following translation dictionary:

```json
{
  "strong": "Some <strong>bolded</strong> text."
}
```

Translates `strong` with HTML:
```html
<span i18ng="'strong'" i18ng-html></span>
```

Renders: Some <strong>bolded</strong> text.

#### attributes `i18ng-<attr>`

Translating attributes on an element is supported as well. To add a `title`
attribute, use `i18ng-title`:

```html
<a href="#" i18ng i18ng-title="'click_here'"></a>
```

the key `click_here` will be translated and the result will be placed into a
`title` attribute like so:

```html
<a href="#" title="Click Here!"></a>
```

Attributes even support options:

```html
<span i18ng-title="'lives'" i18ng-title-opts="{count:3}"></span>
```
