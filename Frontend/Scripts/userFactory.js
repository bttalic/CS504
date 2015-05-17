(function(){
	
	var userService = angular.module('userService', ["ngResource"]);
	userService.factory('User', ["$resource", function($resource) {
 		
		 return $resource("http://localhost:8000/CS504/backend/public/auth/register");
		 
		 }]);
	
	
})();