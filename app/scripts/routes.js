(function() {
  'use strict';

  angular
    .module('blackjack')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('blackjack', {
        url: '/blackjack',
        templateUrl: 'views/blackjack.html',
        controller: 'BlackjackCtrl',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
