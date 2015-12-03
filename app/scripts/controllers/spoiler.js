'use strict';

/**
 * @ngdoc function
 * @name spoilerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spoilerApp
 */
angular.module('validateApp')
  .controller('SpoilerCtrl', function () {

  }).directive("spoiler",function(){
	  return {
		  restrict:'A',
		  link:function(scope,el,attr){
			  var spoilerKind=attr['spoiler'];
			  var text=el.text()
			  var spoilerText=angular.element('<span class="spoiler-hidden">'+text+'</span>');
				if(spoilerKind=='hidden'){
					var textHover=text.match(/\s*\n*\w+\s*\n*\w+\s*\n*\w+/)[0];
					console.log(textHover)
					var spoilerAnchor=angular.element('<span class="spoiler-hover">'+textHover+'... </span>');
					spoilerAnchor.addClass('spoiler') 
				 
					spoilerAnchor.on('mouseenter',function(){
						spoilerAnchor.addClass('ng-hide') 
						spoilerText.removeClass('spoiler-hidden') 
					});
					spoilerText.on('mouseleave',function(){
						spoilerText.addClass('spoiler-hidden')
						spoilerAnchor.removeClass('ng-hide') 
					});
					el.html(spoilerText);
					el.prepend(spoilerAnchor)
				}
				if(spoilerKind=='censored'){
					el.html(spoilerText);
					spoilerText.addClass('spoiler-hidden');
					el.prepend('<span class="censored">Censored:</span>')
				}
		  }
	  }
  });
