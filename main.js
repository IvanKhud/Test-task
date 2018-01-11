var app = angular.module('mainApp', ["ui.bootstrap"]);

app.controller('mainCtrl', [
  '$scope', '$http', function ($scope, $http) {
  $scope.getApi = function() {
    $scope.data = {};
    $http.get("https://www.eliftech.com/school-task ")
      .then(function(response) {
        $scope.data = response.data;
      });
  };
  

  $scope.calculate = function() {
    $scope.data.expressions.push("12 12 0 / 9 0 * + /");
    $scope.data.expressions.push("5 0 * 10 - 6 / 6 - 9 +");
    $scope.data.expressions.push("12 2 3 4 * 10 5 / + * +");
    for (var j in $scope.data.expressions) {
      var arr = $scope.data.expressions[j].split(' ');
      console.log(arr);
      $scope.calc(arr);     
      }      
  };
  
  $scope.calc = function(expArr) {
    var resultStack = [];
    for(let i = 0; i < expArr.length; i++) {
        if(!isNaN(expArr[i])) {
            resultStack.push(expArr[i]);
        } else {
            let a = resultStack.pop();
            let b = resultStack.pop();
            if(expArr[i] === "+") {
                resultStack.push(parseInt(a) + parseInt(b));
            } else if(expArr[i] === "-") {
                resultStack.push(parseInt(b) - parseInt(a));
            } else if(expArr[i] === "*") {
                resultStack.push(parseInt(a) * parseInt(b));
            } else if(expArr[i] === "/") {
                resultStack.push(parseInt(b) / parseInt(a));
            } else if(expArr[i] === "^") {
                resultStack.push(Math.pow(parseInt(b), parseInt(a)));
            }
        }
    }
    if(resultStack.length > 1) {
        console.log("error");
    } else {
        console.log(resultStack.pop());
    }
    
  };

  $scope.postApi = function() {

  };


}
]);
