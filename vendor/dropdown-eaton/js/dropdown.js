var DDSPEED = 1;
var DDTIMER = 1;
var elementId = document.getElementById("FormDropList");
//elementId used to hide dropdown boxes when global nav tab is hovered
// Code for Responsive Design PoC //
var breakpoint = 670;

function jsUpdateSize() {
	//get viewport dimensions
	wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return wWidth;
}

function menuToggle(wWidth, wBreakpoint) {
	if (wWidth < wBreakpoint) {
		$('.menuTop').show();
		$('#globalnavholder').hide();
		$('.menuTop').die("click").live("click", function () {
			$('#globalnavholder').animate({
				height: 'toggle'
			});
		});
	} else {
		$('.menuTop').die("click");
		$('.menuTop').hide();
		$('#globalnavholder').show();
	}

}


// main function to handle the mouse events //


function ddMenu(id, d) {
	var h = document.getElementById(id + '-ddheader');
	var c = document.getElementById(id + '-ddcontent');
	clearInterval(c.timer);

	if (d == 1) {
		clearTimeout(h.timer);
		if (c.maxh && c.maxh <= c.offsetHeight) {
			return
		} else if (!c.maxh) {
			c.style.display = 'block';
			c.style.height = 'Auto';
			c.maxh = c.offsetHeight;
			c.style.height = '0px';
		}
		c.timer = setInterval(function () {
			ddSlide(c, 1)
		}, DDTIMER);
	} else {
		h.timer = setTimeout(function () {
			ddCollapse(c)
		}, 50);
	}
}

// collapse the menu //


function ddCollapse(c) {
	c.timer = setInterval(function () {
		ddSlide(c, -1)
	}, DDTIMER);
}

// cancel the collapse if a user rolls over the dropdown //


function cancelHide(id) {
	var h = document.getElementById(id + '-ddheader');
	var c = document.getElementById(id + '-ddcontent');
	clearTimeout(h.timer);
	clearInterval(c.timer);
	if (c.offsetHeight < c.maxh) {
		c.timer = setInterval(function () {
			ddSlide(c, 1)
		}, DDTIMER);
		c.style.height = '0px';
	}
}

// incrementally expand/contract the dropdown and change the opacity //


function ddSlide(c, d) {
	var mWidth = jsUpdateSize();
	if (mWidth > breakpoint) {
		var currh = c.offsetHeight;
		var dist;
		if (d == 1) {
			dist = (Math.round((c.maxh - currh) / DDSPEED));
		} else {
			dist = (Math.round(currh / DDSPEED));
		}
		if (dist <= 1 && d == 1) {
			dist = 1;
		}
		c.style.height = currh + (dist * d) + 'px';
		c.style.opacity = currh / c.maxh;
		c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
		if ((currh < 2 && d != 1) || (currh > (c.maxh - 2) && d == 1)) {
			clearInterval(c.timer);
		}
	}
}

function hideDropdowns() {

	if (elementId !== null) {
		elementId.style.visibility = "hidden";
	}
}

function showDropdowns() {
	if (elementId !== null) {
		elementId.style.visibility = "visible";
	}
}

var now = new Date();

function fourdigits(number) {
	return (number < 1000) ? number + 1900 : number;
}

curyear = (fourdigits(now.getYear()));

// Utility function to Expand / Collapse


function toggleExpandCollapse(item, expandText, collapseText) {
	obj = document.getElementById(item);
	col = document.getElementById("x" + item);
	if (obj.style.display == "none") {
		obj.style.display = "block";
		col.innerHTML = "- " + collapseText;
	} else {
		obj.style.display = "none";
		col.innerHTML = "+ " + expandText;
	}
}

function showhide(selectedClass, plusSign) {
	var allDivs = document.getElementsByTagName('div');
	for (var i = 0, total = allDivs.length; i < total; i++) {
		if (allDivs[i].className.indexOf(" " + selectedClass) > 0) {
			allDivs[i].style.display = (allDivs[i].style.display == 'block') ? 'none' : 'block';
			plusSign.innerHTML = (allDivs[i].style.display == 'block') ? '-' : '+';
		}
	}
}

// used on NewsInfo page. It displays the right nav image in
// a new window


function viewPhoto(imgUrl) {
	var oImage = new Image();
	oImage.onload = function () {
		openit = window.open(imgUrl, "", "width=" + (this.width + 20) + ",height=" + (this.height + 20));
	};
	oImage.src = imgUrl;
}

function goUrl(elementId, langCode) {
	try {
		if (elementId == "BrowseNews") {
			var category = getFilters("BrowseByCategory");
			var year = getFilters("BrowseByYear");
			var industry = getFilters("BrowseByIndustry");
			var brand = getFilters("BrowseByProductName");
			var geography = getFilters("BrowseByGeography");
			var market = getFilters("BrowseByMarkets");
			var currentUrl = document.location.href;
			var cropUrl = currentUrl.substring(0, currentUrl.indexOf("?"));
			var targetUrl = cropUrl + '?category=' + category + '&year=' + year + '&industry=' + industry + '&brand=' + brand + '&geography=' + geography + '&market=' + market;
			var cleanTarget = targetUrl.replace(/\>/g, "");
			cleanTarget = cleanTarget.replace(/\</g, "");
		} else {
			var element = eval("document.forms['BrowseNews']." + elementId);
			var tempValue = element.options[element.selectedIndex].value;
			var newWindowDirective = tempValue.substring(0, 2);
			var targetUrl = tempValue.substring(2);

			var cleanTarget = targetUrl.replace(/\>/g, "");
			cleanTarget = cleanTarget.replace(/\</g, "");
		}
		//  alert (cleanTarget);
		if (newWindowDirective == "Y_") {
			window.open(cleanTarget);
		} else {
			window.location = cleanTarget;
		}



	} catch (err) {
		//just catching errors so they don't appear for the user
	}
}

//Function to get search filter values from value string
function getFilters(elementId) {
	var element = document.getElementById(elementId);
	if (element == null) return "";
	var tempValue = element.options[element.selectedIndex].value;
	var eqIndex = tempValue.indexOf("=");
	if (eqIndex == -1) return "";
	else return (tempValue.substring(eqIndex + 1));
}

// Function to send mail
function sendemail(subj, btxt) {
	var recp = "";
	var title = document.title.replace(/&/g, "and");
	window.location = "mailto:" + recp + "?subject=" + subj + "&body=" + btxt + "%0D%0A%0D%0A" + title + "%0D%0A%0D%0A" + window.location;
}

// Function to print page
function printpage() {
	window.print();
}

function open_presentation(url, w, h) {
	presentation = window.open(url, "presentation", 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=' + w + ',height=' + h);
}

var qs = new Querystring();
var queryText = qs.get("query");
var divValue = document.getElementById('search-details');
var foundValue = "";

if (divValue !== null) {
	if (divValue.innerHTML == "No results were found for your query.") {
		foundValue = "Not Found";
	} else {
		foundValue = "Found";
	}
}

function Querystring(qs) { // optionally pass a querystring to parse
	this.params = new Object();
	this.get = Querystring_get;

	if (qs == null) qs = location.search.substr(1);
	if ((qs) && (qs.length == 0)) return;

	// Turn <plus> back to <space>
	// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	//qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&'); // parse out name/value pairs separated via &
	// split out each name=value pair
	for (var i = 0; i < args.length; i++) {
		var value;
		var pair = args[i].split('=');
		var name = unescape(pair[0]);

		if (pair.length == 2) value = unescape(pair[1]);
		else value = name;

		this.params[name] = value;
	}
}

function Querystring_get(key, default_) {
	// This silly looking line changes UNDEFINED to NULL
	if (default_ === null) default_ = null;

	var value = this.params[key];
	if (value === null) value = default_;

	return value;
}

var gaFiletypes = "pdf,doc,docx,xls,xlsx,ppt,pptx,zip,txt,csv,exe,wmv,mpg,swf";

gaClimbDOM = function (evt, tag) {
	var e = evt.target || evt.srcElement;
	while (e.tagName && (e.tagName != tag)) {
		e = e.parentElement || e.parentNode;
	}
	return e;
};
gaParseChildren = function (element, tag) {
	var children = element.childNodes,
		i, numChildren = children.length;
	for (i = 0; i < numChildren; i++) {
		if (children[i].tagName && children[i].tagName === tag) {
			return children[i];
		}
	}
	return null;
};
gaBindFunction = function (event, func) {
	if ((typeof (func) == "function") && document.body) {
		if (document.body.addEventListener) {
			document.body.addEventListener(event, func.gabind(this), true);
		} else if (document.body.attachEvent) {
			document.body.attachEvent("on" + event, func.gabind(this));
		}
	}
};
gaBindEventTrackingFunctions = function () {
	var e = (navigator.appVersion.indexOf("MSIE") != -1) ? "click" : "mousedown";
	gaBindFunction(e, this.gaTrackEvents);
};
gaSplitList = function (list) {
	var items = list.toLowerCase().split(",");
	var len = items.length;
	for (var i = 0; i < len; i++) {
		items[i] = items[i].replace(/^\s*/, "").replace(/\s*$/, "");
	}
	return items;
};
gaTypeMatch = function (pth) {
	var type = pth.substring(pth.lastIndexOf(".") + 1, (pth.indexOf('?') > -1) ? pth.indexOf('?') : pth.length).toLowerCase();
	var types = gaSplitList(gaFiletypes);
	var tlen = types.length;
	for (var i = 0; i < tlen; i++) {
		if (type == types[i]) {
			return type;
		}
	}
	return null;
};
gaTrackEvents = function (evt) {
	if (typeof _gaq !== "undefined" || true) {
		evt = evt || (window.event || "");
		if (evt && ((typeof (evt.which) != "number") || (evt.which == 1 || evt.which == 2))) {
			var e = gaClimbDOM(evt, "A");
			if (e && e.href) {
				var currentHref = document.location.href.toLowerCase().split("://")[1],
					linkHref = e.href.toLowerCase().split("://")[1];
				if (linkHref) {
					// Regular Download Tracking
					if (linkHref.indexOf("javascript") === -1) {
						var fileType = gaTypeMatch(linkHref);
						if (fileType !== null) {
							var uri = location.pathname ? ((location.pathname.indexOf("/") != 0) ? "/" + location.pathname : location.pathname) : "/";
							pth = e.pathname ? ((e.pathname.indexOf("/") != 0) ? "/" + e.pathname : e.pathname) : "/";
							uri = uri.replace(/\/[^\/]*$/, pth.substring(pth.lastIndexOf('/')));
							_gaq.push(['corp._trackEvent', 'Downloads', fileType, uri]);
							_gaq.push(['corp._trackPageview', '/download']);
							gaPauseBrowser(150);
						}
					}
					// Offsite Links and Lit Docs
					if (linkHref.indexOf(document.domain) === -1) {
						if (linkHref.indexOf("lit.powerware.com") > -1 || linkHref.indexOf("pqlit.eaton.com") > -1) { // Literature Download
							var parameter = (linkHref.match("doc_id") !== null) ? "doc_id" : "file",
								litLib = gaGetUrlVariable(parameter, linkHref);
							if (litLib !== null && litLib !== "") {
								_gaq.push(['corp._trackEvent', 'Downloads', 'Literature', litLib]);
								_gaq.push(['corp._trackPageview', '/download']);
								gaPauseBrowser(150);
							}
						} else { // Offsite Link
							_gaq.push(['corp._trackEvent', 'Offsite Link', linkHref, currentHref]);
							gaPauseBrowser(150);
						}
					}
					// idcplg Service Downloads
					if (linkHref.indexOf("/idcplg") > -1) {
						_gaq.push(['corp._trackEvent', 'Downloads', 'idcplg Service', e.innerHTML]);
						_gaq.push(['corp._trackPageview', '/download']);
						gaPauseBrowser(150);
					}
					// Large Window Popup Link Clicks
					if (linkHref.indexOf("/popuppages/largewindow/") > -1) {
						_gaq.push(['corp._trackEvent', 'Downloads', 'Large Window Popup', e.innerHTML]);
						_gaq.push(['corp._trackPageview', '/download']);
						gaPauseBrowser(150);
					}
					// Success Story Download
					if (linkHref.indexOf("/successstories/") > -1 && e.innerHTML.indexOf("Download Success Story") > -1) {
						_gaq.push(['corp._trackEvent', 'Downloads', 'Success Stories', document.title]);
						_gaq.push(['corp._trackPageview', '/download']);
						gaPauseBrowser(150);
					}
				}
				// Tab Tracking
				if (e.href.indexOf("#tabs-") > -1) {
					var s = gaClimbDOM(evt, "SPAN"),
						pageTab = s.innerHTML,
						linkPage = (linkHref.indexOf("?") > -1) ? linkHref.split('?')[0] : linkHref;
					linkPage = (linkPage.indexOf("#") > -1) ? linkPage.split('#')[0] : linkPage;
					_gaq.push(['corp._trackEvent', 'PageTabs', pageTab, linkPage]);
					gaPauseBrowser(150);
				}
				// Homepage Dynamic Navigation Tracking
				var dl = gaClimbDOM(evt, "DL");
				if (dl.className === "dropdown") {
					_gaq.push(['corp._trackEvent', 'Main Nav', e.innerHTML.replace(/(<(\/|)span>|amp;)/gi, ""), currentHref]);
					gaPauseBrowser(150);
				}
			}
		}
	}
};
gaGetUrlVariable = function (parameter, linkHref) {
	var regexS = "[\\?&]" + parameter + "=([^&$#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(linkHref);
	if (results === null) {
		return '';
	} else {
		return results[1];
	}
};
gaPauseBrowser = function (milliseconds) {
	var oldDate = new Date(),
		currentDate;
	do {
		currentDate = new Date();
	}
	while ((currentDate - oldDate) < milliseconds);
};
Function.prototype.gabind = function (obj) {
	var method = this;
	var temp = function () {
			return method.apply(obj, arguments);
		};
	return temp;
};

gaBindEventTrackingFunctions();

//Below code will Bookmark JOE in your browser***


function bookmarkPage(title, url) {
	if (document.all) {
		window.external.AddFavorite(url, title);
	} else if (window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	}
	window.focus();
}

//Set JOE as home page


function setJoeHome(envURL) {
	document.body.style.behavior = 'url(#default#homepage)';
	document.body.setHomePage(envURL);
}


function pausescroller(content, divId, divClass, delay) {
	this.content = content //message array content
	this.tickerid = divId //ID of ticker div to display information
	this.delay = delay //Delay between msg change, in miliseconds.
	this.mouseoverBol = 0 //Boolean to indicate whether mouse is currently over scroller (and pause it if it is)
	this.hiddendivpointer = 1 //index of message array for hidden div
	document.write('<div id="' + divId + '" class="' + divClass + '" style="position: relative; overflow: hidden"><div class="innerDiv" style="position: absolute; width: 100%" id="' + divId + '1">' + content[0] + '</div><div class="innerDiv" style="position: absolute; width: 100%; visibility: hidden" id="' + divId + '2">' + content[1] + '</div></div>')
	var scrollerinstance = this
	if (window.addEventListener) //run onload in DOM2 browsers
	window.addEventListener("load", function () {
		scrollerinstance.initialize()
	}, false)
	else if (window.attachEvent) //run onload in IE5.5+
	window.attachEvent("onload", function () {
		scrollerinstance.initialize()
	})
	else if (document.getElementById) //if legacy DOM browsers, just start scroller after 0.5 sec
	setTimeout(function () {
		scrollerinstance.initialize()
	}, 500)
}

// -------------------------------------------------------------------
// initialize()- Initialize scroller method.
// -Get div objects, set initial positions, start up down animation
// -------------------------------------------------------------------
pausescroller.prototype.initialize = function () {
	this.tickerdiv = document.getElementById(this.tickerid)
	this.visiblediv = document.getElementById(this.tickerid + "1")
	this.hiddendiv = document.getElementById(this.tickerid + "2")
	this.visibledivtop = parseInt(pausescroller.getCSSpadding(this.tickerdiv))
	//set width of inner DIVs to outer DIV's width minus padding (padding assumed to be top padding x 2)
	this.visiblediv.style.width = this.hiddendiv.style.width = this.tickerdiv.offsetWidth - (this.visibledivtop * 2) + "px"
	this.getinline(this.visiblediv, this.hiddendiv)
	this.hiddendiv.style.visibility = "visible"
	var scrollerinstance = this
	document.getElementById(this.tickerid).onmouseover = function () {
			scrollerinstance.mouseoverBol = 1
		}
	document.getElementById(this.tickerid).onmouseout = function () {
		scrollerinstance.mouseoverBol = 0
	}
	if (window.attachEvent) //Clean up loose references in IE
	window.attachEvent("onunload", function () {
		scrollerinstance.tickerdiv.onmouseover = scrollerinstance.tickerdiv.onmouseout = null
	})
	setTimeout(function () {
		scrollerinstance.animateup()
	}, this.delay)
}


// -------------------------------------------------------------------
// animateup()- Move the two inner divs of the scroller up and in sync
// -------------------------------------------------------------------
pausescroller.prototype.animateup = function () {
	var scrollerinstance = this
	if (parseInt(this.hiddendiv.style.top) > (this.visibledivtop + 5)) {
		this.visiblediv.style.top = parseInt(this.visiblediv.style.top) - 5 + "px"
		this.hiddendiv.style.top = parseInt(this.hiddendiv.style.top) - 5 + "px"
		setTimeout(function () {
			scrollerinstance.animateup()
		}, 200)
	} else {
		this.getinline(this.hiddendiv, this.visiblediv)
		this.swapdivs()
		setTimeout(function () {
			scrollerinstance.setmessage()
		}, this.delay)
	}
}

// -------------------------------------------------------------------
// swapdivs()- Swap between which is the visible and which is the hidden div
// -------------------------------------------------------------------
pausescroller.prototype.swapdivs = function () {
	var tempcontainer = this.visiblediv
	this.visiblediv = this.hiddendiv
	this.hiddendiv = tempcontainer
}

pausescroller.prototype.getinline = function (div1, div2) {
	div1.style.top = this.visibledivtop + "px"
	div2.style.top = Math.max(div1.parentNode.offsetHeight, div1.offsetHeight) + "px"
}

// -------------------------------------------------------------------
// setmessage()- Populate the hidden div with the next message before it's visible
// -------------------------------------------------------------------
pausescroller.prototype.setmessage = function () {
	var scrollerinstance = this
	if (this.mouseoverBol == 1) //if mouse is currently over scoller, do nothing (pause it)
	setTimeout(function () {
		scrollerinstance.setmessage()
	}, 100)
	else {
		var i = this.hiddendivpointer
		var ceiling = this.content.length
		this.hiddendivpointer = (i + 1 > ceiling - 1) ? 0 : i + 1
		this.hiddendiv.innerHTML = this.content[this.hiddendivpointer]
		this.animateup()
	}
}

pausescroller.getCSSpadding = function (tickerobj) { //get CSS padding value, if any
	if (tickerobj.currentStyle) return tickerobj.currentStyle["paddingTop"]
	else if (window.getComputedStyle) //if DOM2
	return window.getComputedStyle(tickerobj, "").getPropertyValue("padding-top")
	else return 0
}