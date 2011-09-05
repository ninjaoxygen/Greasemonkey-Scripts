// ==UserScript==
// @name           eBay total price includes shipping
// @description    Replace price column with a total when looking at price + shipping listings, £ and $
// @version        0.1
// @author         Chris Poole <chris@hackernet.co.uk>
// @namespace      http://www.hackernet.co.uk/
// @include        http://*ebay.co.uk/*
// @include        http://*ebay.com/*
// @id             greasemonkey@hackernet.co.uk
// @run-at         document-end
// ==/UserScript==

var allDivs, thisDiv, priceDiv, priceitem, priceship;
allDivs = document.evaluate(
	"//td",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	var tmp = thisDiv.innerHTML.replace(/(<([^>]+)>)/ig,""); // strip tags
	if ((tmp.substr(0,1) == "£") || (thisDiv.innerHTML.substr(0,1) == "$")) {
		priceitem = tmp;
		priceDiv = thisDiv;
	} else if ((tmp.substr(0,2) == "+£") || (tmp.substr(0,2) == "+$")) {
		priceship = tmp;
		
		if (priceitem) {
			thisDiv.innerHTML = "(" + priceitem + priceship + ")";
			priceDiv.innerHTML = priceitem.substr(0,1) + ( parseFloat(priceitem.substr(1)) + parseFloat(priceship.substr(2))).toFixed(2) + " total";
		}
	} else {
		priceitem = null;
	}
}
