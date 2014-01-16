/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dijit/registry",
		"dojox/mobile/parser",
		"dojox/mobile",
		"dojox/mobile/compat",
		"dojox/mobile/FixedSplitter",
		"dojox/mobile/ScrollableView",
		"dojox/mobile/SwapView",
		"dojox/mobile/PageIndicator",
		"dojox/mobile/ScrollablePane"], 
		function(registry){
	return {
		init: function(){
			setTimeout(function(){ registry.byId("scrollablePane").resize(); }, 100);
		}
	};
});
