angular.module('KWChat').controller('chatCtrl', function($scope,$stateParams,dbConnect){
  $scope.cred = {
    'username' : $stateParams.username,
    'chatRoom' : $stateParams.chatRoom
  }

  dbConnect.restoreMessages('Fenny');

  $scope.socket = io.connect();
  $scope.messages = [];
  $scope.socket.on('connect', function(){
    $scope.socket.emit('room', $scope.cred.chatRoom);
  })

  $scope.socket.on('newMessage', function(data){
    $scope.messages.push(data.message);
    $scope.$apply();
  })

  $scope.sendMessage = function(message){
    $scope.socket.emit('message', {'message':message,'chatRoom':$scope.cred.chatRoom});
    $scope.message = '';

  }
})
