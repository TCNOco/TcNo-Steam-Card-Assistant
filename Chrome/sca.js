//CHROME VERSION
/*Other versions:"
	Chrome Web Store: https://chrome.google.com/webstore/detail/steam-card-assistant/peclgodihffdabhnecgclojooijaeeeb
	Firefox Add-ons: https://addons.mozilla.org/en-US/firefox/addon/tcno-steam-card-assistant/
	
Developed by: Wesley Pyburn
Bug reports and business enquiries: TechNobo@tcno.co
Website: https://tcno.co/
View this project on GitHub: https://github.com/TcNobo/TcNo-Steam-Card-Assistant
*/

//Displays developer information in console :)
var console_info = [" %cTcNo SteamCardAssistant %cby TechNobo (Wesley Pyburn) %chttps://tcno.co/ ", 'background: #222; color: white','background: #222; color: #bada55','background: #222; color: lightblue'];
console.log.apply(console, console_info);

//Verifies that the website is HTTPS
CheckIfHTTPS();
//Checks to see if is a "gamecards" page or a "badges" page, and acts accordingly.
if (window.location.href.includes( "gamecards" )) {
	var s = document.createElement( 'script' );
	s.src = chrome.extension.getURL( 'TcNoEmbed.js' );
	s.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	IndividualPage();
}
if (window.location.href.includes( "badges" )) {
	var s = document.createElement( 'script' );
	s.src = chrome.extension.getURL( 'TcNoEmbed.js' );
	s.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	BadgeListPage();
}

function CheckIfHTTPS() {
	//Required for AJAX crafting within steamcommunity.com. One can not be HTTP and the other HTTPS.
	if(window.location.href.startsWith( "http://" )) {
		console.log( "The website is currently in http://. It is A. Insecure and B. Incompatible with TcNo Steam Card Assistant." );
		var httpsLink = window.location.href.replace( "http://", "https://" );
		window.location.href = httpsLink;
	}
	if(window.location.href.startsWith( "steamcommunity.com" )) {
		console.log( "The website is currently in http://. It is A. Insecure and B. Incompatible with TcNo Steam Card Assistant." );
		var httpsLink = window.location.href.replace( "steamcommunity.com", "https://steamcommunity.com" );
		window.location.href = httpsLink;
	}
}

function IndividualPage() {
	//COMPLETE FOR INDIVIDUAL PAGES
	//add to steamcommunity.com/id/*xyz*/gamecards/*381140*/
	if (jQuery( 'div.badge_craft_button' ).length) {
		//define outerHTML function
		jQuery.fn.outerHTML = function() {return (!this.length) ? this : (this[0].outerHTML || (function(el) {var div = document.createElement( 'div' );div.appendChild(el.cloneNode(true));var contents = div.innerHTML;div = null;return contents;} )(this[0]));}
		
		if (jQuery( 'div.badge_info_description' ).length) {
		var oldButton = jQuery( "div.badge_craft_button" ).outerHTML();
		jQuery( "div.gamecard_badge_craftbtn_ctn" ).html(jQuery( "div.gamecard_badge_craftbtn_ctn" ).html().replace(oldButton, "<br>" + oldButton));
		jQuery( "div.badge_craft_button" ).css({ "margin-top": "10px" } );
		jQuery( "div.badge_content" ).css({ "height": "165px" } );
		jQuery( "div.badge_info" ).css({ "min-width": "328px" } );
		jQuery( "div.badge_current" ).css({ "margin-top": "41px" } );
		}
		
		var buttonsHTML = jQuery( "div.gamecard_badge_craftbtn_ctn" ).html();
		var craftLink = jQuery( "div.badge_craft_button" ).attr( "onclick" );
		var craftTimes = jQuery( "div.badge_card_set_text_qty" ).html().substring(1,2);
		jQuery( "div.badge_card_set_text_qty" ).each(function() {
			var tempVal = jQuery(this).html().substring(1,2);
			if (tempVal < craftTimes) {
				craftTimes = tempVal;
			}
		} );
		
		var newCraftLink = "";
		for (i = 0; i < craftTimes; i++) { 
			newCraftLink += craftLink;
		}
		var newButtonHTML = jQuery( "div.badge_craft_button" ).outerHTML().replace(craftLink, newCraftLink).replace(jQuery( "div.badge_craft_button" ).html(), "Craft " + craftTimes + " Badge(s)" );
		newButtonHTML = newButtonHTML.replace( '<div class="', '<style type="text/css">.TcNoButton {background-color:green;border: 1px solid lightgreen;margin-left:5px;} .TcNoButton:hover {background-color:#00b300;border-color:green;}</style><div class="TcNoButton ' );
		var buttonHTMLIncluded = buttonsHTML.replace( '<div style="clear: left;"></div>',newButtonHTML + '<div style="clear: left;"></div>' );
		jQuery( "div.gamecard_badge_craftbtn_ctn" ).html(buttonHTMLIncluded);
		console.log( "Multiple card button added!" );
	}else{console.log( "Multiple card button NOT added!" );}
	
	//Open all cards in new tab button:
	var textLocation = jQuery( 'div.badge_card_to_collect_header' ).parent();
	jQuery( 'div.badge_card_to_collect_header' ).parent().html( '<a href="javascript:OpenAllMarket()" style="display: inline-block;margin-left:10px" class="btn_grey_grey btn_medium"><span>Open all market links</span></a>' + jQuery( 'div.badge_card_to_collect_header' ).parent().html());
	jQuery( 'div.badge_card_to_collect_header' ).css({ "display": "inline-block" } );
}

//used on the badge list page
function BadgeListPage() {
	//Cards on the /badges/ page:
	//Remove one of the 5 cards (to make space)
	//OuterHTML ability
	jQuery.fn.outerHTML = function() {return (!this.length) ? this : (this[0].outerHTML || (function(el) {var div = document.createElement( 'div' );div.appendChild(el.cloneNode(true));var contents = div.innerHTML;div = null;return contents;} )(this[0]));}
	//for each badge_cards, adds another DIV to get rid of the last card
	jQuery( "div.badge_content" ).each(function() {
		if (jQuery( this ).children( 'div.badge_progress_info' ).find( "a[href]" ).length){
			jQuery( this ).children( 'div.badge_cards' ).html(jQuery(this).children( 'div.badge_cards' ).outerHTML().replace( '<div','<div style="max-width:400px;overflow:hidden;"><div style="min-width:526px;"' ) + '</div>' );
		}
	} );
	
	jQuery( "div.badge_progress_info" ).each(function() {
		if (jQuery(this).find( "a[href]" ).attr( 'href' )) {
			var cardLink = jQuery(this).find( "a[href]" ).attr( 'href' );
			var oldButton = jQuery(this).html();
			var newButton = oldButton.replace(cardLink,"javascript:TcNoMulticraft( '" + cardLink + "' )" ).replace(jQuery(oldButton).html(), "Multiple" );
			newButton = newButton.replace( 'class="badge_craft_button"','' )
			newButton = newButton.replace( '<a ', '<a class="badge_craft_button TcNoButton" ' );
			newButton = '<style type="text/css">.TcNoButton {background-color:green;border: 1px solid lightgreen;margin-left:5px;} .TcNoButton:hover {background-color:#00b300;border-color:green;}</style>' + newButton;
			newButton = newButton.replace( 'href', 'style="min-width: 92px;display:inline-block;" href' );
			oldButton = oldButton.replace( 'href', 'style="min-width: 92px;max-width: 92px;display:inline-block;" href' );
			jQuery(this).html(newButton + oldButton);
		jQuery(this).css({ "min-width": "210px" } );
		}
	} );
}

//outerHTML function adapted from https://gist.github.com/davemo/915570/0c848ef50e7d4aafb9bece3e8a90d50fd59716b3 (By: jboesch)