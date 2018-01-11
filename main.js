var app = angular.module('mainApp', ["ui.bootstrap"]);

app.controller('mainCtrl', [
  '$scope', '$http', function ($scope, $http) {
  $scope.getApi = function() {

    $scope.data = {};
    $http.get("https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task")
      .then(function(response) {
        $scope.data = response;
      });

  };

}
]);
