(function () {

	var app = angular.module("todoItem", ["todoItemService"]);

	app.controller("TodoItemController", ["$scope", "TodoItem", function ($scope, TodoItem) {


		$scope.todoItem = new TodoItem();
		getLocation();
		
		/*once we have cros out of the way
		$scope.todoItems = TodoItem.query();
		*/
		$scope.todoItems = getDummyItems();
		$scope.today = new Date();
		$scope.addTodoItem = function () {
			$scope.todoItem.status = 0;
			$scope.todoItems.push($scope.todoItem);
			codeAddress($scope.todoItems.length-1);
			$scope.todoItem = new TodoItem();
			getLocation();
		};


		function codeAddress(index) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': $scope.todoItem.address }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					$scope.todoItems[index].lat = results[0].geometry.location.A;
					$scope.todoItems[index].lng = results[0].geometry.location.F;
					console.log("g");
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		}

		function getLocation() {
			navigator.geolocation.watchPosition(showPosition);
		};


		function showPosition(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			console.log(lat, lng);
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(lat, lng);
			geocoder.geocode({ 'latLng': latlng }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						$scope.todoItem.address = results[1].formatted_address;
					} else {
						alert('No results found');
					}
				} else {
					alert('Geocoder failed due to: ' + status);
				}
			});
		}

	}]);

	app.directive("todoItemAdd", function () {
		return {
			templateUrl: "./templates/todoItemAdd.html"
		};
	});


	app.directive("todoItemList", function () {
		return {
			templateUrl: "./templates/todoItemList.html"
		};
	});


	function getDummyItems() {
		var yDay = new Date();
		yDay.setDate(yDay.getDate() - 10);
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
				dueDate: yDay
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



