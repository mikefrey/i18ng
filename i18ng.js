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