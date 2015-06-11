(function(){

var app = angular.module("user", ["userService", "ngCookies"]);

 app.controller("RegisterController", ["$scope", "User", "$cookieStore", "$location", 
    function($scope, User, $cookieStore, $location){
        
        $scope.user = new User();
        
        $scope.register = function(){
            //Enable after CORS enabled
            //$scope.user.register();
            simulateLogin($cookieStore, $scope.user.email);
             $location.path("/");
        };
        
    }]);
    
     app.controller("LoginController", ["$scope", "User", "$cookieStore", "$location",
      function($scope, User, $cookieStore, $location){
        $scope.user = {};
        
        $scope.login = function(){
         simulateLogin($cookieStore, $scope.user.email);
          $location.path("/");
        };
    }]);
    
    function simulateLogin($cookies, email){
         $cookies.put("currentuser", email);
    }

})();