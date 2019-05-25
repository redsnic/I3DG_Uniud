let globalPokeball;
let globalEnvMap, globalHDRCubeRenderTarget, globalHDRCubeMap;
let globalBackgroundSet = false;
let globalEnvMapLoaded = false;
let globalInitialMaterialSet = false;

let scene, camera, controls, stats, renderer, container, render;
let globalTopMaterial, globalBottomMaterial, globalRingMaterial, globalButtonMaterial;

let ENVMAP_PATH = "res/textures/shared/env_hdr/";
let SHARED_RESOURCES_PATH = "res/textures/shared/";
let STOCK_BALLS_RESOURCES_PATH = "res/textures/stock/";
let OTHERS_RESOURCES_PATH = "res/textures/others/";
let POKEBALL_OBJECT_PATH = "res/models/pokeball.obj";

let LOW_ROUGHNESS_METAL = 0.3;
let HIGH_ROUGHNESS_METAL = 1.5;

let LOW_ROUGHNESS_CERAMIC = 0.01;
let HIGH_ROUGHNESS_CERAMIC = 1.5;


