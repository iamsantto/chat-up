angular.module('KWChat').controller('chatCtrl', function($scope,$rootScope,$stateParams,dbConnect){
  $scope.cred = {
    'username' : $stateParams.username,
    'chatRoom' : $stateParams.chatRoom
  }

  $rootScope.messages = [];
  dbConnect.restoreMessages($scope.cred.chatRoom);

  $scope.socket = io.connect();
  $scope.socket.on('connect', function(){
    $scope.socket.emit('room', $scope.cred.chatRoom);
  })

  $scope.socket.on('newMessage', function(data){
    $rootScope.messages.push(data.message);
    $scope.$apply();
  })

  $scope.sendMessage = function(message){
    $scope.socket.emit('message', {'message':message,'chatRoom':$scope.cred.chatRoom});
    $scope.message = '';
  }
})
