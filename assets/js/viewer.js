var _init = false,
    _real = true,
    _render = true;
    _env = false;

var container, loader, info, stats;

var scene, camera, renderer, controls, light;

var water, skybox;

var parameters = {
    oceanSide: 1000,
    size: 1.0,
    distortionScale: 1.0,
    alpha: 0.6
};

info = document.getElementById("info");

if (!Detector.webgl) Detector.addGetWebGLMessage();

function clear(arg) {
    //camera.position.set(10, 10, 50);
    controls.reset();

    for (var obj in loader.meshes) {
        scene.remove(loader.meshes[obj]);
        loader.meshes[obj].geometry.dispose();
        loader.meshes[obj].material.dispose();
        //loader.meshes[obj].material.dispose();
    }

    // for (var obj in loader.textures) {
    //     var t = loader.textures[obj];
    //     console.log(t.dispose());
    // }

    if (arg) {
        _render = true;
        load();
        //skyBox.visible = false;
        //water.visible = false;
    } else {
        _render = false;
    }
}

function load() {
    info.style.display = "block";
    loader = new THREE.SEA3D({
        container: scene
    });
    loader.onComplete = function (e) {
        info.style.display = "none";
        //var mat = this.meshes[1].material;
        //mat.needsUpdate = true;
        //var texture = new THREE.TextureLoader().load( "assets/textures/fisher/green.jpg", function(t){mat.map.image.src = t.image.src;} );
        //mat.map = texture;
        //mat.map.image.src = "assets/textures/fisher/light.jpg";
    };

    var req_model = window.parent.onw3d.model || '404';
    var eq_model = window.parent.onw3d.equip || '';

    var url = 'assets/models/' + req_model + eq_model + '.sea';
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        //console.log(http);
        if (http.readyState === 4) {
            if (http.status === 404) {
                //console.log('404');
                window.parent.onw3d.model = '404';
                window.parent.onw3d.hideAll();
                window.parent.onw3d.showAll();
                window.parent.onw3d.setPreloader();
                loader.load('assets/models/404.sea');
                //return;
                //alert('Error 404 - File not found');
            } else {
                window.parent.onw3d.setPreloader(!0);
                loader.load(url);
            }
        }
    };
    http.onerror = function () {
        console.log('error');

    };
    http.open('HEAD', url);
    http.send();
}


function init() {
    if (_init) return clear(true);

    var width = window.innerWidth;
    var height = window.innerHeight;

    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.antialias = true;
    renderer.setPixelRatio(window.devicePixelRatio);//|| 1
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x3f4d5a, 0.001);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(10, 10, 50);

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-30, 30, 30);
    scene.add(light);

    var underlight = new THREE.DirectionalLight(0xcccccc, 0.3);
    underlight.position.set(30, -30, 30);
    scene.add(underlight);

    var ambientLight = new THREE.AmbientLight(0xdddddd, 0.9);
    scene.add(ambientLight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxDistance = 200.0;
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.zoomSpeed = 0.4;
    controls.rotateSpeed = 0.3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;

    camera.lookAt(controls.target);

    stats = new Stats();
    container.appendChild(stats.dom);

    // var helper = new THREE.GridHelper( 200, 60, 0xFF4444, 0x404040 );
    // helper.position.y = -1.5;
    // scene.add( helper );

    window.addEventListener('resize', onWindowResize, false);

    _init = true;

    if(_env){
        setWater();
        setSkybox();
    }
    load();
    animate();
}


function toggleCameraRotate() {
    controls.autoRotate = (controls.autoRotate == true) ? false : true;
}


function setEnv() {
    if(!water) setWater();
    if(!skybox) setSkybox();

    if(_env == true) {
        _env=false;
        skybox && (skybox.visible = false);
        water && (water.visible = false);
    }else{
        _env=true;
        skybox && (skybox.visible = true);
        water && (water.visible = true);
    }
}


function setWater() {
    //var waterGeometry = new THREE.PlaneBufferGeometry( parameters.oceanSide * 5, parameters.oceanSide * 5 );
    water = new THREE.Water(
        new THREE.PlaneBufferGeometry(parameters.oceanSide * 5, parameters.oceanSide * 5), {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('assets/textures/waternormals.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: parameters.alpha,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: parameters.distortionScale,
            fog: scene.fog !== undefined
        }
    );

    water.position.y = -1.5;
    water.rotation.x = -Math.PI / 2;
    water.receiveShadow = true;
    scene.add(water);
}


function setSkybox() {
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('assets/textures/skybox4/');

    cubeMap = cubeTextureLoader.load([
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg',
    ]);

    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeMap;

    var skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        side: THREE.BackSide
    });

    var skyBoxGeometry = new THREE.BoxBufferGeometry(
        parameters.oceanSide * 5 + 100,
        parameters.oceanSide * 5 + 100,
        parameters.oceanSide * 5 + 100);

    skybox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);

    scene.add(skybox);
}


function takeScreenshot() {

    //skybox && (skybox.visible = false);
    //water && (water.visible = false);

    var a = document.createElement('a');
    renderer.render(scene, camera);
    a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
    a.download = window.parent.onw3d.model + '.png';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    //skybox && (skybox.visible = true);
    //water && (water.visible = true);
}


function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}


function animate() {
    requestAnimationFrame(animate);
    if(_env){
        if (_real) {
            water.material.uniforms.time.value += 1.0 / 60.0;
        }
    }

    if (_render) {
        renderer.render(scene, camera);
        controls.update();
        stats.update();
    }
}