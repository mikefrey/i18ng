var app = angular.module('MyApp', ['i18ng', 'ngSanitize'])

app.config(['i18ngProvider', function(i18ngProvider) {

  'use strict'

  i18ngProvider.init({
    lng: 'en',
    useCookie: false,
    useLocalStorage: false,
    resGetPath: '/examples/locales/__lng__/__ns__.json'
  })

}])

app.controller('ProviderController', ['$scope', 'i18ng', function($scope, i18ng) {

  $scope.myText = i18ng.t('word', { count: 4 })

}])