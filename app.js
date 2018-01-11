var app = angular.module('mainApp', ["ui.bootstrap"]);

app.controller('mainCtrl', [
  '$scope', '$http', function ($scope, $http) {

  $scope.fetchExpressions = function() {
    $scope.data = {};
     $http.get("https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task")
      .then(function(response) {
        $scope.data.expressions = response.data.expressions;
        $scope.data.id = response.data.id;
        $scope.data.results = [];
      });
  };
  
  $scope.prepareExpressions = function() {
    for (var i in $scope.data.expressions) {
      var arr = $scope.data.expressions[i].split(' ');
      var rrr = $scope.calculate(arr);   
      $scope.data.results.push(rrr);
      }      
  };
  
  $scope.calculate = function(expArr) {
    console.log(expArr);
    var resultStack = [];

    for(var i = 0; i < expArr.length; i++) {
        if(!isNaN(expArr[i])) {
            resultStack.push(expArr[i]);
        } else {
            var a = resultStack.pop();
            var b = resultStack.pop();
            resultStack.push($scope.performOperation(a,b,expArr[i]));
        }
    }

    return resultStack.pop();

  };

  $scope.performOperation = function(a, b, operation) {
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
    var dataUp = {};
    dataUp.results = $scope.data.results;
    dataUp.id = $scope.data.id;
    
    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    $http.post('https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task', dataUp, config)
    .then(
       function (responce) {
         console.log(responce.status);
         console.log(responce.data);
       },
       function (responce) {
        console.log(responce.status);
       }
    );

  };


}
]);
