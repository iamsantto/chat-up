angular.module('KWChat').factory('dbConnect', function($http){
  return {
    saveMessages : function(messageDetails){
      var res = $http.post('api/messages',messageDetails);
      res.error(function(data){
        console.log("Save Failed: " + JSON.stringify({data: data}));
      })
    },
    restoreMessages : function(chatRoom){
      var res = $http.get('api/messages',{params:{'room':chatRoom}});
      res.then(function(response){
        // return response.data;
        console.log(response);
      })
    }
  }
})
