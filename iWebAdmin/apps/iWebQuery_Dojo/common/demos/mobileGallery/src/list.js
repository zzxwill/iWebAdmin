/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/query",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/on",
	"dojo/_base/connect",
	"dijit/registry",
	"./structure"], function(query, dom, style, on, connect, registry, structure){
	function createListSwitchHandler(hideEdge, root) {
		return function(node) {
			query(".roundRect", root).forEach(function(node) {
				node.style.display = (hideEdge ? "block" : "none");
			});
			query(".edgeToEdge", root).forEach(function(node) {
				node.style.display = (hideEdge ? "none" : "block");
			});
		};
	};

	var internalNavRecords = [];
	return {
		init: function() {
			on(registry.byId("filmListRndTab"), "click", createListSwitchHandler(true, "filmListView"));
			on(registry.byId("filmListEdgeTab"), "click", createListSwitchHandler(false, "filmListView"));
			on(registry.byId("musicListRndTab"), "click", createListSwitchHandler(true, "musicListView"));
			on(registry.byId("musicListEdgeTab"), "click", createListSwitchHandler(false, "musicListView"));
			var topViews = [{id:"filmListView",label:"Film Genres"}, {id:"musicListView", label:"Music"}];
			var filmViews = [{id:"actionFilmView", label: "Action"}, {id:"comedyFilmView", label:"Comedy"},
				{id:"scienceFilmView", label:"Science"}];
			var musicViews = [{id:"baroqueMusicView", label:"Baroque"}, {id:"romanticMusicView", label:"Romantic"},
				{id:"modernMusicView", label:"Modern"}, {id:"alternativeMusicView",label:"Alternative"},
				{id:"metalMusicView", label:"Metal"}, {id:"progressiveMusicView",label:"Progressive"},
			       	{id:"rbMusicView", label:"R&B"}];
			function addTransitionInHandler(views, backCfg) {
				for (var i = 0; i < views.length; ++i) {
					var view = views[i];
					on(registry.byId(view.id), "afterTransitionIn", (function(view) {
						return function() {
							inTransitionOrLoading = false;
							dom.byId("headerLabel").innerHTML = view.label;
							var navRecords = structure.navRecords;
							navRecords.push({
								from: backCfg.id,
								fromTitle: backCfg.title,
								to: view.id,
								toTitle: view.label,
								navTitle: backCfg.title
							});
						};
					})(view));
				}
			}
			addTransitionInHandler(topViews, {id:"mainListView", title: "Lists"});
			addTransitionInHandler(filmViews, {id:"mainFilmListView", title: "Films"});
			addTransitionInHandler(musicViews, {id:"mainMusicListView", title: "Music"});

			connect.subscribe("onAfterDemoViewTransitionIn", function(id) {
				if (id == "list") {
					var navRecords = structure.navRecords;
					for (var i = 0; i < internalNavRecords.length ; ++i) {
						navRecords.push(internalNavRecords[i]);
					}
					// need to restore the title of previous view in internal navigation history
					if (navRecords.length > 0) {
						dom.byId("headerLabel").innerHTML = navRecords[navRecords.length -1].toTitle;
					}
				}
			});
			on(registry.byId("list"), "beforeTransitionOut", function() {
				var navRecords = structure.navRecords;
				internalNavRecords = [];
				for (var i = 0; i < navRecords.length ; ++ i) {
					var navRecord = navRecords[i];
					if (navRecord.from == "navigation" ||
						navRecord.to == "source")
						continue;
					internalNavRecords.push(navRecord);
				};
			});
		}
	};
});
