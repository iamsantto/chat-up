angular.module('KWChat').factory('dbConnect', function($http,$rootScope){
  return {
    saveMessages : function(messageDetails){
      $http.post('api/messages',messageDetails);
    },
    restoreMessages : function(chatRoom){
      var res = $http.get('api/messages',{params:{'room':chatRoom}});
      res.then(function(response){
        $rootScope.messages = response.data;
      })
    }
  }
})
