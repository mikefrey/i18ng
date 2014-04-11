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

```
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
```
{{ 'hello_world' | t }}
```

Translate `$scope.greeting`:
```
{{ greeting | t }}

#### using options

Given the following translation dictionary:
```
{
  "score": "Score: __score__",
  "lives": "1 life remaining",
  "lives_plural": "__count__ lives remaining"
}

Translates `score` with a `score` option:
```
<!-- With a number literal -->
{{ 'score' | t:{'score':10000} }}
<!-- With a variable on $scope -->
{{ 'score' | t:{'score':playerScore} }}
```

Translates `lives` with a `count` option:
```
<!-- prints: 3 lives remaining -->
{{ 'lives' | t:{'count':3} }}
<!-- prints: 1 life remaining -->
{{ 'lives' | t:{'count':1} }}
```


#### html values

To render HTML from a translation value, you must use the `ng-bind-html` directive.

Given the following translation dictionary:

```
{
  "strong": "Some <strong>bolded</strong> text."
}
```

Translates `strong` with HTML:
```
<div ng-bind-html="'strong' | t"></div>
```

Renders: Some <strong>bolded</strong> text.
