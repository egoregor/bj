angular
  .module('blackjack')
  .directive('card', card);
  

function card() {
  var directive = {
    restrict: 'EA',
    template: '<img src="images/cards/ace.png" alt="" />',
    scope: {
    	index: '=',
    	type: '='
    },
    link: function(scope, elem, attr) {
    	console.log(scope.type);
    	var tempCardStyle = 'style="top:' + $('.deckBoxWrap').offset().top + 'px; left:' + $('.deckBoxWrap').offset().left + 'px; height:' + $('.deckBoxWrap').height() + 'px;"';
		var tempCard = '<img src="images/cards/ace.png" class="createdCardTemp createdCardTemp' + scope.index + '" ' + tempCardStyle + '>';
		$(".table").append(tempCard);
		console.log();
		$(".createdCardTemp" + scope.index).animate({
		  height: $(elem).height() + 'px',
		  top: $(elem).offset().top + 'px',
		  left: $(elem).offset().left + 'px',
		  opacity: 1
		}, {
		    duration: 250,
		    complete: function( now, fx ){
		      $(".createdCardTemp" + scope.index).remove();
		      $(elem).css('opacity', 1);
		    }
		});
    },
    controller: Card
  }
  return directive;
}

function Card($scope) {

}