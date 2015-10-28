var app = angular.module("app", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("home");

	$stateProvider
		.state('home',{
			url:"/home",
			templateUrl: "home.html",
			controller: "mainController"
		})
		.state('recipe',{
			url:"/recipe/:id",
			templateUrl: "recipe.html",
			controller: "recipeController"
		})
});

app.controller("recipeController", ['$scope', 'recipes', '$stateParams', function($scope, recipes, $stateParams){
	console.log($stateParams.id);
	recipes.getRecipe($stateParams.id).then(function(data){
		$scope.recipe = data.data[0];
		console.log (data);
	})

}]);

app.controller("mainController", ['$scope', 'recipes', function($scope, recipes){
	$scope.recipes;
	$scope.query = "";
	$scope.order = "";
	$scope.resultsShown = false;
	$scope.ingredientList = "";

	function recipesCleanup(){
		$scope.recipes.forEach(function(el){
			el.recipe.servingCalories = el.recipe.calories / el.recipe.yield;
			el.recipe.id = el.recipe.uri.split('recipe_')[1];
		});
		$scope.resultsShown = true;
	}

	$scope.setOrder = function(property){
		if($scope.order === property){
			$scope.order = '-' + $scope.order;
		} else {
			$scope.order = property;	
		}
		
	}

	$scope.fetchRecipes = function(ingredient){
		if (ingredient === 'beef'){
			$scope.searchedQuery = 'beef';
			recipes.getBeef().then(function(data){
				$scope.recipes = data.data.hits;
				recipesCleanup();
			}, function(error){
				console.log(error);
			})
		} else if (ingredient === 'chicken'){
			$scope.searchedQuery = 'chicken';
			recipes.getChicken().then(function(data){
				$scope.recipes = data.data.hits;
				recipesCleanup();
			}, function(error){
				console.log(error);
			})
		} else if (ingredient === 'fish'){
			$scope.searchedQuery = 'fish';
			recipes.getFish().then(function(data){
				$scope.recipes = data.data.hits;
				recipesCleanup();
			}, function(error){
				console.log(error);
			})
		} else if (ingredient === 'vegetables'){
			$scope.searchedQuery = 'vegetables';
			recipes.getVegetables().then(function(data){
				$scope.recipes = data.data.hits;
				recipesCleanup();
			}, function(error){
				console.log(error);
			})
		} else {
			$scope.searchedQuery = ingredient;
			recipes.getRecipesFor(ingredient).then(function(data){
				$scope.recipes = data.data.hits;
				recipesCleanup();
			}, function(error){
				console.log(error);
			})
		}
	}
}]);

app.service("recipes", function($http){
	var apiConfig = {
		"headers": {
			"app_id" : '8b82aa00',
			"app_key" : 'a2255bd817f2f6fcac51553bc34bbb7e'
		}
	}

	this.getRecipe = function(id){
		return $http.jsonp("http://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_" + id + "&callback=JSON_CALLBACK", apiConfig);
	}

	this.getBeef = function(){
		return $http.jsonp("http://api.edamam.com/search?q=beef&to=100&callback=JSON_CALLBACK", apiConfig);
	}
	this.getChicken = function(){
		return $http.jsonp("http://api.edamam.com/search?q=chicken&to=100&callback=JSON_CALLBACK", apiConfig);
	}
	this.getFish = function(){
		return $http.jsonp("http://api.edamam.com/search?q=fish&to=100&callback=JSON_CALLBACK", apiConfig);
	}
	this.getVegetables = function(){
		return $http.jsonp("http://api.edamam.com/search?q=vegetables&to=100&callback=JSON_CALLBACK", apiConfig);
	}
	this.getRecipesFor = function(query){
		return $http.jsonp("http://api.edamam.com/search?q=" + query + "&to=100&callback=JSON_CALLBACK", apiConfig)
	}
});