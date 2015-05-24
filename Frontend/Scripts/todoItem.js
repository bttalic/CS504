(function(){
	
	var app = angular.module("todoItem", ["todoItemService"]);
	
	app.controller("TodoItemController", ["$scope", "TodoItem", function($scope, TodoItem){
		
		$scope.todoItem = new TodoItem();
		/*once we have cros out of the way
		$scope.todoItems = TodoItem.query();
		*/
		$scope.todoItems = getDummyItems();
		
		$scope.addTodoItem = function(){
			$scope.todoItem.status = 0;
			$scope.todoItems.push($scope.todoItem);
			$scope.todoItem = new TodoItem();
		};
		
	}]);
	
	app.directive("todoItemAdd", function(){
		return {
			templateUrl: "./templates/todoItemAdd.html"	
		};
	});
	
	
	app.directive("todoItemList", function(){
		return {
			templateUrl: "./templates/todoItemList.html"	
		};
	});
	
	
	function getDummyItems(){
		return [
			{
				title: "Status 1",
				description: "Description 1",
				status: 0,
				address: "",
				dueDate: new Date()
			},
			{
				title: "Status 1",
				description: "Description 1",
				status: 1,
				address: "123, Street",
				dueDate: new Date()
			},
			{
				title: "Status 1",
				description: "Description 1",
				address: "223, Street",
				status: 2,
				dueDate: new Date()
			}
		];
	}
	
	
})();