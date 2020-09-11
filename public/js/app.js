// ---------------- App Cofig Set Up ---------------- >>
angular.module('ChatUp',['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    // Login Page View Config
    .state('login',{
      url:'',
      templateUrl: '/views/login_view/login_tmpl.html'
    })
    // Chat Page View Config
    .state('chat',{
      templateUrl:'/views/chat_view/chat_tmpl.html',
      params: {
        'chatRoom':'',
        'username':''
      }
    })
})
