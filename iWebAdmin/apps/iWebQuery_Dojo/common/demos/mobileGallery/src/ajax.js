/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/dom", "dojo/on", "dojo/_base/xhr", 
		"dijit/registry", "dojox/mobile/ProgressIndicator"],
  function(dom, on, xhr, registry, ProgressIndicator) {
	function refreshData() {
		var pane = dom.byId('ajaxPane');
		var prog = ProgressIndicator.getInstance();
		prog.stop(); // prevent duplicated progress indicators
		dom.byId("rightPane").appendChild(prog.domNode);
		prog.start();
		xhr.get({
			url : 'views/ajaxLoad.html',
			handleAs : 'text',
			timeout: 30000,
			load : function(data) {
				pane.innerHTML = data;
				registry.byId("ajaxContainer").resize();
				prog.stop();
				},
			error: function(err) {
				pane.innerHTML = err;
				prog.stop();
			}
		});
	};	
	return {
		init: function() {
			on(dom.byId("ajaxBtn"), "click", refreshData);
		}
	};
});
