<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>

var eventposted=0;

$(document).ready(function(){
 $('input.button').click(function() {
   window.setInterval(foo, 100);
 });
});

function foo(){
 if(($(".form-submission-text").is(':visible')) && (eventposted==0)){
   window.location = "<b>http://www.something.com/destinationpage</b>";
   eventposted=1;
 }
}

</script>
<script type="text/javascript">
   var url = "https://google.com";

   // IE8 and lower fix
   if (navigator.userAgent.match(/MSIE\s(?!9.0)/))
   {
       var referLink = document.createElement("a");
       referLink.href = url;
       document.body.appendChild(referLink);
       referLink.click();
   }

   // All other browsers
   else { window.location.assign(url); }
</script>
