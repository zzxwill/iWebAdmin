/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/array",
	"dojo/dom", 
	"dijit/registry",
	"dojox/mobile/ProgressIndicator",
	"dojox/mobile/parser", 
	"dojox/mobile",
	"dojox/mobile/compat",
	"dojox/mobile/SimpleDialog",
	"dojox/mobile/TextBox",
	"dojox/mobile/Button",
	"dojox/mobile/Slider"], function(array, dom, registry, ProgressIndicator){
                 
	show = function(dlg){
		registry.byId(dlg).show();
	}

	hide = function(dlg){
		registry.byId(dlg).hide();
	}

	var prog;

	show_progress_indicator = function(dlg, cont){
		show(dlg);
		var container = dom.byId(cont);
		prog = ProgressIndicator.getInstance();
		container.appendChild(prog.domNode);
		prog.start();
		setTimeout(function(){
			hide_progress_indicator(dlg);
		}, 5000);
	}

	hide_progress_indicator = function(dlg){
		prog.stop();
		hide(dlg);
	}

	return {
		init: function(){
			array.forEach(["message", "confirm", "login", "progress", "volume", "select"],
				function(id){
					var node = registry.byId("dlg_"+id).domNode;
					node.parentNode.removeChild(node);
					document.body.appendChild(node);
				});
		}
	};
});
