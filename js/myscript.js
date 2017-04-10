/*Menu-toggle*/
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });


var app = angular.module('myapp', ['angularUtils.directives.dirPagination']);

app.controller('pageCtrl', function($scope,$filter,$rootScope) {
   
    $scope.sidebarMenu="legislators";
    
    $scope.sideBar=function(input){
        $scope.sidebarMenu=input;
    }
    
     $scope.markCommittee = function(committeeData,$event) {
         var localData = localStorage.getItem("committee"),
      index = -1;
         

  committeeArray = localData ? JSON.parse( localData ) : [];

  committeeArray.map(function(ele, pos){
    if( angular.equals(ele, committeeData )){
      index = pos;

    }
  
  });
  if( index > -1 ) {
    committeeArray.splice(index,1);
  } else{
    committeeArray.push( committeeData );
    localStorage.setItem("committee",angular.toJson(committeeArray));
    
    angular.element($event.target).removeClass("fa fa-star-o").addClass("fa fa-star").css("color", "yellow");

  }
   
     
     };

      $scope.markBill = function(billData,$event) {
         var localData = localStorage.getItem("bill"),
      index = -1;
         

  billArray = localData ? JSON.parse( localData ) : [];

  billArray.map(function(ele, pos){
    if( angular.equals(ele, billData )){
      index = pos;

    }
  
  });
  if( index > -1 ) {
    billArray.splice(index,1);
  } else{
    billArray.push( billData );
    localStorage.setItem("bill",angular.toJson(billArray));
    angular.element($event.target).removeClass("fa fa-star-o").addClass("fa fa-star").css("color", "yellow");
  }
   
     
     };
    
      $scope.markLegis = function(legislatorData) {
         var localData = localStorage.getItem("legislator"),
      index = -1;
         

  legislatorArray = localData ? JSON.parse( localData ) : [];

  legislatorArray.map(function(ele, pos){
    if( angular.equals(ele, legislatorData )){
      index = pos;

    }
  
  });
  if( index > -1 ) {
    legislatorArray.splice(index,1);
  } else{
    legislatorArray.push( legislatorData );
    var legisid=  legislatorData['bioguide_id']+"_1";
    localStorage.setItem("legislator",angular.toJson(legislatorArray));
      changeIcon(legisid);
  }
 
       
     
     };
    
    //removal of favorites
        
        $scope.deleteComm = function(comFavData,$event) {
    var rowindex = $(this).closest('tr').index();
    var sym = $(this).closest("tr").find('td:eq(0)').text().trim();
    $("#committeesFav tr:eq(" + rowindex + ")").remove(); 
         var localData = localStorage.getItem("committee"),
      index = -1;
         

   favCommArray = JSON.parse( localData );

  favCommArray.map(function(ele, pos){
    if( angular.equals(ele, comFavData )){
      index = pos;

    }
  
  });
  if( index > -1 ) {
    
    favCommArray.splice(index,1);
    localStorage.setItem("committee",angular.toJson(favCommArray));
  } 
            
    };
    
    //delete legis
    $scope.deletelegis = function(favLegData,$event) {
    var rowindex = $(this).closest('tr').index();
    var sym = $(this).closest("tr").find('td:eq(0)').text().trim();
    $("#legislatorsFav tr:eq(" + rowindex + ")").remove(); 
         var localData = localStorage.getItem("legislator"),
      index = -1;
         

   favLegisArray = JSON.parse( localData );

  favLegisArray.map(function(ele, pos){
    if( angular.equals(ele, favLegData )){
      index = pos;

    }
  
  });
  if( index > -1 ) {
    
    favLegisArray.splice(index,1);
    localStorage.setItem("legislator",angular.toJson(favLegisArray));
  } 
            
    };
    
    // delete bill
        
    $scope.deleteBill = function(billFavData,$event) {
    var rowindex = $(this).closest('tr').index();
    var sym = $(this).closest("tr").find('td:eq(0)').text().trim();
    $("#billsFav tr:eq(" + rowindex + ")").remove(); 
         var localData = localStorage.getItem("bill"),
      index = -1;
         

  favBillArray = JSON.parse( localData );

  favBillArray.map(function(ele, pos){
    if( angular.equals(ele, billFavData )){
      index = pos;

    }
  
  });
  if( index > -1 ) {
    
    favBillArray.splice(index,1);
    localStorage.setItem("bill",angular.toJson(favBillArray));
  } 
            
    };
    
});


app.controller('legislatorCtrl', function($scope, $http,$filter) {
    
    $http({
        method : "GET",
        url : "/index.php",
        params: {type: "legislator"}
    }).then(function legislatorFunc(response) {
        $scope.legislators = response.data;
      
          $scope.legisDetails = function(legisDetail,bioguideID){
        
                $scope.legis=(legisDetail);
                
              var legisJSON = $.parseJSON(localStorage.getItem("legislator"));
              var found=0;
                $.each(legisJSON,
            function (idx, obj) {
                var res = obj;
            if(legisDetail.bioguide_id==res.bioguide_id)
               {
                   console.log("exists");
                   found=1; 
                   changeStarImage();
               }
            });
              if(found==0){
                  unChangeStarImage();
              }
            
    $http({
        method : "GET",
        url : "/index.php",
        params: {legisBills: bioguideID}
    }).then(function legisBillsFunc(response) {
        $scope.legisBills = response.data;
        
    }, function myError(response) {
        $scope.legisBills = response.statusText;
    });
          
        $http({
        method : "GET",
        url : "/index.php",
        params: {legisCommittee: bioguideID}
    }).then(function legisCommitteeFunc(response) {
        $scope.legisCommittee = response.data;
        
    }, function myError(response) {
        $scope.legisCommittee = response.statusText;
 
    });
           
    
              
       }
     
    }, function myError(response) {
        $scope.legislators = response.statusText;
    });
    
    
    
});


app.controller('billCtrl', function($scope, $http,$filter) {
   
     $http({
        method : "GET",
        url : "/index.php",
        params: {newbills: "newbills"}
    }).then(function billsFunc(response) {
        $scope.newbills = response.data;
        
    }, function myError(response) {
        $scope.newbills = response.statusText;

    });
     $http({
        method : "GET",
        url : "/index.php",
        params: {activebills: "activebills"}
    }).then(function activebillsFunc(response) {
        $scope.activebills = response.data;
       
    }, function myError(response) {
        $scope.activebills = response.statusText;

    });
    
     $scope.billsDetails = function(input){
                $scope.billData=(input);
         
             
              var billJSON = $.parseJSON(localStorage.getItem("bill"));
              var found=0;
                $.each(billJSON,
            function (idx, obj) {
                var res = obj;
            if(input.bill_id==res.bill_id)
               {
                   found=1; 
                   changeStarImage();
               }
            });
              if(found==0){
                  unChangeStarImage();
              }
        }
    
});

app.controller('committeesCtrl', function($scope, $http,$filter) {
    $http({
        method : "GET",
        url : "/index.php",
        params: {committees: "committees"}
    }).then(function committeeFunc(response) {
        $scope.committees = response.data;
      
    }, function myError(response) {
        $scope.committees = response.statusText;
    });
    
      
});

app.controller('favoritesCtrl', function($scope,$timeout,$http) {
    
    $scope.billsDetails = function(input){
                $scope.billData=(input);
        }
    
    $scope.legisDetails = function(legisDetail,bioguideID){
                $scope.legis=(legisDetail);
 
    $http({
        method : "GET",
        url : "/index.php",
        params: {legisBills: bioguideID}
    }).then(function legisBillsFunc(response) {
        $scope.legisBills = response.data;
        
    }, function myError(response) {
        $scope.legisBills = response.statusText;
    });
          
        $http({
        method : "GET",
        url : "/index.php",
        params: {legisCommittee: bioguideID}
    }).then(function legisCommitteeFunc(response) {
        $scope.legisCommittee = response.data;
        
    }, function myError(response) {
        $scope.legisCommittee = response.statusText;
    });
           
       }

    $timeout(function(){
     $scope.$apply();
        $scope.favCom=JSON.parse(localStorage.getItem("committee"));
    $scope.favBill=JSON.parse(localStorage.getItem("bill"));
    $scope.favLegislator=JSON.parse(localStorage.getItem("legislator"));
});
   
    
    
});


$(function(){
  var statesname=["Alabama","Alaska","Arizona","Washington","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota", "Arkansas","California","Colorado","Connecticut","Delaware","District Of Columbia", "Florida","Ohio","Georgia","Oklahoma","Hawaii","Oregon","Idaho","Pennsylvania","Illinois","Rhode Island","Indiana","South Carolina","Iowa","South Dakota","Kansas","Tennessee","Kentucky", "Texas","Louisiana","Utah","Maine","Vermont","Maryland", "Virginia","Massachusetts","Michigan","West Virginia", "Minnesota","Wisconsin","Mississippi","Wyoming","Missouri"];

for(var i=0; i< statesname.length;i++)
{
//creates option tag
    var state=statesname[i].replace(/\s+/g, "&nbsp;");;
    $("#dropdown").append('<option value="'+statesname[i]+'">'+statesname[i]+'</option>');
  
}

  
  });

app.filter('capitalize', function() {
    return function(input) {
      return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase()+ input.substr(1).toLowerCase() : input;
    }
});

app.filter('displayNA',function(){
    
    return function(input){
        
        return((angular.isString(input) && input.length > 0) ? input: "N.A");
    }
});

app.filter('districtfunc',function(){
    
    return function(input){
        return((angular.isNumber(input) && input!=null) ? "District "+input: "N.A");
    }
});

app.filter('partyName',function(){
    
    return function(input){
        if(angular.isString(input) && input!=null)
        {
            if(input=="R") return" Republic";
            if(input=="D") return " Democrat"
            else return " Independent";
        }
    }
});

app.filter('status',function(){
    
    return function(input){
        if(input!=null)
        {
            if(input==true) return "Active";
            
            else return "New";
        }
    }
});

function changeStarImage() {
    $('.starIcon a span').removeClass("fa fa-star-o");
    $('.starIcon a span').addClass("fa fa-star").css("color","yellow");

}
function unChangeStarImage() {
    $('.starIcon a span').removeClass("fa fa-star");
    $('.starIcon a span').addClass("fa fa-star-o").css("color","");
}

app.filter('progressBar',function(){
    
    return function(startDate,endDate){
        var start = new Date(startDate), // Jan 1, 2015
        end = new Date(endDate), // June 24, 2015
        today = new Date(), // April 23, 2015
        percent = Math.round(((today - start) / (end - start)) * 100) + '%';
        return percent;
    }
});

function changeIcon(id){
   $("#"+id).removeClass("fa fa-star-o");
    
    $("#"+id).addClass("fa fa-star").css("color", "yellow");
       
    }