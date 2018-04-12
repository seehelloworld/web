  // 为card模块tj依赖项ngResource
  var app=angular.module('Card',['ngResource']);
  // ngResource模块中包含两项内容
  // 1 $resourceProvider，通过他可以配置$resource服务
  // 2 ￥resource，它提供了高级别的请求封装
  // 使用ngresource的好处：不需要多处重复编写$http请求，只需要简单调用即可
//   使用Card发请求（服务）
  app.controller('CardController',function($scope,$http, Card){
    //   $scope.goEdit  = function(){
    //       location.href='edit.html';
    //   };
    //   使用card服务发送get请求
    // 该方法实际是复制对象
    Card.get(function(res){
        console.log(res);
        angular.extend($scope,res);
    })
    //   $http.get('api/card').then(function(res){
    //       console.log(res.data);
    //       // angular中复制对象的方法给$scope赋值；
    //       angular.extend($scope,res.data);
    //   })
  });
//   想app模块添加editcontroller
app.controller('EditCtrl',function($scope,Card,$window){

    Card.get(function(res){
        console.log(res);
       
        $scope.card=res;
    });
    $scope.save = function(){
        // 在这里调用update实际是向服务器发送put请求；
        Card.update($scope.card,function(){
            // 跳转首页
            $window.location.href='/';
        })
    }
});

// 创建服务的两种方式
// 1调用service（）方法创建一个自定义服务
// 它相当于new了一个对象，var s=new myService();
// 这种形式只有把属性和方法添加到this上才可以在controller里调用
// 2使用factory（）创建服务，
// 它的只有是返回一个有属性，有方法的对象，var f= myFactory();
// 由于在模块中添加了依赖项ngresource
// 所以在factory创建服务是可以使用$resource对象
app.factory('Card',function($resource){
    // 使用$resource对象发送请求
    // 实际是对请求的高级封装
    // 封装后可以在别处多次调用
    return $resource(
        // 参数1：路径，必选，参数2：路径参数.可选
        '/api/card/me',
        null,
        // 自定义对象
        {
            update:{method:'POST'}
        }
    )
})


