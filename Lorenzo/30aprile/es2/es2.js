
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
    material: "Wood_StaggeredFloorPlanks",
    repeatS: 1.0,
    repeatT: 1.0,
}

var diffuseMap = loadTexture("../../textures/" + textureParameters.material + "_Diffuse.png");
var specularMap = loadTexture("../../textures/" + textureParameters.material + "_Specular.png");
var roughnessMap = loadTexture("../../textures/" + textureParameters.material + "_Roughness.png");
var normalMap = loadTexture("../../textures/" + textureParameters.material + "_Normal.png");

var uniforms = {
    specularMap: { type: "t", value: specularMap },
    diffuseMap: { type: "t", value: diffuseMap },
    roughnessMap: { type: "t", value: roughnessMap },
    normalMap: { type: "t", value: normalMap },
    pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
    textureRepeat: { type: "v2", value: new THREE.Vector2(1, 1) }
};

vs = document.getElementById("vertex").textContent;
fs = document.getElementById("fragment").textContent;

var ourMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
geometry = new THREE.SphereBufferGeometry(2, 64, 64);
var mesh = new THREE.Mesh(geometry, ourMaterial);

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

    camera.position.set(0, 10, 10);
    scene.add(camera);

    scene.add(mesh);
    scene.add(lightMesh);

    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.addEventListener('change', render);
    controls.minDistance = 1;
    controls.maxDistance = 100;
    //controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.target.copy(mesh.position);
    controls.update();

    window.addEventListener('resize', onResize, false);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    ourMaterial.needsUpdate = true;

}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

}

function update() {
    requestAnimationFrame(update);
    stats.update();
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
    lightSettings.add(lightParameters, 'intensity').min(0).max(10).onChange(function (newVal) { render() });

    textureSettings = gui.addFolder('Texture parameters');
    textureSettings.add(textureParameters, 'material', ['Wood_StaggeredFloorPlanks', 'Misc_SolarPanelLarge', 'Concrete_RockyFoundation',
        'Metal_ThickGrating']).onChange(
            function (newVal) {
                diffuseMap = loadTexture("../../textures/" + newVal + "_Diffuse.png");
                specularMap = loadTexture("../../textures/" + newVal + "_Specular.png");
                roughnessMap = loadTexture("../../textures/" + newVal + "_Roughness.png");
                normalMap = loadTexture("../../textures/" + newVal + "_Normal.png");
                ourMaterial.needsUpdate = true;
                render()
            });
    textureSettings.add(textureParameters, 'repeatS').min(0.1).max(10).onChange(function (newVal) { render() });
    textureSettings.add(textureParameters, 'repeatT').min(0.1).max(10).onChange(function (newVal) { render() });
}

function updateUniforms() {

    uniforms.clight.value = new THREE.Vector3(
        lightParameters.red * lightParameters.intensity,
        lightParameters.green * lightParameters.intensity,
        lightParameters.blue * lightParameters.intensity);
    uniforms.textureRepeat.value = new THREE.Vector2(textureParameters.repeatS, textureParameters.repeatT);
    uniforms.diffuseMap.value = diffuseMap;
    uniforms.specularMap.value = specularMap;
    uniforms.roughnessMap.value = roughnessMap;
    uniforms.normalMap.value = normalMap;
}

init();
buildGui();
update();
render(); 
