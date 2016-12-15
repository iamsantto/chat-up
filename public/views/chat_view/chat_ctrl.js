angular.module('KWChat').controller('chatCtrl', function($scope,$rootScope,$stateParams,dbConnect){
  $scope.newMessage = function(username, room, content) {
    this.username = username;
    this.room = room;
    this.content = content;
    this.timestamp = new Date();
}

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
    console.log(data);
    console.log("hi");
    $rootScope.messages.push(data);
    $scope.$apply();
  })

  $scope.sendMessage = function(message){
    var newMsg = new $scope.newMessage($scope.cred.username, $scope.cred.chatRoom, $scope.message);
    $scope.socket.emit('message', newMsg);
    dbConnect.saveMessages(newMsg);
    $scope.message = '';
  }
})
