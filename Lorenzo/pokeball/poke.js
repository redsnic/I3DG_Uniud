'use strict';

let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

let topGeometry, topMaterial, topMesh;
let bottomGeometry, bottomMaterial, bottomMesh;
let ringGeometry, ringMaterial, ringMesh;
let buttonGeometry, buttonMaterial, buttonMesh;

let vs = document.getElementById("vertex").textContent;
let fs = document.getElementById("fragment").textContent;

let textureTopMaterial = {
    diffuse : loadTexture("texture/poke/pokeball_diffuse.png"),
    specular : loadTexture("texture/poke/pokeball_spec.png"),
    normal : loadTexture("texture/poke/pokeball_normal.png"),
    roug : loadTexture("texture/poke/pokeball_roug.png"),
}

let textureBottomMaterial = {
    diffuse : loadTexture("texture/poke/pokeball_diffuse.png"),
    specular : loadTexture("texture/poke/pokeball_spec.png"),
    normal : loadTexture("texture/poke/pokeball_normal.png"),
    roug : loadTexture("texture/poke/pokeball_roug.png"),
}

let textureRingMaterial = {
    diffuse : loadTexture("texture/poke/pokeball_diffuse.png"),
    specular : loadTexture("texture/poke/pokeball_spec.png"),
    normal : loadTexture("texture/poke/pokeball_normal.png"),
    roug : loadTexture("texture/poke/pokeball_roug.png"),
}

let textureButtonMaterial = {
    diffuse : loadTexture("texture/poke/pokeball_diffuse.png"),
    specular : loadTexture("texture/poke/pokeball_spec.png"),
    normal : loadTexture("texture/poke/pokeball_normal.png"),
    roug : loadTexture("texture/poke/pokeball_roug.png"),
}

// default: white, 1.0 intensity
let lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0
}

let uniformsTopMaterial = {
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureTopMaterial.diffuse },
    specularMap: { type: "t", value: textureTopMaterial.specular },
    rougMap: { type: "t", value: textureTopMaterial.roug },
    normalMap: { type: "t", value: textureTopMaterial.normal },
}

let uniformsBottomMaterial = {
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureBottomMaterial.diffuse },
    specularMap: { type: "t", value: textureBottomMaterial.specular },
    rougMap: { type: "t", value: textureBottomMaterial.roug },
    normalMap: { type: "t", value: textureBottomMaterial.normal },
}

let uniformsRingMaterial = {
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureRingMaterial.diffuse },
    specularMap: { type: "t", value: textureRingMaterial.specular },
    rougMap: { type: "t", value: textureRingMaterial.roug },
    normalMap: { type: "t", value: textureRingMaterial.normal },
}

let uniformsButtonMaterial = {
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    diffuseMap: { type: "t", value: textureButtonMaterial.diffuse },
    specularMap: { type: "t", value: textureButtonMaterial.specular },
    rougMap: { type: "t", value: textureButtonMaterial.roug },
    normalMap: { type: "t", value: textureButtonMaterial.normal },
}

/*
// steel texture
let textureDiffuseSteel = loadTexture("texture/steel/CorrugatedSteel01_col.jpg");
let textureSpecularSteel = loadTexture("texture/steel/CorrugatedSteel01_met.jpg");
let textureNormalSteel = loadTexture("texture/steel/CorrugatedSteel01_nrm.jpg");
let textureRougSteel = loadTexture("texture/steel/CorrugatedSteel01_rgh.jpg");*/


topMaterial = new THREE.ShaderMaterial( {uniforms: uniformsTopMaterial, vertexShader: vs, fragmentShader: fs });
bottomMaterial = new THREE.ShaderMaterial( {uniforms: uniformsBottomMaterial, vertexShader: vs, fragmentShader: fs });
ringMaterial = new THREE.ShaderMaterial( {uniforms: uniformsRingMaterial, vertexShader: vs, fragmentShader: fs });
buttonMaterial = new THREE.ShaderMaterial( {uniforms: uniformsButtonMaterial, vertexShader: vs, fragmentShader: fs });

topMaterial.vertexTangents = true; topMaterial.needsUpdate = true;
bottomMaterial.vertexTangents = true; bottomMaterial.needsUpdate = true;
ringMaterial.vertexTangents = true; ringMaterial.needsUpdate = true;
buttonMaterial.vertexTangents = true; buttonMaterial.needsUpdate = true;

let loader = new THREE.OBJLoader2();
loader.useIndices = true;
loader.load("model/pokeball_smooth.obj", function (obj) {
    topGeometry = obj.detail.loaderRootNode.children[2].geometry;
    topMesh = new THREE.Mesh(topGeometry, topMaterial);
    //topMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(topGeometry);
    scene.add(topMesh);

    bottomGeometry = obj.detail.loaderRootNode.children[1].geometry;
    bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial);
    //bottomMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(bottomGeometry);
    scene.add(bottomMesh);

    ringGeometry = obj.detail.loaderRootNode.children[3].geometry;
    ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    //ringMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(ringGeometry);
    scene.add(ringMesh);

    buttonGeometry = obj.detail.loaderRootNode.children[0].geometry;
    buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
    //buttonMesh.scale.multiplyScalar(0.9);
    THREE.BufferGeometryUtils.computeTangents(buttonGeometry);
    scene.add(buttonMesh);
});

let lightMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
lightMesh.position.set(7.0, 7.0, 7.0);

uniformsTopMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniformsTopMaterial.clight.value = new THREE.Vector3(1.0,1.0,1.0);
uniformsBottomMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniformsBottomMaterial.clight.value = new THREE.Vector3(1.0,1.0,1.0);
uniformsRingMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniformsRingMaterial.clight.value = new THREE.Vector3(1.0,1.0,1.0);
uniformsButtonMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
uniformsButtonMaterial.clight.value = new THREE.Vector3(1.0,1.0,1.0);

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