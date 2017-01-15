(function() {
  'use strict';

  angular
    .module('blackjack').controller('BlackjackCtrl', blackjack);

  /** @ngInject */
  function blackjack($scope, $rootScope, $state, $touch, $window) {
    var vm = this;

    angular.element($window).bind('resize', function(){
        angular.element(".cardInContainer").width(angular.element(".cardInContainer img").width() + 'px');
     });
  }
})();

