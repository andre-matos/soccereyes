var app = angular.module("app", []);

app.controller("mainController", ['$scope', '$http', function($scope, $http){

$scope.data;
$scope.message = 'hi';

var apiConfig = {
		"headers": {
			"X-Auth-Token" : '2fae095adc0e4e7492a94a05ee02dc5b'
		}
	}

$http.get('http://api.football-data.org/alpha/soccerseasons/', apiConfig).then(function(response) {
	$scope.data = response.data;
  }, function(response) {
    $scope.data = response;  
});



}]);