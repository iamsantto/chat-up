angular.module('KWChat',['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('login',{
      url:'',
      templateUrl: '/views/login_view/login_tmpl.html'
    })
    .state('chat',{
      url:'/chat',
      templateUrl:'/views/chat_view/chat_tmpl.html',
      params: {
        'chatRoom':'',
        'username':''
      }
    })
})
