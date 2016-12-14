angular.module('KWChat').controller('chatCtrl', function($scope,$stateParams){
  var cred = {
    'username' : $stateParams.username,
    'chatRoom' : $stateParams.chatRoom
  }
  console.log(cred);
  console.log("Hello");
})
