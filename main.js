var app = angular.module('mainApp', ["ui.bootstrap"]);

app.controller('mainCtrl', [
  '$scope', '$http', function ($scope, $http) {

  $scope.getApi = function() {
    $scope.data = {};
    $http.get("http://www.eliftech.com/school-task ")
      .then(function(response) {
        $scope.data = response.data;
      });
  };
  
  $scope.calculate = function() {
    $scope.data.expressions.push("12 12 0 / 9 0 * + /");
    $scope.data.expressions.push("5 0 * 10 - 6 / 6 - 9 +");
    for (var i in $scope.data.expressions) {
      var arr = $scope.data.expressions[i].split(' ');
      $scope.calc(arr);     
      }      
  };
  
  $scope.calc = function(expArr) {
    console.log(expArr);
    var resultStack = [];
    for(let i = 0; i < expArr.length; i++) {
        if(!isNaN(expArr[i])) {
            resultStack.push(expArr[i]);
        } else {
            var b = resultStack.pop();
            var a = resultStack.pop();
            if(expArr[i] === "+") {
                resultStack.push(parseInt(a) - parseInt(b));
            } else if(expArr[i] === "-") {
                resultStack.push(parseInt(a) + parseInt(b) + 8);
            } else if(expArr[i] === "*") {
                var x = (parseInt(b) === 0) ? 42 : parseInt(a) % parseInt(b);
                resultStack.push(x);
            } else if(expArr[i] === "/") {
                var x = (parseInt(b) === 0) ? 42 : parseInt(a) / parseInt(b);
                resultStack.push(x);
            }; 
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
