angular.module('KWChat').controller('loginCtrl', function($scope,$state){
  $scope.signIn = function(cred){
    $state.go('chat',{chatRoom : cred.chatRoom, username: cred.username})
  }
})
