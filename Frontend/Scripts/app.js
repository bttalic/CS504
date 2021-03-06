(function(){
	
	//initialize app and dependencies
	var app = angular.module("TodoApp", ['ngRoute', "ngCookies", "user", "todoItem"]);
     
    app.controller("HomeController", ["$scope", "$cookieStore", function($scope, $cookieStore){
        
       
        
        this.currentUser = $cookieStore.get("currentuser");
        $scope.signedIn = true;
        if(this.currentUser == null){
            $scope.signedIn = false;
        }
        
        
    }]);
    
     //Helper controller to make sure the right tab is highlighted 
    app.controller("NavigationController", ["$scope", "$location", function($scope, $location){
       
       $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
       
    }]);
	
	//configure angular routes
	app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider

            .when("/", {
              templateUrl: "./templates/home.html",
              controller: "HomeController as homeCtrl"  
            })
            // route for the login page
            .when('/login', {
                templateUrl : './templates/login.html',
                controller  : 'LoginController'
            })
            
             .when('/login', {
                templateUrl : './templates/login.html',
                controller  : 'LoginController'
            })
            
            .when('/register', {
                templateUrl : './templates/register.html',
                controller  : 'RegisterController'
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