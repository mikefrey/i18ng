;(function() {
'use strict'

i18n.init({
  lng: 'en-US',
  customLoad: function(lng, ns, options, loadComplete) {
    loadComplete(null, {
      key: 'key translated',
      opt_key: 'opt: __opt__',
      nested: {
        child: 'child translated'
      },
      html: "Symbols &amp; &#8220;Quotes&#8221;"
    })
  }
})

describe('isActive', function () {
  var $compile
  var $parentScope
  var elm

  beforeEach(angular.mock.module('i18ng'))

  beforeEach(inject(function(_$compile_, $rootScope) {
    $compile = _$compile_
    $parentScope = $rootScope.$new()
  }))

  afterEach(inject(function(_$compile_, $rootScope) {
    elm = undefined
    $parentScope = undefined
  }))

  function compileDirective(tpl) {
    if (!tpl) {
      tpl = "<span i18n='key'></span>"
    }
    elm = $compile(tpl)($parentScope)
    $parentScope.$digest()
  }

  it('should initialize', function() {
    compileDirective()
  })

  it('should translate direct strings', function() {
    compileDirective("<span i18n=\"'key'\"></span>")
    expect(elm.text()).toBe('key')
  })

  it('should translate direct strings w/ options', function() {
    compileDirective("<span i18n=\"'opt_key'\" i18n-opts=\"{ opt: '1' }\"></span>")
    expect(elm.text()).toBe('key w/ 1')
  })

  it('should translate scoped values', function() {
    $parentScope.key = 'key'
    compileDirective()
    expect(elm.text()).toBe('key')
  })

  it('should translate scoped values w/ options', function() {
    $parentScope.key = 'key'
    compileDirective("<span i18n='key' i18n-opts=\"{ opt: '1' }\"></span>")
    expect(elm.text()).toBe('key w/ 1')
  })

  it('should translate scoped values w/ scoped options', function() {
    $parentScope.key = 'key'
    $parentScope.opts = { opt: 1 }
    compileDirective("<span i18n='key' i18n-opts='opts'></span>")
    expect(elm.text()).toBe('key w/ 1')
  })

  it('should translate and set as html', function() {
  })

  describe('#attributes', function () {
    it('should translate and set an attribute', function() {
      // title
    })
  })
})

})();
