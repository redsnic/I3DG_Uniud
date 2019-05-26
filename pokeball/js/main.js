import { Pokeball } from "./Pokeball.js";
import { PokeballComponent } from "./PokeballComponent.js";

function init() {

    container = document.getElementById("canvas");
    document.getElementById("col").appendChild(container);
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 0, 15);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setPixelRatio(1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    window.addEventListener('resize', onWindowResize, false);

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
}

function onWindowResize() {
    let width = container.clientWidth;
    let height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

init();
render();

// the section below manages the input from the html elements in the html page

/* ball preset selection */
document.getElementById("pokeball").addEventListener("click", function () { setAllMaterials("pokeball"); });
document.getElementById("greatball").addEventListener("click", function () { setAllMaterials("greatball"); });
document.getElementById("ultraball").addEventListener("click", function () { setAllMaterials("ultraball"); });
document.getElementById("fastball").addEventListener("click", function () { setAllMaterials("fastball"); });
document.getElementById("safariball").addEventListener("click", function () { setAllMaterials("safariball"); });
document.getElementById("netball").addEventListener("click", function () { setAllMaterials("netball"); });

/* used-new manager */
document.getElementById("used-button").addEventListener("click", function () {
    document.getElementById("used-button").classList.add('btn-primary');
    document.getElementById("used-button").classList.remove('btn-secondary');
    document.getElementById("new-button").classList.add('btn-secondary');
    document.getElementById("new-button").classList.remove('btn-primary');
    activateWornAll(); globalWornStatus = true;
});
document.getElementById("new-button").addEventListener("click", function () {
    document.getElementById("new-button").classList.add('btn-primary');
    document.getElementById("new-button").classList.remove('btn-secondary');
    document.getElementById("used-button").classList.add('btn-secondary');
    document.getElementById("used-button").classList.remove('btn-primary');
    deactivateWornAll(); globalWornStatus = false;
});

/* part button manager */
let selectedPart = "top";
document.getElementById("top-button").addEventListener("click", function () {
    document.getElementById("top-button").classList.add('btn-primary');
    document.getElementById("top-button").classList.remove('btn-secondary');
    document.getElementById("bottom-button").classList.add('btn-secondary');
    document.getElementById("bottom-button").classList.remove('btn-primary');
    document.getElementById("ring-button").classList.add('btn-secondary');
    document.getElementById("ring-button").classList.remove('btn-primary');
    document.getElementById("button-button").classList.add('btn-secondary');
    document.getElementById("button-button").classList.remove('btn-primary');
    selectedPart = "top"
});
document.getElementById("bottom-button").addEventListener("click", function () {
    document.getElementById("bottom-button").classList.add('btn-primary');
    document.getElementById("bottom-button").classList.remove('btn-secondary');
    document.getElementById("top-button").classList.add('btn-secondary');
    document.getElementById("top-button").classList.remove('btn-primary');
    document.getElementById("ring-button").classList.add('btn-secondary');
    document.getElementById("ring-button").classList.remove('btn-primary');
    document.getElementById("button-button").classList.add('btn-secondary');
    document.getElementById("button-button").classList.remove('btn-primary');
    selectedPart = "bottom"
});
document.getElementById("ring-button").addEventListener("click", function () {
    document.getElementById("ring-button").classList.add('btn-primary');
    document.getElementById("ring-button").classList.remove('btn-secondary');
    document.getElementById("top-button").classList.add('btn-secondary');
    document.getElementById("top-button").classList.remove('btn-primary');
    document.getElementById("bottom-button").classList.add('btn-secondary');
    document.getElementById("bottom-button").classList.remove('btn-primary');
    document.getElementById("button-button").classList.add('btn-secondary');
    document.getElementById("button-button").classList.remove('btn-primary');
    selectedPart = "ring"
});
document.getElementById("button-button").addEventListener("click", function () {
    document.getElementById("button-button").classList.add('btn-primary');
    document.getElementById("button-button").classList.remove('btn-secondary');
    document.getElementById("top-button").classList.add('btn-secondary');
    document.getElementById("top-button").classList.remove('btn-primary');
    document.getElementById("bottom-button").classList.add('btn-secondary');
    document.getElementById("bottom-button").classList.remove('btn-primary');
    document.getElementById("ring-button").classList.add('btn-secondary');
    document.getElementById("ring-button").classList.remove('btn-primary');
    selectedPart = "button"
});

// returns the material corresponding to the currently selected part of the ball
let getPart = function () {
    switch (selectedPart) {
        case "top": return globalTopMaterial; break;
        case "bottom": return globalBottomMaterial; break;
        case "ring": return globalRingMaterial; break;
        case "button": return globalButtonMaterial; break;
        default : console.log("error in getPart()"); break;
    } 
} 

/* metals */
document.getElementById("red_metal").addEventListener("click", function () { setMaterial(getPart(), "red_metal"); });
document.getElementById("green_metal").addEventListener("click", function () { setMaterial(getPart(), "green_metal"); });
document.getElementById("blue_metal").addEventListener("click", function () { setMaterial(getPart(), "blue_metal"); });
document.getElementById("black_metal").addEventListener("click", function () { setMaterial(getPart(), "black_metal"); });
document.getElementById("gold_metal").addEventListener("click", function () { setMaterial(getPart(), "gold_metal");});
document.getElementById("copper_metal").addEventListener("click", function () { setMaterial(getPart(), "copper_metal"); });

/* ceramics */
document.getElementById("red_ceramic").addEventListener("click", function () { setMaterial(getPart(), "red_ceramic"); });
document.getElementById("green_ceramic").addEventListener("click", function () { setMaterial(getPart(), "green_ceramic"); });
document.getElementById("blue_ceramic").addEventListener("click", function () { setMaterial(getPart(), "blue_ceramic"); });
document.getElementById("purple_ceramic").addEventListener("click", function () { setMaterial(getPart(), "purple_ceramic"); });
document.getElementById("white_ceramic").addEventListener("click", function () { setMaterial(getPart(), "white_ceramic");});
document.getElementById("black_ceramic").addEventListener("click", function () { setMaterial(getPart(), "black_ceramic"); });

/* specials */
document.getElementById("fabric").addEventListener("click", function () { setMaterial(getPart(), "fabric"); });
document.getElementById("marble").addEventListener("click", function () { setMaterial(getPart(), "marble"); });
document.getElementById("wood").addEventListener("click", function () { setMaterial(getPart(), "wood"); });
document.getElementById("tiles").addEventListener("click", function () { setMaterial(getPart(), "tiles"); });
document.getElementById("rubber").addEventListener("click", function () { setMaterial(getPart(), "rubber");});
document.getElementById("mirror").addEventListener("click", function () { setMaterial(getPart(), "mirror"); });