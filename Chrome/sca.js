//CHROME VERSION
/*Other versions:"
	Chrome Web Store: https://chrome.google.com/webstore/detail/steam-card-assistant/peclgodihffdabhnecgclojooijaeeeb
	Firefox Add-ons: https://addons.mozilla.org/en-US/firefox/addon/tcno-steam-card-assistant/
	
Developed by: Wesley Pyburn
Bug reports and business enquiries: TechNobo@tcno.co
Website: https://tcno.co/
View this project on GitHub: https://github.com/TcNobo/TcNo-Steam-Card-Assistant
*/

var console_info = ["%c TcNo Steam Card Assistant %cby TechNobo (Wesley Pyburn) %chttps://tcno.co/ ", 'background: #222; color: white','background: #222; color: #bada55','background: #222; color: lightblue'];
console.log.apply(console, console_info);

if (window.location.href.includes("gamecards")){
	var s = document.createElement('script');
	s.src = chrome.runtime.getURL('TcNoEmbed.js');
	s.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	IndividualPage();
}
if (window.location.href.includes("badges")){
	var s = document.createElement('script');
	s.src = chrome.runtime.getURL('TcNoEmbed.js');
	s.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	BadgeListPage();
}
if (window.location.href.includes("multibuy")){
	var s = document.createElement('script');
	s.src = chrome.runtime.getURL('TcNoEmbed.js');
	s.onload = function() {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	MultiBuyPage();
}

function MultiBuyPage() {
	var tSSA = jQuery('#market_multi_accept_ssa').prop('checked');
	var originalPriceString = jQuery('#market_multibuy_order_total')[0].innerHTML
	// Inaccurate price finder, if one set to 0 or another number. var priceOfOne = Number(originalPriceString .replace(/[^0-9\.]+/g,""))
	var priceAtBottom = parseFloat(Number(originalPriceString .replace(/[^0-9\.]+/g,""))).toFixed(2);
	var priceOfOne = 0;
	jQuery('.market_multi_price').each( function() {
		priceOfOne += Number(jQuery(this).val() .replace(/[^0-9\.]+/g,""));
	});

	var priceOfFive = parseFloat(priceOfOne*5).toFixed(2); //Added to stop the rare really long, unnessecary numbers.
	var afterPrice = originalPriceString.replace(priceAtBottom, priceOfFive)
	console.log('Original price: ' + originalPriceString)
	console.log('Price of FIVE: ' + afterPrice)

	// Add the button
	jQuery('.market_multibuy h2').after('<a id="tcnoBuy5" class="btn_green_white_innerfade btn_medium_wide btn_uppercase market_unstyled_button" style="float: right; text-align: right; display: inline-block;"><span>Buy 5 of each (' + afterPrice + ')</span></a>')
	jQuery('.market_multibuy h2').after('<a id="tcnoRoundUp" class="btn_green_white_innerfade btn_medium_wide btn_uppercase market_unstyled_button" style="float: right; text-align: right; display: inline-block;margin-left:5px;"><span>Round up all</span></a>')
	// Keep the Steam Subscriber Agreement as it was before init. We won't accept it on your behalf, it's your job to do that.
	jQuery('#market_multi_accept_ssa').prop('checked', tSSA)
	// Change all values to 5
	jQuery('#tcnoBuy5').click( function(e) {
		e.preventDefault();
		jQuery.each(
			jQuery("input.market_multi_quantity"), function(){
				jQuery(this).val('5');
			});
		// scroll the agreement and buy button into view
		jQuery('#market_multibuy_purchase')[0]?.scrollIntoView();
	});
	// Round up prices
	jQuery("#tcnoRoundUp").click( function(e){
		e.preventDefault();
		jQuery.each(
			jQuery("input.market_multi_price"), function(){
				var value = 0;
				// does not function properly for a lot of currencies
				jQuery(this).val().split(" ").forEach(function (e){value = (!isNaN(Math.abs(e)) ? e : value)})
				jQuery(this).val(Math.ceil(value));
				jQuery(this).select();
		});
		jQuery("body").select();
	});
}

function IndividualPage() {
	// COMPLETE FOR INDIVIDUAL PAGES
	// Add to steamcommunity.com/id/*xyz*/gamecards/*381140*/
	if (jQuery('div.badge_craft_button').length) {
		// Define outerHTML function
		jQuery.fn.outerHTML = function(){return (!this.length) ? this : (this[0].outerHTML || (function(el){var div = document.createElement('div');div.appendChild(el.cloneNode(true));var contents = div.innerHTML;div = null;return contents;})(this[0]));}
		
		if (jQuery('div.badge_info_description').length) {
			var oldButton = jQuery("div.badge_craft_button").outerHTML();
			jQuery("div.gamecard_badge_craftbtn_ctn").html(jQuery("div.gamecard_badge_craftbtn_ctn").html().replace(oldButton, "<br>" + oldButton));
			jQuery("div.badge_craft_button").css({ "margin-top": "10px"});
			jQuery("div.badge_content").css({ "height": "165px"});
			jQuery("div.badge_info").css({ "min-width": "328px"});
			jQuery("div.badge_current").css({ "margin-top": "41px"});
		}

		var buttonsHTML = jQuery("div.gamecard_badge_craftbtn_ctn").html();
		var craftLink = jQuery("div.badge_craft_button").attr("onclick");
		var craftTimes = jQuery("div.badge_card_set_text_qty").html().substring(1,2);
		jQuery("div.badge_card_set_text_qty").each(function() {
			var tempVal = jQuery(this).html().substring(1,2);
			if (tempVal < craftTimes){
				craftTimes = tempVal;
			}
		});
		
		var newCraftLink = "";

		var execcomm = "javascript:";
		for (i = 0; i < craftTimes; i++) { 
			execcomm += craftLink;
		}
		execcomm += 'setTimeout(function(){location.reload();},2000);';
		execcomm = execcomm.replace(new RegExp('\'', 'g'), '\\\'');
		newCraftLink = 'window.location.href = \''+execcomm+'\'';

		var newButtonHTML = jQuery("div.badge_craft_button").outerHTML().replace(craftLink, newCraftLink).replace(jQuery("div.badge_craft_button").html(), "Craft " + craftTimes + " Badge(s)");
		newButtonHTML = newButtonHTML.replace('<div class="', '<style type="text/css">.TcNoButton {float: left;padding:0px 15px;height: 68px!important;background-color:green;border: 1px solid lightgreen;margin-left:5px;} .TcNoButton:hover {background-color:#00b300;border-color:green;}</style><div id="tcnoBuyButton" class="TcNoButton ');
		var buttonHTMLIncluded = buttonsHTML.replace('<div style="clear: left;"></div>',newButtonHTML + '<div style="clear: left;"></div>');
		jQuery("div.gamecard_badge_craftbtn_ctn").html(buttonHTMLIncluded);

		console.log("Multiple card button added!");
	}else{console.log("Multiple card button NOT added!");}
	
	// Open all cards in new tab button:
	var textLocation = jQuery('div.badge_card_to_collect_header').parent();
	jQuery('div.gamecards_inventorylink').prepend('<a href="javascript:OpenAllMarket()" style="display: inline-block" class="btn_grey_grey btn_medium"><span>Open all market links</span></a>');
	jQuery('div.badge_card_to_collect_header').css({ "display": "inline-block"});
}

// Used on the badge list page
function BadgeListPage() {
	// Cards on the /badges/ page:
	// Remove one of the 5 cards (to make space)
	// OuterHTML ability
	jQuery.fn.outerHTML = function(){return (!this.length) ? this : (this[0].outerHTML || (function(el){var div = document.createElement('div');div.appendChild(el.cloneNode(true));var contents = div.innerHTML;div = null;return contents;})(this[0]));}
	// for each badge_cards, adds another DIV to get rid of the last card
	jQuery("div.badge_cards").each(function() {
		if (jQuery(this).parent().find(".badge_craft_button:last").attr("href")) jQuery(this).html(jQuery(this).outerHTML().replace('<div','<div style="max-width:400px;overflow:hidden;"><div style="min-width:526px;"') + '</div>');
	});
	
	// Add individual buttons
	var TcNoMulticraftNumbers = "";
	var TcNoMulticraftTotal = 0;
	jQuery("div.badge_progress_info").each(function() {
		if (jQuery(this).find(".badge_craft_button:last").attr("href")){
			var cardLink = jQuery(this).find(".badge_craft_button:last").attr("href");
			var gameNumber = cardLink.substring(0, cardLink.length-1);
			if (!gameNumber.includes("?")) gameNumber = gameNumber.substring(gameNumber.lastIndexOf("/")+1, gameNumber.length);
			else{
				var t = gameNumber.split("/");
				gameNumber = t[t.length-2];
				console.log(gameNumber);
			}
			
			TcNoMulticraftNumbers += gameNumber + ',';
			TcNoMulticraftTotal++;
			var oldButton = jQuery(this).html();
			var newButton = oldButton.replace(cardLink,"javascript:TcNoMulticraft('" + cardLink + "')").replace(jQuery(oldButton).html(), "Multiple");
			newButton = newButton.replace('class="badge_craft_button"','')
			newButton = newButton.replace('<a ', '<a class="badge_craft_button TcNoButton" ');
			newButton = newButton.replace('href', 'style="min-width: 92px;display:inline-block;" href');
			oldButton = oldButton.replace('href', 'style="min-width: 92px;max-width: 92px;display:inline-block;" href');
			jQuery(this).html(newButton + oldButton);
			jQuery(this).css({ "min-width": "210px"});
		}
	});

	if (TcNoMulticraftTotal > 0){
		// Add styles to head
		jQuery("head").append('<style type="text/css">.TcNoButton {background-color:green;border: 1px solid lightgreen;margin-left:5px;} .TcNoButton:hover {background-color:#00b300;border-color:green;}</style>');
	
		// Add "Craft 1 of all" buttons after XP bar
		jQuery("div.profile_xp_block").after(
			'<style type="text/css">.craft_all_block{display: flex;position: relative;justify-content: space-between;align-items: center;background-color: hsl(220,4.9%,12%);margin-bottom: 24px;border-radius: 4px;border-width: 1px;border-style: solid;border-image: initial;border-color: hsl(330,4%,9.8%) hsl(240,1.2%,32.2%) hsl(240,1.2%,32.2%) hsl(330,4%,9.8%);padding: 20px;}</style>' + 
			'<div class="craft_all_block"><div style="float: left;color:white;"><span><a href="https://tcno.co/" target="_blank">TcNo Steam Card Assistant</a></span></div><div><span>Will craft: ' + TcNoMulticraftTotal + ' badges</span></div><div style="float:right;"><a class="badge_craft_button TcNoButton" style="padding:0px 10px;display:inline-block;" href="javascript:TcNoMulticraftOneOfEach()">Craft 1 of each</a></div></div>'
		);
		// Add list of all links to the page.
		jQuery("div.profile_xp_block").after('<script>var TcNoMulticraftNumbers = [' + TcNoMulticraftNumbers + ']</script>');
		console_info = ["%c TcNo Steam Card Assistant: %cDisplaying 'craft 1 of all' button that will craft: " + TcNoMulticraftTotal + " badges", 'background: #222; color: white','background: #222; color: #bada55'];
	}else{
		console_info = ["%c TcNo Steam Card Assistant: %cDid not show 'craft 1 of all', as no badges available", 'background: #222; color: white','background: #222; color: #F55'];
	}
	console.log.apply(console, console_info);
}