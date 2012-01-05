// ==UserScript==
// @name           HotUKDeals keyboard nav
// @description    Navigates through HotUKDeals listings and moves pics to left hand side
// @version        0.3
// @author         Chris Poole <chris@hackernet.co.uk>
// @namespace      http://hackernet.co.uk/
// @homepage       http://userscripts.org/scripts/show/12581
// @id             hukdnav@hackernet.co.uk
// @run-at         document-end
// @include        *.hotukdeals.com*
// ==/UserScript==


var next = null;																//Define this with the URL of the next page.
var prev = null;																//Difine this with the URL for the previous page.
var dealid = -1;
var listings = new Array();
var oldbg;

document.addEventListener('keydown', keyListener, false);						//Add a listener for the keyboard

var links = document.getElementsByTagName('a');
for (var i = 0, l = links.length; i < l; i++) {
	if (links[i].innerHTML == "Next") {
		next = links[i].href;
	}
	if (links[i].innerHTML == "Previous") {
		prev = links[i].href;
	}
}

var deals = document.getElementsByTagName("li");
for(var i = 0, l = deals.length; i < l; i++){
	if (deals[i].hasAttribute("class")) {
		if (deals[i].getAttribute("class").indexOf("item-listing") >= 0) {
			listings.push(deals[i].getAttribute("id"));
		}
	}
}

function beforemove() {
	if ((dealid >= 0) && (dealid < listings.length)) {
		document.getElementById(listings[dealid]).style.background = oldbg;
	}
}

function navto(it) {
	var href = window.location.href;
	if (href.indexOf("#") != -1) {
		var index = href.indexOf("#") + 1;
		window.location.href = href.substring(0, index) + it;
	} else {
		window.location.href = href + "#" + it;
	}
} 

function aftermove() {
	if (dealid >= listings.length) {
		// go forward a page
		if (next) {
			window.location.href = next;
		}
	} else if (dealid < 0) {
		// go back a page
		if (prev) {
			window.location.href = prev;
		}
	} else {
		navto(listings[dealid]);
		oldbg = document.getElementById(listings[dealid]).style.background;
		document.getElementById(listings[dealid]).style.background = '#f4f8ff';
	}
}

function keyListener(k) {			
	if (k.keyCode == 74) { // j
		beforemove();
		dealid++;
		aftermove();
	}
	if (k.keyCode == 75) { // k
		beforemove();
		dealid--;
		aftermove();
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.item-listing div.side { float: left; padding: 10px; } .item-listing div.side div { display: none; } .item-listing div.vote { background: inherit; } ');
