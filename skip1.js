<script>
function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
    return null;
}
    var skipTime = getURLParameter("skipTime");
    if (skipTime == null) {
        skipTime = 25;
    }
            var send_YT=function(a,b){
          document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"'+a+'","args":['+b+'],"id":1,"channel":"widget"}', "*");
        };
        var start_bg=function(a,b){
//           send_YT("cueVideoById",'"' + getURLParameter("videoId") + '",0,"small"');
//           send_YT("setLoop",'"1"');
          send_YT("addEventListener",'"onError"');
          send_YT("unMute");
          document.getElementById('player').contentWindow.postMessage('{"event":"listening","id":1,"channel":"widget"}','*');
        }   
        
          var done = false; 
          var statusPlay = 2; 
        var EventStateYT=function(a){
          statusPlay=a;
          if (a == 0 && done) {
                clearInterval(cltimer);
                send_YT("mute",1);  
                send_YT("destroy",1);
                window.parent.postMessage('IK_view','*');
          }
          if (a==1 && !done) {
            done=true;
            /*Start view*/
                        clock=skipTime;
                        window.parent.postMessage('IK_impresse','*');
            
            //document.getElementById('okno_a').style.display="block";
            cltimer=setInterval(function(){
              if(statusPlay==1){
                SkipAD_IK.innerHTML=IK_lang.Skip_time+' '+clock+" s.";
                clock=clock-1;
              } else {
                if(statusPlay==0){
                  //send_YT("playVideo",'1');
                }
                if(statusPlay==2){
                  //send_YT("playVideo",'1');
                }
              }
              if(clock<1){
                clearInterval(cltimer);
                SkipAD_IK.innerHTML=IK_lang.Skip_text;
                SkipAD_IK.onclick=function(){
                send_YT("mute",1);  
                send_YT("destroy",1);
                window.parent.postMessage('IK_view','*');
                send_YT("setPlaybackRate",'0.25');
                
                };
              }
            },1000);
            setTimeout(function(){
              if (getURLParameter("source") == 3) {
                  document.getElementById('volume_mute').style="display:block;";
                  document.getElementById('volume_mute').onclick=function(){
                    if(muted == true) {
                      send_YT("unMute",1);              
                      document.getElementById('volume_mute').classList.remove("act"); 
                      muted = false;
                    } else {
                      send_YT("mute",1);              
                      document.getElementById('volume_mute').classList.add("act");
                      muted = true;
                    }
                  }
              }
            },7500);
          }
        }
        var muted='',onReady=0;
        
        function listener(a){
          try{
            date_p=JSON.parse(a.data);
            if(date_p.event=="infoDelivery"){
//               console.log(date_p);
              if(date_p.info['videoData']['video_id'] == getURLParameter("videoId")){
                if(date_p.info['playbackQuality']=="unknown"){
                  //window.location.reload();
                }
              }
              if(date_p.info['muted'] != undefined){
                muted=date_p.info['muted'];
              }
              if(date_p.info['playerState'] != undefined){
                //console.log(date_p.info['playerState']);
                EventStateYT(date_p.info['playerState']);
              }
              try {
                if (date_p.info['duration'] != undefined && date_p.info['duration'] == 0) {
//                      console.log(JSON.stringify(date_p.info));
                }
              } catch (e) {}
            }
            if(date_p.event=="onError"){
              if (date_p.info == 100 || date_p.info == 101 || date_p.info == 150) {
                var append = "deleted";
                if (date_p.info == 101 || date_p.info == 150) {
                    append = "embed";
                }
                send_YT("mute",1);
                send_YT("destroy",1);
                window.parent.postMessage('IK_'+append,'*');

              } else {
                window.location.reload();	
              }
            }
            if(date_p.event=="onReady"){
              onReady=1;
              var imgEg=document.createElement('img');
                imgEg.onload = function(a,b,c) {
                  if ('naturalHeight' in this) {
                    if (this.naturalHeight + this.naturalWidth === 210) {
                      //this.onerror();
                      return;
                    }
                  } else if (this.width + this.height == 210) {
                    //this.onerror();
                    return;
                  }
                };
                imgEg.onerror = function() {window.location.reload();};
                imgEg.src="https://i1.ytimg.com/vi/" + getURLParameter("videoId")  + "/hqdefault.jpg";
                          }
            //console.log(JSON.stringify(date_p));
          }catch(e){};
        }
                </script>