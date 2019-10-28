<script>
	if (window.addEventListener) {
          window.addEventListener("message", listener);
        } else {
          window.attachEvent("onmessage", listener);
        }       
	document.getElementById("player").src = "https://www.youtube.com/embed/" + getURLParameter("videoId") + "?controls=0&mute=false&tiny=small&playsinline=1&override_hl=1&enablejsapi=1&widgetid=1";
	document.getElementById("player").onload = setTimeout(start_bg,500);
        if (getURLParameter("showButton") && getURLParameter("showButton") == "true") {
            document.getElementById('LINK_IK').href=decodeURIComponent(getURLParameter("buttonLink"));
            document.getElementById('LINK_IK').innerHTML=decodeURIComponent(getURLParameter("buttonTitle"));
        } else {
            document.getElementById('LINK_IK').href="http://youtube.com/";
            document.getElementById('LINK_IK').style = "display:none";
        }
        document.getElementById("SkipAD_IK").innerHTML = "Skip this in "+skipTime+" s.";
    </script>