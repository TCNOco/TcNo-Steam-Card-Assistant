//CHROME VERSION
/*Other versions:"
	Chrome Web Store: https://chrome.google.com/webstore/detail/steam-card-assistant/peclgodihffdabhnecgclojooijaeeeb
	Firefox Add-ons: https://addons.mozilla.org/en-US/firefox/addon/tcno-steam-card-assistant/
	
Developed by: Wesley Pyburn
Bug reports and business enquiries: TechNobo@tcno.co
Website: https://tcno.co/
View this project on GitHub: https://github.com/TcNobo/TcNo-Steam-Card-Assistant
*/
//Badge list multicraft link creator
function TcNoMulticraft(link) {
	var numberTimes = prompt("Enter how many times you want to craft the badge (Between 1 and 5): ", "");
	if (numberTimes > 5 || numberTimes < 1){
		alert("Please enter a number of times between 1 and 5");
	}else{
		var gameNumber = link.substring(0, link.length-1);
		gameNumber = gameNumber.substring(gameNumber.lastIndexOf("/")+1, gameNumber.length);
		link = link.substring(link.lastIndexOf("/id/")+4, link.lastIndexOf("/gamecards/"));
		var command = "Profile_CraftGameBadge('https://steamcommunity.com/id/" + link +"','" + gameNumber +"','1','0');";
		var outLink = "";
		for (i = 0; i < numberTimes; i++) { 
			outLink += command;
		}
		eval(outLink);
		var refreshNotification = '<div id="SCANotification" style="text-align:left;-webkit-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.75);-moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.75);box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.75);border: 2px solid white;padding:15px 30px 30px 30px;margin:20px;z-index:100;position:fixed;bottom:0px;right:0px;background-color:#1d1e20;height:81px;"> <style>.lds-dual-ring{vertical-align:middle;display: inline-block;width: 64px;height: 64px;}.lds-dual-ring:after{content: " ";display: block;width: 46px;height: 46px;margin: 1px;border-radius: 50%;border: 5px solid #fff;border-color: #fff transparent #fff transparent;animation: lds-dual-ring 1.2s linear infinite;}@keyframes lds-dual-ring{0%{transform: rotate(0deg);}100%{transform: rotate(360deg);}}</style> <div style="width:100%;padding:5px 5px 10px 0px;font-size: 12px;color:white;"><span>TcNo Steam Card Assistant Notification</span></div><div class="lds-dual-ring"></div><span style="padding-left:10px;color:white!important;display: inline-block;vertical-align:middle"><h2>Complete! Refreshing when crafting complete.</h2></span></div>';
		jQuery("#footer").html(jQuery("#footer").html() + refreshNotification)
		setTimeout(function() {
			location.reload(); 
		}, 500);
	}
}
// Craft one of each available
function TcNoMulticraftOneOfEach(){
	var commands = "";
	TcNoMulticraftNumbers.forEach(function(gamenumber) {
		link = window.location.href.substring(window.location.href.lastIndexOf("/id/")+4, window.location.href.lastIndexOf("/badges/"));
		commands += "Profile_CraftGameBadge('https://steamcommunity.com/id/" + link +"','" + gamenumber +"','1','0');";
	});
	eval(commands);
	var refreshNotification = '<div id="SCANotification" style="text-align:left;-webkit-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.75);-moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.75);box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.75);border: 2px solid white;padding:15px 30px 30px 30px;margin:20px;z-index:100;position:fixed;bottom:0px;right:0px;background-color:#1d1e20;height:81px;"> <style>.lds-dual-ring{vertical-align:middle;display: inline-block;width: 64px;height: 64px;}.lds-dual-ring:after{content: " ";display: block;width: 46px;height: 46px;margin: 1px;border-radius: 50%;border: 5px solid #fff;border-color: #fff transparent #fff transparent;animation: lds-dual-ring 1.2s linear infinite;}@keyframes lds-dual-ring{0%{transform: rotate(0deg);}100%{transform: rotate(360deg);}}</style> <div style="width:100%;padding:5px 5px 10px 0px;font-size: 12px;color:white;"><span>TcNo Steam Card Assistant Notification</span></div><div class="lds-dual-ring"></div><span style="padding-left:10px;color:white!important;display: inline-block;vertical-align:middle"><h2>Complete! Refreshing when crafting complete.</h2></span></div>';
	jQuery("#footer").html(jQuery("#footer").html() + refreshNotification)
	setTimeout(function() {
		location.reload(); 
	}, 2000);
}

//Add open all trade button to Steam Badge pages.
function OpenAllMarket() {
	jQuery("a.btn_medium").each(function() {
		if (jQuery(this).attr('href').includes("/market/listings/")){
			var link = jQuery(this).attr('href');
			window.open(link);
		}
	});
}