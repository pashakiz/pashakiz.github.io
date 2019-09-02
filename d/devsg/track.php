<?php
//esto es para el click en ofertas CPA
  $myartlink=$_GET["url"];
$mynextlink="http://ads.cpmforce.com/track22.php?url=".$myartlink;
//echo "$ref:".$_SERVER['HTTP_REFERER']." myart:".$myartlink;
//die();
 if(strpos($_SERVER['HTTP_REFERER'],"cpmforce.com")!==false or $_SERVER['HTTP_REFERER']=="")
 {
 echo "document.write('<meta http-equiv=\"refresh\" content=\"0;url=$myartlink\">');";
//header("Location:".$myartlink);
 }
 else
 {
echo "document.write('<meta http-equiv=\"refresh\" content=\"0;url=$mynextlink\">');";
//header("Location:".$mynextlink);

 }
?>