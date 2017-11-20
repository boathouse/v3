"use strict"

b4w.register("boathouse", function (exports, require) {

    var m_anim = require("animation");
    var m_app = require("app");
    var m_cfg = require("config");
    var m_ctl = require("controls");
    var m_data = require("data");
    var m_mat = require("material");
    var m_scenes = require("scenes");
    var m_version = require("version");

    var current = null;
    var loader;

    exports.init = function () {
        m_app.init({
            canvas_container_id: "main",
            callback: init_cb,
            show_fps: true,
            console_verbose: !1,
            autoresize: true,
            //quality: m_cfg.P_ULTRA,
            //alpha: true,
            assets_gzip_available: true
        });
    }

    function init_cb(canvas_elem, success) {

        document.oncontextmenu = function () {
            return false;
        }

        if (!success) {
            console.log("b4w init failure");
            return;
        }

        load();
    }

    function load() {
        loader = document.getElementById("loading");
        m_data.load("assets/scene.json", load_cb);
    }

    function load_cb(data_id) {
        m_app.enable_camera_controls();
        current = m_data.load("assets/models/travel570b_default.json", cons);
    }

    function compl(data_id) {
        loader.style.display = "none";
    }

    function unl() {
        var elements = document.querySelectorAll('.controls div');

        for (var i = 0; i < elements.length; i++) {
            elements[i].className = "xyu";
        }

        loader.style.display = "block";
        m_data.unload(current);
    }

    function cons(data_id) {
        loader.style.display = "none";

        document.getElementById("v1").addEventListener("click", function (e) {
            if (this.className !== 'active') {
                unl();
                this.className = "active";
                current = m_data.load("assets/models/travel570b_default.json", compl);
            }
        });

        document.getElementById("v2").addEventListener("click", function (e) {
            if (this.className !== 'active') {
                unl();
                this.className = "active";
                current = m_data.load("assets/models/travel570b_custom.json", compl);
            }
        });

        document.getElementById("v3").addEventListener("click", function (e) {
            if (this.className !== 'active') {
                unl();
                this.className = "active";
                current = m_data.load("assets/models/travel570b_full.json", compl);
            }
        });
    }

});

b4w.require("boathouse").init();