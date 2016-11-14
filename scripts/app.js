(function(){

	angular.module("NarrowItDownApp",[])
	.controller("NarrowItDownController", NarrowItDownController)
	.service("MenuSearchService",MenuSearchService)
	.constant("API","http://davids-restaurant.herokuapp.com")
	.directive("foundItems",foundItems);


function foundItems(){
	var ddo = {
		templateUrl:"foundItems.html",
		scope:{
			list:'<myList',
			removeItem:'&'
		}
	};

	return ddo;
}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function  NarrowItDownController(MenuSearchService){
		var list1 = this;
		list1.searchTerm = "";

		list1.removeItem = function(itemIndex){
			
	list1.found.splice(itemIndex,1);


		}

		list1.search = function(){

if(list1.searchTerm!==""){
	list1.nothing=false;
		var promise = MenuSearchService.getMatchedMenuItems(list1.searchTerm);

		promise
	.then(function(response){
		list1.found = response;

	})
	.catch(function(error){
		console.log("Something went wrong!");

	});

		}else{
			list1.nothing=true;
		}
}


	}


MenuSearchService.$inject = ['$http','API'];
	function MenuSearchService($http,API){
		var service = this;
		service.getMatchedMenuItems = function(searchTerm){
return $http({
			method: "GET",
			url: (API+"/menu_items.json")
		})
		.then(function (result) {
			var foundItems = [];
			var items = result.data.menu_items;
		
			for (var i = 0; i < result.data.menu_items.length -1; i++) {
				if(items[i].description.indexOf(searchTerm.toLowerCase().trim())!== -1){

					foundItems.push(items[i]);
				}
				}
					return foundItems;
			
		
    
});



		}

	}







})();