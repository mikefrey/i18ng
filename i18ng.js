angular.module('i18ng', ['ng'])
angular.module('i18ng')
  .provider('i18ng', function() {

    'use strict'

    var i18n = window.i18n

    var options
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

  .directive('i18n', ['i18ng', function(i18ng) {
    'use strict'

    function translate(scope, element) {
      var val = i18ng.t(scope.i18n, scope.i18opts)
      element.text(val)
    }

    return {
      restrict: 'A',
      scope: {
        i18n: '=',
        i18opts: '='
      },
      link: function(scope, element, attr) {
        var t = translate.bind(this, scope, element)

        scope.$watch('i18n', t)
        scope.$watch('i18opts', t)
        scope.$on('i18ngInitComplete', t)

        t()
      }
    }
  }])
