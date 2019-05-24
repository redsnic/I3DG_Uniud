import { Pokeball } from "./Pokeball.js";
import { PokeballComponent } from "./PokeballComponent.js";

let globalTopMaterial, globalBottomMaterial, globalRingMaterial, globalButtonMaterial;


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 120);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd0d0d0);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    window.addEventListener('resize', onWindowResize, false);

    stats = new Stats();
    container.appendChild(stats.dom);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    loadHDRCubeMap();

    globalPokeball = new Pokeball("res/models/pokeball.obj");
    globalPokeball.loadComponents();
    scene.add(globalPokeball._pivot);


}

function render() {
    requestAnimationFrame(render);
    stats.begin();
    if (globalPokeball.isObjReady() && globalEnvMapLoaded) {
        let renderTarget = globalHDRCubeRenderTarget;
        let cubeMap = globalHDRCubeMap;
        if(!globalBackgroundSet){ /* init bg */
            scene.background = cubeMap;
            globalBackgroundSet = true;
        }
        if(!globalInitialMaterialSet){ /* initial materials */
            globalTopMaterial    = new THREE.MeshStandardMaterial({color:0xff0000, envMap : globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("top", globalTopMaterial);
            globalBottomMaterial = new THREE.MeshStandardMaterial({color:0x0000ff, envMap : globalHDRCubeRenderTarget.texture }); 
            globalPokeball.applyMaterialToPart("bottom", globalBottomMaterial);
            globalRingMaterial   = new THREE.MeshStandardMaterial({color:0x000000, envMap : globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("ring", globalRingMaterial);
            globalButtonMaterial = new THREE.MeshStandardMaterial({color:0x00ff00, envMap : globalHDRCubeRenderTarget.texture });
            globalPokeball.applyMaterialToPart("button", globalButtonMaterial);
            globalInitialMaterialSet = true;
            setMaterial(globalTopMaterial, "test");
            setMaterial(globalBottomMaterial, "test");
        }
        

    }
    renderer.render(scene, camera);
    stats.end();
}

function onWindowResize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

init();
render();


