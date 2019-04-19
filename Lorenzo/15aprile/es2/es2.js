let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

let lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.5,
}
let cdiff = {
    red: 0.7,
    green: 0.0,
    blue: 0.0,
}

// using 4 light sources, the color and intensity of the lights is the same
let uniforms = {
    cdiff: { type: "v3", value: new THREE.Vector3() },
    pointLightPosition1: { type: "v3", value: new THREE.Vector3() },
    pointLightPosition2: { type: "v3", value: new THREE.Vector3() },
    pointLightPosition3: { type: "v3", value: new THREE.Vector3() },
    pointLightPosition4: { type: "v3", value: new THREE.Vector3() },
    clight: { type: "v3", value: new THREE.Vector3() },
};

vs = document.getElementById("vertex").textContent;
fs = document.getElementById("fragment").textContent;

ourMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
geometry = new THREE.TorusKnotGeometry(2, 0.5, 200, 32);
let mesh = new THREE.Mesh(geometry, ourMaterial);

let lightMeshes = [];
for (i=1; i<=4; i++) {
    let lightMesh = new THREE.Mesh( new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }) );
    lightMeshes.push(lightMesh);
}
lightMeshes[0].position.set(0.0, 0.0, 5.0);
lightMeshes[1].position.set(0.0, 0.0, -5.0);
lightMeshes[2].position.set(-5.0, 0.0, 0.0);
lightMeshes[3].position.set(0.0, 5.0, 0.0);

uniforms.pointLightPosition1.value = new THREE.Vector3(lightMeshes[0].position.x, lightMeshes[0].position.y, lightMeshes[0].position.z );
uniforms.pointLightPosition2.value = new THREE.Vector3(lightMeshes[1].position.x, lightMeshes[1].position.y, lightMeshes[1].position.z );
uniforms.pointLightPosition3.value = new THREE.Vector3(lightMeshes[2].position.x, lightMeshes[2].position.y, lightMeshes[2].position.z );
uniforms.pointLightPosition4.value = new THREE.Vector3(lightMeshes[3].position.x, lightMeshes[3].position.y, lightMeshes[3].position.z );

let gui;
let stats = new Stats();

function init() {

    renderer.setClearColor(0xf0f0f0);

    camera.position.set(0, 10, 10);
    scene.add(camera);

    scene.add(mesh);
    for (i=0; i<lightMeshes.length; i++) {
        scene.add( lightMeshes[i] );
    }

    document.body.appendChild(renderer.domElement);
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.addEventListener('change', render);
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false;
    controls.target.copy(mesh.position);
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

    cdiffSettings = gui.addFolder('cdiff');
    cdiffSettings.add(cdiff, 'red').min(0).max(1).onChange(function (newVal) { render() });
    cdiffSettings.add(cdiff, 'green').min(0).max(1).onChange(function (newVal) { render() });
    cdiffSettings.add(cdiff, 'blue').min(0).max(1).onChange(function (newVal) { render() });

}

function updateUniforms() {

    uniforms.cdiff.value = new THREE.Vector3(cdiff.red, cdiff.green, cdiff.blue);
    uniforms.clight.value = new THREE.Vector3(
        lightParameters.red * lightParameters.intensity,
        lightParameters.green * lightParameters.intensity,
        lightParameters.blue * lightParameters.intensity
    );
}

init();
buildGui();
update();
render();
