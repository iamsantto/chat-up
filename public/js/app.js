angular.module('KWChat',['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('login',{
      url:'',
      templateUrl: '/views/login.html'
    })
    .state('chat',{
      url:'/chat',
      templateUrl:'/views/chat.html'
    })
})
