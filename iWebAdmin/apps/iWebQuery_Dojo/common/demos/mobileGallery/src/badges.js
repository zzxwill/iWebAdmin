/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/dom",
	"dijit/registry",
	"dojox/mobile/parser",
	"dojox/mobile",
	"dojox/mobile/compat",
	"dojox/mobile/IconContainer",
	"dojox/mobile/Badge",
	"dojox/mobile/RoundRect"
], function(dom, registry){


	setBadgeValue = function(i){
		var w = registry.byId("icon" + i);
		var badgeVal = w.get("badge");
		var val = dom.byId("val").value || "0";
		w.set("badge", badgeVal ? null : val);
	}
});
