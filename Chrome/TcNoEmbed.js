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
	if (numberTimes > 5 || numberTimes < 1){alert("Please enter a number of times between 1 and 5");}
	var gameNumber = link.substring(0, link.length-1);
	gameNumber = gameNumber.substring(gameNumber.lastIndexOf("/")+1, gameNumber.length);
	link = link.substring(link.lastIndexOf("/id/")+4, link.lastIndexOf("/gamecards/"));
	var command = "Profile_CraftGameBadge('https://steamcommunity.com/id/" + link +"','" + gameNumber +"','1','0');";
	var outLink = "";
	for (i = 0; i < numberTimes; i++) { 
		outLink += command;
	}
	eval(outLink);
	setTimeout(function() {
		location.reload(); 
	}, 500);
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