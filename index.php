<?php 


if(isset($_GET["type"]))
    {
$apiKey="52a90f09068f49bc9cff552894e77413";
$url="https://congress.api.sunlightfoundation.com/legislators?apikey=".$apiKey."&per_page=all&order=state__asc,last_name__asc";

/*$url="http://104.198.0.197:8080/legislators?per_page=all&order=state__asc,last_name__asc";*/
$json = file_get_contents($url);
$data = json_decode($json,true);
    
if($data === true || $data['count'] != 0)
{
$jsonData=json_encode($data['results']);
    echo $jsonData;
}
    
}

if(isset($_GET["legisSenate"]))
    {
$apiKey="52a90f09068f49bc9cff552894e77413";
$url="https://congress.api.sunlightfoundation.com/legislators?apikey=".$apiKey."&per_page=all&chamber=senate&order=last_name__asc";

/*$url="http://104.198.0.197:8080/legislators?per_page=all&chamber=senate&order=last_name__asc";*/
$json = file_get_contents($url);
$data = json_decode($json,true);
    
if($data === true || $data['count'] != 0)
{
$jsonData=json_encode($data['results']);
    echo $jsonData;
}
    
}

if(isset($_GET["legisHouse"]))
    {
$apiKey="52a90f09068f49bc9cff552894e77413";
$url="https://congress.api.sunlightfoundation.com/legislators?apikey=".$apiKey."&per_page=all&chamber=house&order=last_name__asc";

/*$url="http://104.198.0.197:8080/legislators?per_page=all&chamber=house&order=last_name__asc";*/
$json = file_get_contents($url);
$data = json_decode($json,true);
    
if($data === true || $data['count'] != 0)
{
$jsonData=json_encode($data['results']);
    echo $jsonData;
}
    
}
    
    
if (isset($_GET["activebills"])){
$apiKey="52a90f09068f49bc9cff552894e77413";
$url="https://congress.api.sunlightfoundation.com/bills?apikey=".$apiKey."&history.active=true&order=introduced_on&last_version.urls.pdf__exists=true&per_page=50";
/*$url="http://104.198.0.197:8080/bills?history.active=true&order=introduced_on&last_version.urls.pdf__exists=true&per_page=50"; */  
$json = file_get_contents($url);
$data = json_decode($json,true);
    
if($data === true || $data['count'] != 0){
                          
  $jsonData= json_encode($data['results']);
    echo $jsonData;
                      }
    
}

if (isset($_GET["newbills"])){
$apiKey="52a90f09068f49bc9cff552894e77413";
$url="https://congress.api.sunlightfoundation.com/bills?apikey=".$apiKey."&history.active=false&order=introduced_on&last_version.urls.pdf__exists=true&per_page=50";
/*$url="http://104.198.0.197:8080/bills?history.active=false&order=introduced_on&last_version.urls.pdf__exists=true&per_page=50"; */  
$json = file_get_contents($url);
$data = json_decode($json,true);
    
if($data === true || $data['count'] != 0){
                          
  $jsonData= json_encode($data['results']);
    echo $jsonData;
                      }
    
}
    

if (isset($_GET["comHouse"])){
$apiKey="52a90f09068f49bc9cff552894e77413";
//$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all";
$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all&chamber=house&order=name__asc";
$json = file_get_contents($url);
$data = json_decode($json,true);

if($data === true || $data['count'] != 0){
                          
   $jsonData=json_encode($data['results']);
    echo $jsonData;
                      }
    
}

if (isset($_GET["comSenate"])){
$apiKey="52a90f09068f49bc9cff552894e77413";
//$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all";
$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all&chamber=senate&order=name__asc";
$json = file_get_contents($url);
$data = json_decode($json,true);

if($data === true || $data['count'] != 0){
                          
   $jsonData=json_encode($data['results']);
    echo $jsonData;
                      }
    
}

if (isset($_GET["comJoint"])){
$apiKey="52a90f09068f49bc9cff552894e77413";
//$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all";
$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all&chamber=joint&order=name__asc";
$json = file_get_contents($url);
$data = json_decode($json,true);

if($data === true || $data['count'] != 0){
                          
   $jsonData=json_encode($data['results']);
    echo $jsonData;
                      }
    
}

if (isset($_GET["legisBills"])){
    $bioguideID=$_GET["legisBills"];
$apiKey="52a90f09068f49bc9cff552894e77413";
//$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all";
$url="https://congress.api.sunlightfoundation.com/bills?apikey=".$apiKey."&sponsor_id=".$bioguideID;
$json = file_get_contents($url);
$data = json_decode($json,true);

if($data === true || $data['count'] != 0){
                          
   $jsonData=json_encode($data['results']);
    echo $jsonData;
                      }
    
}

if (isset($_GET["legisCommittee"])){
 $bioguideID=$_GET["legisCommittee"];
$apiKey="52a90f09068f49bc9cff552894e77413";
//$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all";
$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&member_ids=".$bioguideID;
$json = file_get_contents($url);
$data = json_decode($json,true);

if($data === true || $data['count'] != 0){
                          
   $jsonData=json_encode($data['results']);
    echo $jsonData;
                      }
    
}


if (isset($_GET["legis"])){
 $bioguideID=$_GET["legis"];
$apiKey="52a90f09068f49bc9cff552894e77413";
//$url="https://congress.api.sunlightfoundation.com/committees?apikey=".$apiKey."&per_page=all";
$url="https://congress.api.sunlightfoundation.com/legislators?apikey=".$apiKey."&bioguide_id=".$bioguideID."&all_legislators=false";
$json = file_get_contents($url);
$data = json_decode($json,true);

if($data === true || $data['count'] != 0){
                          
   $jsonData=json_encode($data['results']);
    echo $jsonData;
                      }
    
}


?>