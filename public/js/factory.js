// ---------------- Factory Functions ---------------- >>
angular.module('KWChat').factory('dbConnect', function($http,$rootScope){
  return {
    //save message API call
    saveMessages : function(messageDetails){
      $http.post('api/messages',messageDetails);
    },
    //restore messages API call
    restoreMessages : function(chatRoom){
      var res = $http.get('api/messages',{params:{'room':chatRoom}});
      res.then(function(response){
        $rootScope.messages = response.data;
      })
    }
  }
})
