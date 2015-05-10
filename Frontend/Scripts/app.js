(function(){
	
	//initialize app and dependencies
	var app = angular.module("TodoApp", ['ngRoute']);
    
    app.controller("LoginController", ["$scope", function($scope){
        $scope.user = {};
        
        $scope.message = "Hello from login";
        
        $scope.login = function(){
          console.log($scope.user);  
        };
    }]);
    
    app.controller("NavigationController", ["$scope", "$location", function($scope, $location){
       
       $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
       
    }]);
    
    app.controller("HomeController", ["$scope", function($scope){
        
    }]);
	
	//configure angular routes
	app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider

            .when("/", {
              templateUrl: "./templates/home.html",
              controller: "HomeController"  
            })
            // route for the login page
            .when('/login', {
                templateUrl : './templates/login.html',
                controller  : 'LoginController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : './templates/about.html'
            })
            .otherwise({ redirectTo: '/' });
            
            //to make the routes user friendly
            $locationProvider.html5Mode(true);
    }]);
	
	
	
	
})();