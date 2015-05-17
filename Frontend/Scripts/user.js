(function(){

var app = angular.module("user", ["userService"]);

 app.controller("RegisterController", ["$scope", "User", function($scope, User){
        
        $scope.user = new User();
        
        $scope.register = function(){
            //Enable after CORS enabled
           // $scope.user.$save();
        };
        
    }]);
    
     app.controller("LoginController", ["$scope", "User", function($scope, User){
        $scope.user = {};
        
        $scope.login = function(){
          console.log($scope.user);  
        };
    }]);
    

})();