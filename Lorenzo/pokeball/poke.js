'use strict';

let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

let topGeometry, topMaterial, topMesh;
let bottomGeometry, bottomMaterial, bottomMesh;
let ringGeometry, ringMaterial, ringMesh;
let buttonGeometry, buttonMaterial, buttonMesh;

// default: white, 1.0 intensity
let lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0
}

let textureDiffuse = loadTexture("texture/poke/pokeball_diffuse.png");
//let textureDiffuse = loadTexture("texture/master/master_diffuse.png");
let textureSpecular = loadTexture("texture/poke/pokeball_spec.png");
let textureRoug = loadTexture("texture/poke/pokeball_roug.png");
let textureNormal = loadTexture("texture/poke/pokeball_normal.png");
//let textureNormal = loadTexture("texture/master/master_normal.png");


// steel texture
let textureDiffuseSteel = loadTexture("texture/steel/CorrugatedSteel01_col.jpg");
let textureSpecularSteel = loadTexture("texture/steel/CorrugatedSteel01_met.jpg");
let textureNormalSteel = loadTexture("texture/steel/CorrugatedSteel01_nrm.jpg");
let textureRougSteel = loadTexture("texture/steel/CorrugatedSteel01_rgh.jpg");

let uniformsDefault = {
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureDiffuse },
    specularMap: { type: "t", value: textureSpecular },
    rougMap: { type: "t", value: textureRoug },
    normalMap: { type: "t", value: textureNormal },
}

let uniformsSteel = {
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureDiffuseSteel },
    specularMap: { type: "t", value: textureSpecularSteel },
    rougMap: { type: "t", value: textureRougSteel },
    normalMap: { type: "t", value: textureNormalSteel },
}

let vs = document.getElementById("vertex").textContent;
let fs = document.getElementById("fragment").textContent;

let matDefault = new THREE.ShaderMaterial({ uniforms: uniformsDefault, vertexShader: vs, fragmentShader: fs });
matDefault.vertexTangents = true;
matDefault.needsUpdate = true;

let matSteel = new THREE.ShaderMaterial({ uniforms: uniformsSteel, vertexShader: vs, fragmentShader: fs });
matSteel.vertexTangents = true;
matSteel.needsUpdate = true;

let loader = new THREE.OBJLoader2();
loader.useIndices = true;
loader.load("model/pokeball_smooth.obj", function (obj) {
    topGeometry = obj.detail.loaderRootNode.children[2].geometry;
    topMesh = new THREE.Mesh(topGeometry, matDefault);
    topMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(topGeometry);
    scene.add(topMesh);

    bottomGeometry = obj.detail.loaderRootNode.children[1].geometry;
    bottomMesh = new THREE.Mesh(bottomGeometry, matSteel);
    bottomMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(bottomGeometry);
    scene.add(bottomMesh);

    ringGeometry = obj.detail.loaderRootNode.children[3].geometry;
    ringMesh = new THREE.Mesh(ringGeometry, matDefault);
    ringMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(ringGeometry);
    scene.add(ringMesh);

    buttonGeometry = obj.detail.loaderRootNode.children[0].geometry;
    buttonMesh = new THREE.Mesh(buttonGeometry, matSteel);
    buttonMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(buttonGeometry);
    scene.add(buttonMesh);
});

let lightMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
lightMesh.position.set(7.0, 7.0, 7.0);
uniformsDefault.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniformsDefault.clight.value = new THREE.Vector3(1.0,1.0,1.0);

uniformsSteel.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniformsSteel.clight.value = new THREE.Vector3(1.0,1.0,1.0);

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