import { Pokeball } from "./Pokeball.js";
import { PokeballComponent } from "./PokeballComponent.js";

let gui;

let pokeballParameters = {
    used: false,
    stockTexture: "pokeball",
    top: null,
    button: null,
    bottom: null,
    ring: null
}

function clearGui() {
    if (gui) gui.destroy();
    gui = new dat.GUI();
    gui.open();
}

function buildGui() {
    clearGui();

    gui.add(pokeballParameters, 'used', false).onChange(
        function () {
            globalWornStatus = pokeballParameters.used; 
            if(globalWornStatus == true){
                activateWornAll();
                globalWornStatus = true;
            }else{
                deactivateWornAll();
                globalWornStatus = false;
            }         
        }
    );

    gui.add(pokeballParameters, 'stockTexture', ["pokeball", "greatball", "ultraball", "fastball", "safariball", "netball"]).onChange(
        function (newVal) {
            setAllMaterials(newVal);
        }
    );

    gui.add(pokeballParameters, 'top', ["red_metal", "green_metal", "blue_metal", "black_metal", "gold_metal", "copper_metal", "red_ceramic", "purple_ceramic", "green_ceramic", "blue_ceramic", "white_ceramic", "black_ceramic","fabric","marble","wood","tiles","rubber","mirror"]).onChange(
        function (newVal) {
            setMaterial(globalTopMaterial, newVal);
        }
    );

    gui.add(pokeballParameters, 'bottom',  ["red_metal", "green_metal", "blue_metal", "black_metal", "gold_metal", "copper_metal", "red_ceramic", "purple_ceramic", "green_ceramic", "blue_ceramic", "white_ceramic", "black_ceramic","fabric","marble","wood","tiles","rubber","mirror"]).onChange(
        function (newVal) {
            setMaterial(globalBottomMaterial, newVal);
        }
    );

    gui.add(pokeballParameters, 'button',  ["red_metal", "green_metal", "blue_metal", "black_metal", "gold_metal", "copper_metal", "red_ceramic", "purple_ceramic", "green_ceramic", "blue_ceramic", "white_ceramic", "black_ceramic","fabric","marble","wood","tiles","rubber","mirror"]).onChange(
        function (newVal) {
            setMaterial(globalButtonMaterial, newVal);
        }
    );

    gui.add(pokeballParameters, 'ring',  ["red_metal", "green_metal", "blue_metal", "black_metal", "gold_metal", "copper_metal", "red_ceramic", "purple_ceramic", "green_ceramic", "blue_ceramic", "white_ceramic", "black_ceramic","fabric","marble","wood","tiles","rubber","mirror"]).onChange(
        function (newVal) {
            setMaterial(globalRingMaterial, newVal);
        }
    );


}

function init() {

    container = document.getElementById("canvas");
    document.getElementById("col").appendChild(container);
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 0, 15);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd0d0d0);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setPixelRatio(1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    window.addEventListener('resize', onWindowResize, false);

    stats = new Stats();
    //container.appendChild(stats.dom);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 7;
	controls.maxDistance = 30;

    loadHDRCubeMap();

    globalPokeball = new Pokeball(POKEBALL_OBJECT_PATH);
    globalPokeball.loadComponents();
    scene.add(globalPokeball._pivot);


}

render = function () {
    requestAnimationFrame(render);
    stats.begin();
    if (globalPokeball.isObjReady() && globalEnvMapLoaded) {
        let renderTarget = globalHDRCubeRenderTarget;
        let cubeMap = globalHDRCubeMap;
        if (!globalBackgroundSet) { /* init bg */
            scene.background = cubeMap;
            globalBackgroundSet = true;
        }
        if (!globalInitialMaterialSet) { /* initial materials */
            globalTopMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, envMap: globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("top", globalTopMaterial);
            globalBottomMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, envMap: globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("bottom", globalBottomMaterial);
            globalRingMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, envMap: globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("ring", globalRingMaterial);
            globalButtonMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, envMap: globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("button", globalButtonMaterial);
            globalInitialMaterialSet = true;
            setAllMaterials("pokeball");

        }
    }
    renderer.render(scene, camera);
    stats.end();
}

function onWindowResize() {
    let width = container.clientWidth;
    let height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

init();
buildGui();
render();


