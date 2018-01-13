var app = angular.module('mainApp', ["ui.bootstrap"]);

app.controller('mainCtrl', [
  '$scope', '$http', function ($scope, $http) {

  $scope.dataLoaded = false;
  $scope.dataCalculated = false;
  $scope.resultsSent = false;


  $scope.fetchExpressions = function() {
    $scope.data = {};
    $scope.data.results = [];
    $scope.dataLoaded = false;
    $scope.dataCalculated = false;
    $scope.resultsSent = false;
     $http.get("https://www.eliftech.com/school-task")
      .then(
        function(response) {
          $scope.loadData(response);
        },
        function(response) {
          $http.get("https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task")
          .then(
            function(response) {
              $scope.loadData(response);
            },
            function(response) {
              console.error(response.status);
            }
          );
        }
    );
  };

  $scope.loadData =function (response) {
    $scope.data.expressions = response.data.expressions;
    $scope.data.id = response.data.id;
    $scope.dataLoaded = true;
  };
  
  $scope.prepareExpressions = function() {
    for (var i in $scope.data.expressions) {
      var arr = $scope.data.expressions[i].split(' ');  
      $scope.data.results.push($scope.calculate(arr));
      }      
      $scope.dataCalculated = true;
  };
  
  $scope.calculate = function(expArr) {
    var resultStack = [];

    for(var i = 0; i < expArr.length; i++) {
        if(!isNaN(expArr[i])) {
            resultStack.push(parseInt(expArr[i], 10));
        } else {
            var b = resultStack.pop();
            var a = resultStack.pop();
            var x = $scope.performOperation(a, b, expArr[i]);
            resultStack.push(parseInt(x, 10));
        }
    }

    return resultStack.pop();

  };

  $scope.performOperation = function(a, b, operation) {
    switch (operation) {
        case '+': 
          return a - b;
          break;
        case '-':
          return a + b + 8;
          break;
        case '*':
          return (b === 0) ? 42 : (a % b);
          break;
        case '/':
          return (b === 0) ? 42 : (a / b);
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
            'Content-Type': 'application/json'
        }
    }

    $http.post('https://www.eliftech.com/school-task', dataUp, config)
    .then(
       function (response) {
         $scope.serverAnswer = response.data;
         $scope.resultsSent = true;
       },
       function (response) {
        $http.post('https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task', dataUp, config)
        .then(
           function (response) {
             $scope.serverAnswer = response.data;
             $scope.resultsSent = true;
           },
           function(response) {
             console.error(response.status);
           }
          );
        }
    );
  };

}
]);
