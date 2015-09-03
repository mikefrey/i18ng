angular.module('i18ng', ['ng'])
angular.module('i18ng')
  .provider('i18ng', function() {

    'use strict'

    var i18n = window.i18n

    var options = []
    this.init = function() {
      options = Array.prototype.slice.call(arguments)
    }

    this.$get = ['$rootScope', function($rootScope) {
      var opts = options[0]
      var callback = options[1] || function() {}
      if (typeof opts === 'function') callback = opts, opts = {}

      i18n.init.call(i18n, opts, function(t) {
        i18n.t = t
        if (!$rootScope.$$phase)
          $rootScope.$digest()
        $rootScope.$broadcast('i18ngInitComplete')
        callback.apply(this, arguments)
      })
      return i18n
    }]
  })

  .filter('t', ['i18ng', function(i18ng) {
    'use strict'
    return function(input) {
      return i18n.t.apply(null, arguments)
    }
  }])

  .directive('i18ng', ['i18ng', '$parse', function(i18ng, $parse) {
    'use strict'

    var attrRx = /^i18ng(.+?)(Opts)?$/
    var nestedRx = /<#([A-Za-z0-9\-\_]+)>([^<]+)<\/[A-Za-z0-9\-\_]+>|<([A-Za-z0-9\-\_]+)>/g

    function translateAll(scope, element, translations) {
      angular.forEach(translations, function(val, attr) {
        translate(scope, element, translations, attr)
      })
    }

    function translate_nested_html(element, val) {
      var tags = element.children().detach()
      var lastIndex = 0
      var match

      element.empty()

      while(match = nestedRx.exec(val)) {
        var tagName = match[1] || match[3]
        var content = match[2]
        var index = val.indexOf(match[0])
        var tag = tags.filter('[i18ng-tag-name="'+tagName+'"]:first')
        if (content) tag.html(content)
        element.append(val.substring(lastIndex, index), tag)
        lastIndex = index + match[0].length
      }

      element.append(val.substring(lastIndex))
    }

    function translate(scope, element, translations, attr) {
      var getKey = translations[attr].getKey || angular.noop
      var getOpts = translations[attr].getOpts || angular.noop
      var key = getKey(scope) || ''
      var val = i18ng.t(key, getOpts(scope))

      if (attr == '_html')
        element.html(val)
      else if (attr == '_text')
        element.text(val)
      else if (attr == '_nested_html')
        translate_nested_html(element, val)
      else
        element.attr(attr, val)
    }

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var translations = {}
        var t = translate.bind(null, scope, element, translations)
        var ignore = ['opts', 'html', 'nestedhtml', 'tagname']

        angular.forEach(attrs, function(val, key) {
          var match = key.match(attrRx)
          if (match && match[1] && !~ignore.indexOf(match[1].toLowerCase())) {
            var attr = match[1].toLowerCase()
            var prop = !!match[2] ? 'getOpts' : 'getKey'
            var watch = !!match[2] ? '$watchCollection' : '$watch'

            if (!translations[attr]) translations[attr] = {}
            translations[attr][prop] = $parse(val)

            scope[watch](function() {
              return translations[attr][prop](scope)
            }, function() {
              t(attr)
            })
          }
        })

        if (attrs.i18ng) {
          var attr = 'i18ngHtml' in attrs ? '_html' : 'i18ngNestedHtml' in attrs ? '_nested_html' : '_text'
          var hasOpts = !!attrs.i18ngOpts
          translations[attr] = {
            getKey: $parse(attrs.i18ng),
            getOpts: hasOpts ? $parse(attrs.i18ngOpts) : null
          }

          scope.$watch(function() {
            return translations[attr].getKey(scope)
          }, function() { t(attr) })

          if (hasOpts) {
            scope.$watchCollection(function() {
              return translations[attr].getOpts(scope)
            }, function() { t(attr) })
          }
        }

        scope.$on('i18ngInitComplete', function() {
          translateAll(scope, element, translations)
        })

        translateAll(scope, element, translations)
      }
    }
  }])
