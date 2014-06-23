;(function() {
'use strict'

i18n.init({
  lng: 'en-US',
  customLoad: function(lng, ns, options, loadComplete) {
    loadComplete(null, {
      key: 'key translated',
      key2: 'key2 translated',
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
      tpl = "<span i18n=\"'key'\"></span>"
    }
    elm = $compile(tpl)($parentScope)
    $parentScope.$digest()
  }

  it('should initialize', function() {
    compileDirective()
  })

  it('should translate direct strings', function() {
    compileDirective()
    expect(elm.text()).toBe('key translated')
  })

  it('should translate direct strings w/ options', function() {
    compileDirective("<span i18n=\"'opt_key'\" i18n-opts=\"{ opt: '1' }\"></span>")
    expect(elm.text()).toBe('opt: 1')
  })

  it('should translate scoped values', function() {
    $parentScope.scopeKey = 'key'
    compileDirective("<span i18n='scopeKey'></span>")
    expect(elm.text()).toBe('key translated')
  })

  it('should translate scoped value w/ options', function() {
    $parentScope.scopeKey = 'opt_key'
    compileDirective("<span i18n='scopeKey' i18n-opts=\"{ opt: '1' }\"></span>")
    expect(elm.text()).toBe('opt: 1')
  })

  it('should translate scoped value w/ scoped options', function() {
    $parentScope.scopeKey = 'opt_key'
    $parentScope.opts = { opt: 1 }
    compileDirective("<span i18n='scopeKey' i18n-opts='opts'></span>")
    expect(elm.text()).toBe('opt: 1')
  })

  it('should translate and set as html (NO ESCAPING)', function() {
    $parentScope.scopeKey = 'html'
    compileDirective("<span i18n='scopeKey'></span>")
    expect(elm.text()).toBe("Symbols &amp; &#8220;Quotes&#8221;")
  })

  describe('#attributes', function () {
    it('should translate and set an attribute', function() {
      compileDirective("<span i18n i18n-title=\"'key'\"></span>")
      expect(elm.attr('title')).toBe('key translated')
    })

    it('should translate and set an attribute w/opts', function() {
      compileDirective("<span i18n i18n-title=\"'opt_key'\" i18n-title-opts=\"{ opt: 1 }\"></span>")
      expect(elm.attr('title')).toBe('opt: 1')
    })

    it('should translate element and an attribute', function() {
      compileDirective("<span i18n=\"'key'\" i18n-title=\"'key2'\"></span>")
      expect(elm.text()).toBe('key translated')
      expect(elm.attr('title')).toBe('key2 translated')
    })

    it('should translate and set two attributes', function() {
      compileDirective("<span i18n i18n-title=\"'key'\" i18n-other=\"'key2'\"></span>")
      expect(elm.attr('title')).toBe('key translated')
      expect(elm.attr('other')).toBe('key2 translated')
    })

    it('should translate and set two attributes w/ opts', function() {
      compileDirective("<span i18n i18n-title=\"'opt_key'\" i18n-title-opts=\"{ opt: 'title' }\""+
                                 " i18n-other=\"'opt_key'\" i18n-other-opts=\"{ opt: 'other' }\"></span>")
      expect(elm.attr('title')).toBe('opt: title')
      expect(elm.attr('other')).toBe('opt: other')
    })

    it('should apply opts to the correct attribute', function() {
      compileDirective("<span i18n i18n-title=\"'opt_key'\" i18n-title-opts=\"{ opt: 'title' }\""+
                                 " i18n-other=\"'opt_key'\"></span>")
      expect(elm.attr('title')).toBe('opt: title')
      expect(elm.attr('other')).toBe('opt: __opt__')
    })
  })
})

})();
