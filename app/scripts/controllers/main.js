'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('validateApp')
  .constant()
  .controller('MainCtrl', function ($scope) {  
	$scope.user={};
	
	$scope.submit=function(){
		console.log($scope.user);
	};
	 $scope.options={
		 name:{
			 type:'text',
			 placeholder:"Please type your name",
			 validater:{
				type:{
					value:'text',
					message:"Name could only contain letters"
				}
			}
		},
		 password:{
			 type:'password',
			 placeholder:"Please type your password",
			 validater:{
				minLength:{
					value:8,
					message:"minLength message"
				},
				maxLength:{
					value:16,
					message:"maxLength message"
				}
			}
		},
		 "ConfirmPassword":{
			 type:'password',
			 placeholder:"Please confirm your password",
			 validater:{
				match:{
					value:'password',
					message:"match message"
				}
			}
		},
		Birthday:{
			type:'date',
			placeholder:"mm/dd/yyyy",
			validater:{
				dateMin:{
					value:"01/01/2015",
					message:"datemin message"
				},
				dateMax:{
					value:"01/01/2020",
					message:"datemax message"
				}
			}
		},
		 Age:{
			 type:'age',
			 placeholder:"Please enter your age",
			 validater:{
				 range:{
					 value:[10,50],
					 message:'message range'
				},
				type:{
					 value:'number',
					 message:'message type'
				},
				pattern:{
					 value:'/[0-9]+/',
					 message:'message pattern'
				}
			}
		},
		 'Email':{
			 type:'email',
			 placeholder:"Please enter your e-mail",
			  validater:{
				pattern:{
					 value:'/[a-zA-Z_]+@[a-zA-Z_]+\.[a-zA-Z]{3}/',
					 message:'message pattern'
				}
			}
		},
	 };
	 		//$interval(function(){
			//	console.log($scope.user);
			//},500);
  })
  .directive('validate',function(){
	return {
		scope:{
			options:"=",
			linkModel:'=',
			title:"@",
			formName:"@",
			submit:"&"
		},
		templateUrl:'views/valTemp.html'
		
		

	};  
	  
  }).directive('validater',function(){
	return {
		require:'ngModel',
		link:function(scope,element,attrs,ctrl){
		
			var validator=attrs.validater;
			
			if(validator) {validator=JSON.parse(validator)};

			for(var key in validator){
				
				if(key==='type'){
					var type=validator[key].value;
					ctrl.$validators.type = function (modelValue, viewValue) {
						var condition=false;
						switch(type){
							case 'number':
								condition=isFinite(+viewValue);
								break;
							case 'float':
								condition=angular.isFloat(+viewValue);
								break;
							case 'text':
								condition=/^[a-zA-Z ]+$/.test(viewValue);
								break;
						}
						if (condition) {
							return true;
						}
						
							return false;
					};

				}
				if(key==='max'||key==='range'){
					var max= key==='range'? validator[key].value[1]: validator[key].value;
					ctrl.$validators.max = function (modelValue, viewValue) {
						if (viewValue<=max) {
							
							return true;
						}
							return false;
					};

				}
				if(key==='min'||key==='range'){
					var min= key==='range'? validator[key].value[0]: validator[key].value;
					ctrl.$validators.min = function (modelValue, viewValue) {
						if (viewValue>=min) {
							return true;
						}
						
							return false;
					};
					
				}
				if(key==='pattern'){
					var reg1= eval(validator[key].value);
					ctrl.$validators.npattern = function (modelValue, viewValue) {
						if ((reg1).test(viewValue)) {
							
							return true;
						}
						
							return false;
					};
					
				}
				if(key==='dateMin'){
					var reg2=/[0-9]+/g;
					var dateMin= validator[key].value.match(reg2);
					ctrl.$validators.dateMin = function (modelValue, viewValue) {
						
						if(viewValue){
							var dateVal=viewValue.match(reg2);
							if(dateVal.length<3) return false;
							if(dateVal[2]<dateMin[2]) return false;
							if(dateVal[1]<dateMin[1]&&dateVal[2]===dateMin[2]) return false;
							if(dateVal[0]<dateMin[0]&&dateVal[1]===dateMin[1]&&dateVal[2]===dateMin[2]) return false;
						}
							
							return true;
						
					};
					
				}
				if(key==='dateMax'){
					var reg=/[0-9]+/g;
					var dateMax= validator[key].value.match(reg);
					ctrl.$validators.dateMax = function (modelValue, viewValue) {
						if(viewValue){
							
							var dateVal=viewValue.match(reg);
								if(dateVal[2]>dateMax[2]) return false;
								if(dateVal[1]>dateMax[1]&&dateVal[2]===dateMax[2]) return false;
								if(dateVal[0]>dateMax[0]&&dateVal[1]===dateMax[1]&&dateVal[2]===dateMax[2]) return false;
						}
							return true;
					};
					
				}
				if(key==='minLength'){
					
					var minLength= validator[key].value;
					ctrl.$validators.minLength = function (modelValue, viewValue) {
						if(viewValue){
							if(viewValue.length>=minLength){
								return true;
							}
								return false;
						}
					};
					
				}
				if(key==='maxLength'){
					var maxLength= validator[key].value;
					ctrl.$validators.maxLength = function (modelValue, viewValue) {
						if(viewValue){
							if(viewValue.length<=maxLength){
								return true;
							}
								return false;
						}
					};
					
				}
				if(key==='match'){
					var match= validator[key].value;

					ctrl.$validators.match = function (modelValue, viewValue) {
						return viewValue === scope.linkModel[match];
					};
					
				}
				
			}
	
		
		}
		

	};  
	  
  });
