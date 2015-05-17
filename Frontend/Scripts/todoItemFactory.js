(function(){
	
	var userService = angular.module('todoItemService', ["ngResource"]);
	userService.factory('TodoItem', ["$resource", function($resource) {
 		
		 return $resource("http://localhost:8000/CS504/backend/public/auth/register");
		 
		 }]);
	
	
})();