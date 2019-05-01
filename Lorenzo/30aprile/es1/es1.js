
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var scene = new THREE.Scene();

// default: white, 1.0 intensity
var lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0,
}

var textureParameters = {
    normalScale: 1.0,
    heightScale: 0.8,
}

var normalMap = loadTexture("../../textures/normal.jpg");
var heightMap = loadTexture("../../textures/displacement.jpg");

var uniforms = {
    cspec: { type: "v3", value: new THREE.Vector3(0.04, 0.04, 0.04) },
    cdiff: { type: "v3", value: new THREE.Vector3(0.1, 0.3, 0.5) },
    roughness: { type: "f", value: 0.2 },
    normalMap: { type: "t", value: normalMap },
    normalScale: { type: "v2", value: new THREE.Vector2(1.0, 1.0) },
    heightMap: { type: "t", value: heightMap },
    heightScale: { type: "f", value: 1.0 },
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
};

vs = document.getElementById("vertex").textContent;
fs = document.getElementById("fragment").textContent;

var ourMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
ourMaterial.vertexTangents = true;
ourMaterial.needsUpdate = true;
//console.log(ourMaterial);

var loader = new THREE.OBJLoader2();
loader.useIndices = true;
loader.load("../../models/ninjaHead_Low.obj", function (obj) {
    //console.log(obj);
    // accedi alla geometria del modello e centrala rispetto il world space
    geometry = obj.detail.loaderRootNode.children[0].geometry;
    geometry.center();
    mesh = new THREE.Mesh(geometry, ourMaterial);
    mesh.scale.multiplyScalar(0.1);
    THREE.BufferGeometryUtils.computeTangents(geometry);
    scene.add(mesh);
});

var lightMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
lightMesh.position.set(7.0, 7.0, 7.0);
uniforms.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);

var gui;
var stats = new Stats();

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

function init() {

    renderer.setClearColor(0xf0f0f0);

    camera.position.set(0, 0, 10);
    scene.add(camera);
    scene.add(lightMesh);

    document.body.appendChild(renderer.domElement);
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //controls.addEventListener( 'change', render );
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false;
    controls.update();

    window.addEventListener('resize', onResize, false);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
}

function update() {
    requestAnimationFrame(update);
    stats.update();
    render();
}

function render() {
    updateUniforms();
    renderer.render(scene, camera);
}

function clearGui() {
    if (gui) gui.destroy();
    gui = new dat.GUI();
    gui.open();
}

function buildGui() {
    clearGui();
    lightSettings = gui.addFolder('Light Parameters');
    lightSettings.add(lightParameters, 'red').min(0).max(1).onChange(function (newVal) { render() });
    lightSettings.add(lightParameters, 'green').min(0).max(1).onChange(function (newVal) { render() });
    lightSettings.add(lightParameters, 'blue').min(0).max(1).onChange(function (newVal) { render() });
    lightSettings.add(lightParameters, 'intensity').min(0).max(5).onChange(function (newVal) { render() });

    textureSettings = gui.addFolder('Texture parameters');
    textureSettings.add(textureParameters, 'normalScale').min(-3).max(3).onChange(function (newVal) { render() });
    textureSettings.add(textureParameters, 'heightScale').min(0).max(2).onChange(function (newVal) { render() });
}

function updateUniforms() {
    uniforms.clight.value = new THREE.Vector3(
        lightParameters.red * lightParameters.intensity,
        lightParameters.green * lightParameters.intensity,
        lightParameters.blue * lightParameters.intensity
    );

    uniforms.normalScale.value = new THREE.Vector2(textureParameters.normalScale, textureParameters.normalScale);
    uniforms.heightScale.value = textureParameters.heightScale;
}

init();
buildGui();
update();
render();