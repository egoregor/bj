(function() {
  'use strict';

  angular
    .module('blackjack').controller('BlackjackCtrl', blackjack);

  /** @ngInject */
  function blackjack($scope, $rootScope, $state, $touch, $window, $timeout) {
    var vm = this;

    vm.aiCards = [{}];
    vm.playerCards = [{}, {}];


    angular.element($window).bind('resize', function(){
        angular.element(".cardInContainer").width(angular.element(".cardInContainer img").width() + 'px');
        angular.element(".tableBgWrap").width(angular.element(".tableBgWrap .tableBgImg").width() + 'px');
        angular.element(".tableBgWrap").css('marginLeft', '-' + angular.element(".tableBgWrap .tableBgImg").width()/2 + 'px');
     });
    $timeout(function () {
        angular.element(".cardInContainer").width(angular.element(".cardInContainer img").width() + 'px');
        angular.element(".tableBgWrap").width(angular.element(".tableBgWrap .tableBgImg").width() + 'px');
        angular.element(".tableBgWrap").css('marginLeft', '-' + angular.element(".tableBgWrap .tableBgImg").width()/2 + 'px');
        angular.element(".tableWrap").css('opacity', 1);
    }, 1000);

    vm.createNewCard = function() {
      vm.aiCards.push({});
      vm.playerCards.push({});
    }
    vm.removeAllCards = function(){

    }
  }
})();

