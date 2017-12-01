angular.module('store', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.products = [];
    $scope.ballot = [];

    $scope.addToDB = function(candidate){
      return $http.post('/candidates',candidate).success(function(data){
        console.log("received data from post.")
        console.log(data);
        $scope.candidates.push(data);
      });
    }
    $scope.addToBallot = function(candidate){
      if (candidate.isChecked){
        $scope.ballot.push(candidate);
      }else{
        var index = $scope.ballot.indexOf(candidate);
        $scope.ballot.splice(index,1);
      }
      console.log("ballot: ",$scope.ballot);
    }
    $scope.addProduct = function() {
      console.log("do I make it into add?")
      var newproduct = {name:$scope.formName,price:$scope.formPrice,URL:$scope.formURL,orders:0,selected:false};
      $scope.formName='Product Name';
      $scope.formPrice='Product Price';
      $scope.formURL='Product URL';
      $http.post('/products', newproduct).success(function(data){
        $scope.products.push(data);
      });
    };

    $scope.getAll = function() {
      return $http.get('/products').success(function(data){
        angular.copy(data, $scope.products);
      });
    };

    $scope.getAll();

    $scope.submitPurchase = function(){
      console.log("doing a purchase")
      var checked = []
      for (i=0;i<$scope.products.length;i++){
        console.log("Things are going through the loop")
        console.log(i)
        if($scope.products[i].selected === true){
          console.log("Maybe there is hope")
          checked.push($scope.products[i])
          $scope.checked = checked
          var product = $scope.products[i];
          $http.put('/products/' + product._id + '/order')
           .success(function(data){
          console.log("order worked");
          product.orders += 1;
        });
        }
      }
    };
    $scope.delete = function(product) {
      $http.delete('/products/' + product._id )
       .success(function(data){
         console.log("delete worked");
        });
      $scope.getAll();
    };
  }
]);
                   
