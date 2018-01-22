!function(name,definition){if(typeof module!="undefined")module.exports=definition();else if(typeof define=="function"&&typeof define.amd=="object")define(definition);else this[name]=definition()}("domready",function(){var fns=[],listener,doc=typeof document==="object"&&document,hack=doc&&doc.documentElement.doScroll,domContentLoaded="DOMContentLoaded",loaded=doc&&(hack?/^loaded|^c/:/^loaded|^i|^c/).test(doc.readyState);if(!loaded&&doc)doc.addEventListener(domContentLoaded,listener=function(){doc.removeEventListener(domContentLoaded,listener);loaded=1;while(listener=fns.shift())listener()});return function(fn){loaded?setTimeout(fn,0):fns.push(fn)}});

(function(window){function classReg(className){return new RegExp("(^|\\s+)"+className+"(\\s+|$)")}var hasClass,addClass,removeClass;if("classList"in document.documentElement){hasClass=function(elem,c){return elem.classList.contains(c)};addClass=function(elem,c){elem.classList.add(c)};removeClass=function(elem,c){elem.classList.remove(c)}}else{hasClass=function(elem,c){return classReg(c).test(elem.className)};addClass=function(elem,c){if(!hasClass(elem,c))elem.className=elem.className+" "+c};removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c)," ")}}function toggleClass(elem,c){var fn=hasClass(elem,c)?removeClass:addClass;fn(elem,c)}var classie={has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};if(typeof define==="function"&&define.amd)define(classie);else if(typeof exports==="object")module.exports=classie;else window.classie=classie})(window);
/*---------------------------------------------*/

var onw3d = null;

/* ====== Onw3DViewer Class ========= */
var Onw3dViewer = function(model) {

      this.model = model;
      this.equip = '';

      var o = this;
      var w = window;
      var d = document;
      var r = d.documentElement;
      var h = d.getElementsByTagName("head")[0];
      var ASSETS_PATH = "assets/";
      var objs = [];
      var _w = null;
      var l;
      var prod = false;
      var cat = false;
      

      // var style = d.createElement("style");
      // style.innerHTML = '#onw3d_viewer{position:fixed;border:0px;left:0;top:0;width:100%;height:100%;overflow:hidden}';
      // style.innerHTML+= '';
      // style.innerHTML+= '';
      // d.body.appendChild(style);

      
      /* public methods */
      this.hideAll = function () {
        classie.has(r, 'onw3d_root') ? classie.remove(r, 'onw3d_root') : '';
        objs.forEach(function(item, i, arr) {
          item.style.display = "none";
        });
      }

      this.showAll = function () {
        classie.has(r, 'onw3d_root') ? '' : classie.add(r, 'onw3d_root');
        objs.forEach(function(item, i, arr) {
          item.style.display = "block";
        });
      }

      this.setPreloader = function (mode, value) {
          if (mode) l.style.display = "block";
          else l.style.display = "none";

          if (!value) value = '';  
      }
      /* -------- end public methods ------------- */


      /* private methods */
      function addAll() {
        objs.forEach(function(item, i, arr) {
          d.body.appendChild(item);
        });
      }

      function ajax_get(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //console.log('responseText:' + xmlhttp.responseText);
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch(err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };
     
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
      }


      function toggleFullScreen() {
          if (!document.fullscreenElement &&
              !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
              if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen();
              } else if (document.documentElement.msRequestFullscreen) {
                  document.documentElement.msRequestFullscreen();
              } else if (document.documentElement.mozRequestFullScreen) {
                  document.documentElement.mozRequestFullScreen();
              } else if (document.documentElement.webkitRequestFullscreen) {
                  document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
          } else {
              if (document.exitFullscreen) {
                  document.exitFullscreen();
              } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
              } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
              }
          }
      }
      /* -------- end private methods -------------- */

      /* create elements */
      var link = d.createElement("link");
      link.href = ASSETS_PATH + "css/style.css";       
      link.type = "text/css";
      link.rel = "stylesheet";
      h.appendChild(link);

      var viewer = d.createElement("iframe");
      viewer.setAttribute("id", "onw3d_viewer");
      objs.push(viewer);

      var controls = d.createElement("div");
      controls.setAttribute("id", "onw3d_controls");
      objs.push(controls);

      var controls_wrap = d.createElement("div");
      controls_wrap.setAttribute("id", "onw3d_controls_wrap");
      controls.appendChild(controls_wrap);

      var cont = d.createElement("div");
      classie.add(cont, "onw3d_cont");
      controls_wrap.appendChild(cont);

      var controls_btn = d.createElement("div");
      controls_btn.setAttribute("id", "onw3d_controls_btn");
      controls.appendChild(controls_btn);

      var controls_btn2 = d.createElement("div");
      controls_btn2.setAttribute("id", "onw3d_controls_btn2");
      controls.appendChild(controls_btn2);

      var controls_btn3 = d.createElement("div");
      controls_btn3.setAttribute("id", "onw3d_controls_btn3");
      controls.appendChild(controls_btn3);

      var controls_btn4 = d.createElement("div");
      controls_btn4.setAttribute("id", "onw3d_controls_btn4");
      //classie.add(controls_btn4, "exitfs");
      controls.appendChild(controls_btn4);

      var controls_btn5 = d.createElement("div");
      controls_btn5.setAttribute("id", "onw3d_controls_btn5");
      controls.appendChild(controls_btn5);

      var controls_btn6 = d.createElement("div");
      controls_btn6.setAttribute("id", "onw3d_controls_btn6");
      controls.appendChild(controls_btn6);


      var controls_test = d.createElement("div");
      controls_test.setAttribute("id", "onw3d_controls_test");
      controls.appendChild(controls_test);

      controls_btn.addEventListener("click", function (e) {
        classie.toggle(controls, "active");
        classie.remove(controls_test, "open");
        classie.remove(controls_btn2, "open");
      });

      controls_btn2.addEventListener("click", function (e) {
        classie.toggle(this, "open");
        classie.toggle(controls_test, "open");

        if(!cat) {
          ajax_get("https://boathouse.ua/index.php?route=get_json_data", function(data) {

            controls_test.innerHTML = '<h2>КАТАЛОГ ПРОДУКЦИИ</h2>'; controls_test.scrollTop = 0;
            for (var i=0; i < data.length; i++) {
              var p = d.createElement("div");
              //var img = (data[i]["icon"] != "") ? '<img src="https://boathouse.ua/image/'+ encodeURI(data[i]["icon"]) +'" />':"";
              p.innerHTML =   '<h3>' + data[i]["name"] + '</h3>';
              p.innerHTML +=  '<p>' + data[i]["description"] + '</p>';
              p.setAttribute("data-id", data[i]["id"]);
              classie.add(p, "onw3d_category_item");

              p.addEventListener("click", function (e) {
                var cid = this.getAttribute("data-id");
                var cat_name = this.querySelector('h3').innerText;
                if(!prod){
                ajax_get("https://boathouse.ua/index.php?route=get_json_data&cid=" + cid, function(data) {

                  controls_test.innerHTML = '<h2>'+ cat_name +'</h2>'; cat = false; controls_test.scrollTop = 0;

                  for (var i=0; i < data.length; i++) {
                    var p = d.createElement("div");
                    p.innerHTML =   '<h3>' + data[i]["name"] + '</h3>';
                    p.innerHTML +=  '<p class="elipsis">' + data[i]["description"] + '</p>';
                    p.setAttribute("data-id", data[i]["id"]);
                    p.setAttribute("data-model", data[i]["zcode"]);
                    classie.add(p, "onw3d_category_item");
                    p.addEventListener("click", function (e) {

                      o.model = this.getAttribute("data-model");

                      if(o.model && o.model!=""){
                      //d.body.scrollTop = 0;
                      _w.init();


                       ajax_get("https://boathouse.ua/index.php?route=get_json_data&pname=" + o.model, function(data) {
                        
                        cont.innerHTML = '<h2 style="float:left">' + data["name"] + '</h2>';

                        if(data['image']) cont.innerHTML += '<img style="width:200px;float:left;margin-left:70px" src="https://boathouse.ua/image/'+ data['image'] +'">';
                        cont.innerHTML += '<p class="clearfix"></p><p>Варианты комплектации:</p>';

                        for (var i=0; i < data["variants"].length; i++) {
                          var p = d.createElement("div");
                          p.innerHTML = '<b>' + data["variants"][i]["name"] + '</b>';
                          //p.innerHTML += '<img src="' + data["equipment"][i]["image"] + '" />';
                          //p.innerHTML += '<p>' + data["equipment"][i]["description"] + '</p>';
                          p.setAttribute("data-equipment", data["variants"][i]["type"]);

                          p.addEventListener("click", function (e) {
                            //equipment = this.getAttribute("data-equipment");
                            //if(current) m_data.unload(current);
                            //showAll();
                            //classie.has(controls, 'active') ? classie.remove(controls, 'active') : '';
                            //classie.has(close, 'hidden') ? classie.remove(close, 'hidden') : '';
                            //current = m_data.load(ASSETS_PATH + "models/" + onw3d_model + "_" + equipment + ".json", complete_cb);
                          });
                          classie.add(p, "onw3d_main_item");
                         
                          cont.appendChild(p);
                        }

                        //cont.innerHTML += "<p>"+ data["variants"] +"</p>";
                        //cont.innerHTML += '<p><img style="max-width:100%" src="https://boathouse.ua/image/'+ data['image'] +'"></p>';
                        //cont.innerHTML += "<p>"+ data["description"] +"</p>";

                        classie.add(cont, "onw3d_cont");
                        controls_wrap.appendChild(cont);

                        
                      });

                     } //if



                    });
                    controls_test.appendChild(p);
                    
                  }
                  prod = false;

                });
              }//if
            
              });
              controls_test.appendChild(p);
            }
            cat = true;
          
          });
        }

      });

      controls_btn3.addEventListener("click", function (e) {
        //classie.toggle(this, "exitfs");
         _w.toggleCameraRotate();
      });

      controls_btn4.addEventListener("click", function (e) {
        classie.toggle(this, "exitfs");
        toggleFullScreen();
      });

      controls_btn5.addEventListener("click", function (e) {
        //classie.toggle(this, "exitfs");
        _w.setEnv();
      });

      controls_btn6.addEventListener("click", function (e) {
         _w.takeScreenshot();
      });




     

      var close = d.createElement("div");
      close.setAttribute("id", "onw3d_close");
      objs.push(close);

      close.addEventListener("click", function (e) {
        classie.remove(controls, "active");
        classie.remove(controls_test, "open");
        o.hideAll();
        _w.clear();
      });
      /* ----------------- */

      this.hideAll();
      addAll();

      viewer.setAttribute("src", "viewer.html");
      viewer.readyState ? viewer.onreadystatechange = function() {
        ("loaded" == viewer.readyState || "complete" == viewer.readyState) && (viewer.onreadystatechange = null, onReady())
      } : viewer.onload = function() { onReady(); };
      

      function onReady() {
          _w = viewer.contentWindow;
          l = _w.document.getElementById('info');

          [].slice.call(d.querySelectorAll(".onw3d_btn")).forEach(function(a) {
            
              a&&(a.onclick=function() {
                event.preventDefault();
                o.showAll();
                o.model = a.getAttribute("data-model")  || '404';
                o.equip = a.getAttribute("data-equip") || '';

if(o.model && o.model!=""){

                   ajax_get("https://boathouse.ua/index.php?route=get_json_data&pname=" + o.model, function(data) {
                  
                  cont.innerHTML = '<h2 style="float:left">' + data["name"] + '</h2>';

                  if(data['image']) cont.innerHTML += '<img style="width:200px;float:left;margin-left:70px" src="https://boathouse.ua/image/'+ data['image'] +'">';
                  cont.innerHTML += '<p class="clearfix"></p><p>Варианты комплектации:</p>';

if(data["variants"]){
                  for (var i=0; i < data["variants"].length; i++) {
                    var p = d.createElement("div");
                    p.innerHTML = '<b>' + data["variants"][i]["name"] + '</b>';
                    //p.innerHTML += '<img src="' + data["equipment"][i]["image"] + '" />';
                    //p.innerHTML += '<p>' + data["equipment"][i]["description"] + '</p>';
                    p.setAttribute("data-equipment", data["variants"][i]["type"]);

                    p.addEventListener("click", function (e) {
                      //equipment = this.getAttribute("data-equipment");
                      //if(current) m_data.unload(current);
                      //showAll();
                      //classie.has(controls, 'active') ? classie.remove(controls, 'active') : '';
                      //classie.has(close, 'hidden') ? classie.remove(close, 'hidden') : '';
                      //current = m_data.load(ASSETS_PATH + "models/" + onw3d_model + "_" + equipment + ".json", complete_cb);
                    });
                    classie.add(p, "onw3d_main_item");
                   
                    cont.appendChild(p);
                  }
                }

                  //cont.innerHTML += "<p>"+ data["variants"] +"</p>";
                  //cont.innerHTML += '<p><img style="max-width:100%" src="https://boathouse.ua/image/'+ data['image'] +'"></p>';
                  //cont.innerHTML += "<p>"+ data["description"] +"</p>";

                  
                });
}









                if(o.model && o.model!="") {_w.init();}


              });
          }); 

          // onclick a
         








      }

      //..   
};
/* ======== end Onw3DViewer Class ========== */



domready(function () {

  onw3d = new Onw3dViewer;

});







