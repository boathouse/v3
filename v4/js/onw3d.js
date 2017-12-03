!function(name,definition){if(typeof module!="undefined")module.exports=definition();else if(typeof define=="function"&&typeof define.amd=="object")define(definition);else this[name]=definition()}("domready",function(){var fns=[],listener,doc=typeof document==="object"&&document,hack=doc&&doc.documentElement.doScroll,domContentLoaded="DOMContentLoaded",loaded=doc&&(hack?/^loaded|^c/:/^loaded|^i|^c/).test(doc.readyState);if(!loaded&&doc)doc.addEventListener(domContentLoaded,listener=function(){doc.removeEventListener(domContentLoaded,listener);loaded=1;while(listener=fns.shift())listener()});return function(fn){loaded?setTimeout(fn,0):fns.push(fn)}});

(function(window){function classReg(className){return new RegExp("(^|\\s+)"+className+"(\\s+|$)")}var hasClass,addClass,removeClass;if("classList"in document.documentElement){hasClass=function(elem,c){return elem.classList.contains(c)};addClass=function(elem,c){elem.classList.add(c)};removeClass=function(elem,c){elem.classList.remove(c)}}else{hasClass=function(elem,c){return classReg(c).test(elem.className)};addClass=function(elem,c){if(!hasClass(elem,c))elem.className=elem.className+" "+c};removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c)," ")}}function toggleClass(elem,c){var fn=hasClass(elem,c)?removeClass:addClass;fn(elem,c)}var classie={has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};if(typeof define==="function"&&define.amd)define(classie);else if(typeof exports==="object")module.exports=classie;else window.classie=classie})(window);
/*---------------------------------------------*/

domready(function () {
  "use strict"
  var w = window;
  var d = document;
  var r = d.documentElement;
  var h = d.getElementsByTagName("head")[0];
  var ASSETS_PATH = "assets/";


  var style = d.createElement("style");
  style.innerHTML = '#onw3d_viewer{position:fixed;border:0px;left:0;top:0;width:100%;height:100%;overflow:hidden}';
  style.innerHTML+= '';
  style.innerHTML+= '';
  d.body.appendChild(style);

  var link = d.createElement("link");
  link.href = ASSETS_PATH + "css/style.css";       
  link.type = "text/css";
  link.rel = "stylesheet";
  h.appendChild(link);

  var viewer = d.createElement("iframe");
  viewer.setAttribute("id", "onw3d_viewer");
  viewer.setAttribute("src", "index_v4.html");
  //viewer.style.display = "none";
  d.body.appendChild(viewer);

  //d.onclick=function(){viewer.contentWindow.testme();}


});// domready
