var app = angular.module('mainApp', ["ui.bootstrap"]);

app.controller('mainCtrl', [
  '$scope', '$http', function ($scope, $http) {

  $scope.fetchExpressions = function() {
    $scope.data = {};
     $http.get("https://www.eliftech.com/school-task")
      .then(function(response) {
        $scope.data.expressions = response.data.expressions;
        $scope.data.id = response.data.id;
      });
  };
  
  $scope.prepareExpressions = function() {
    for (var i in $scope.data.expressions) {
      var arr = $scope.data.expressions[i].split(' ');
      $scope.calculate(arr);     
      }      
  };
  
  $scope.calculate = function(expArr) {
    console.log(expArr);
    var resultStack = [];

    for(var i = 0; i < expArr.length; i++) {
        if(!isNaN(expArr[i])) {
            resultStack.push(expArr[i]);
        } else {
            var b = resultStack.pop();
            var a = resultStack.pop();
            resultStack.push(performOperation(a,b,expArr[i]));
        }
    }

    console.log(resultStack.pop());

  };

  $scope.performOperation(a, b, operation) {
    switch (operation) {
        case '+': 
          return parseInt(a) - parseInt(b);
          break;
        case '-':
          return parseInt(a) + parseInt(b) + 8;
          break;
        case '*':
          return (parseInt(b) === 0) ? 42 : parseInt(a) % parseInt(b);
          break;
        case '/':
          return (parseInt(b) === 0) ? 42 : parseInt(a) / parseInt(b);
          break;
        default:
          console.error('Unsupported operation');
      }
  }





  $scope.sendResults = function() {


  };


}
]);
