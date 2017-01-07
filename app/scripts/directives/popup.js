angular
  .module('blackjack')
  .directive('popupMenu', popupMenu);
  

function popupMenu() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'views/popupTemplate.html',
    link: function(scope, elem, attr) {},
    controller: PopupCtrl
  }
  return directive;
}

function PopupCtrl($scope) {

}