'use strict';

let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

// default: white, 1.0 intensity
let lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0
}

let textureDiffuse = loadTexture("texture/poke/pokeball_diffuse.png");
let textureSpecular = loadTexture("texture/poke/pokeball_spec.png");
let textureRoug = loadTexture("texture/poke/pokeball_roug.png");

let uniforms = {
    //cspec: { type: "v3", value: new THREE.Vector3(0.04, 0.04, 0.04) },
    //cdiff: { type: "v3", value: new THREE.Vector3(0.1, 0.3, 0.5) },
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureDiffuse },
    specularMap: { type: "t", value: textureSpecular },
    rougMap: { type: "t", value: textureRoug },
}

let vs = document.getElementById("vertex").textContent;
let fs = document.getElementById("fragment").textContent;

let mat = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
//let mat = new THREE.MeshBasicMaterial( {color: 0x00ff33, wireframe: true} );

let loader = new THREE.OBJLoader2();
loader.useIndices = true;
loader.load("model/pokeball_parts.obj", function (obj) {
    // accedi alla geometria del modello e centrala rispetto il world space
    let geometry = obj.detail.loaderRootNode.children[1].geometry;
    geometry.center();
    let mesh = new THREE.Mesh(geometry, mat);
    mesh.scale.multiplyScalar(0.9);
    scene.add(mesh);
});

let lightMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
lightMesh.position.set(7.0, 7.0, 7.0);
uniforms.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniforms.clight.value = new THREE.Vector3(1.0,1.0,1.0);

let stats = new Stats();

function init() {

    renderer.setClearColor(0xf0f0f0);
    camera.position.set(0, 0, 10);
    scene.add(camera);
    scene.add(lightMesh);

    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = true;
    controls.update();

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load(file, function (texture) {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.needsUpdate = true;
        render();
    })
    return texture;
}

function update() {
    requestAnimationFrame(update);
    stats.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
update();
render();