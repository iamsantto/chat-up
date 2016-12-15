angular.module('KWChat').controller('chatCtrl', function($scope,$rootScope,$stateParams,$state,dbConnect){
  // ---------------- New Message Object Prototype ---------------- >>
  $scope.newMessage = function(username, room, content) {
    this.username = username;
    this.room = room;
    this.content = content;
    this.timestamp = new Date();
}

  // ---------------- Current User Credentials ---------------- >>
  $scope.cred = {
    'username' : $stateParams.username,
    'chatRoom' : $stateParams.chatRoom
  }

  // ---------------- Array to Store All Messages in Current Room ---------------- >>
  $rootScope.messages = [];

  // ---------------- Restore Previous Messages Request ---------------- >>
  dbConnect.restoreMessages($scope.cred.chatRoom);

  // ---------------- Establishing Socket Connection ---------------- >>
  $scope.socket = io.connect();

  // ---------------- Send Chat Room Details to Server ---------------- >>
  $scope.socket.on('connect', function(){
    $scope.socket.emit('room', $scope.cred.chatRoom);
  })

  // ---------------- Handle New Message Event ---------------- >>
  $scope.socket.on('newMessage', function(data){
    $rootScope.messages.push(data);
    $scope.$apply();
  })

  // ---------------- Send Button Function ---------------- >>
  $scope.sendMessage = function(message){
    var newMsg = new $scope.newMessage($scope.cred.username, $scope.cred.chatRoom, $scope.message);
    $scope.socket.emit('message', newMsg);
    dbConnect.saveMessages(newMsg);
    $scope.message = '';
  }

  // ---------------- Logout Button Function ---------------- >>
  $scope.logout = function(){
    $scope.socket.disconnect();
    $state.go('login');
  }
})
