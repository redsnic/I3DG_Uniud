
let setMaterial = function (material, name) {


    switch (name) {
        case "mio":
            changeMaterial(material,
                new THREE.Vector3(1, 1, 1),
                loadTexture('mio.jpg'),
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'));
            break;
        /* STOCK TEXTURES */
        case "pokeball":
            changeMaterial(material,
                null,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'pokeball/' + 'diffuse.png'),
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                0.2,
                2.2);
            break;
        case "greatball":
            changeMaterial(material,
                null, loadTexture(STOCK_BALLS_RESOURCES_PATH + 'greatball/' + 'diffuse.png'),
                1,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'greatball/' + 'normal.png'),
                0.3,
                1.5);
            break;
        case "ultraball":
            changeMaterial(material,
                null,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'ultraball/' + 'diffuse.png'),
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                0.2,
                2.2);
            break;
        case "fastball":
            changeMaterial(material,
                null,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'fastball/' + 'diffuse.png'),
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                0.3,
                1.5);
            break;
        case "safariball":
            changeMaterial(material,
                null,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'safariball/' + 'diffuse.png'),
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                0.2,
                2.2);
            break;
        case "netball":
            changeMaterial(material,
                null,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'netball/' + 'diffuse.png'),
                0,
                loadTexture(STOCK_BALLS_RESOURCES_PATH + 'netball/' + 'normal.png'),
                0.3,
                2.2);
            break;
        /* METAL */
        case "red_metal":
            changeMaterial(material,
                makeColor(221, 8, 8),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_METAL,
                HIGH_ROUGHNESS_METAL);
            break;
        case "green_metal":
            changeMaterial(material,
                makeColor(16, 160, 6),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_METAL,
                HIGH_ROUGHNESS_METAL);
            break;
        case "blue_metal":
            changeMaterial(material,
                makeColor(3, 95, 165),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_METAL,
                HIGH_ROUGHNESS_METAL);
            break;
        case "gold_metal":
            changeMaterial(material,
                makeColor(212, 175, 55),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_METAL,
                HIGH_ROUGHNESS_METAL);
            break;
        case "copper_metal":
            changeMaterial(material,
                makeColor(184, 115, 103),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_METAL,
                HIGH_ROUGHNESS_METAL);
            break;
        case "black_metal":
            changeMaterial(material,
                makeColor(30, 30, 30),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_METAL,
                HIGH_ROUGHNESS_METAL);
            break;
        /* CERAMIC */
        case "red_ceramic":
            changeMaterial(material,
                makeColor(175, 8, 8),
                null,
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_CERAMIC,
                HIGH_ROUGHNESS_CERAMIC);
            break;
        case "green_ceramic":
            changeMaterial(material,
                makeColor(2, 140, 26),
                null,
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_CERAMIC,
                HIGH_ROUGHNESS_CERAMIC);
            break;
        case "blue_ceramic":
            changeMaterial(material,
                makeColor(3, 118, 165),
                null,
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_CERAMIC,
                HIGH_ROUGHNESS_CERAMIC);
            break;
        case "white_ceramic":
            changeMaterial(material,
                makeColor(255, 255, 255),
                null,
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_CERAMIC,
                HIGH_ROUGHNESS_CERAMIC);
            break;
        case "black_ceramic":
            changeMaterial(material,
                makeColor(0, 0, 0),
                null,
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_CERAMIC,
                HIGH_ROUGHNESS_CERAMIC);
            break;
        case "purple_ceramic":
            changeMaterial(material,
                makeColor(101, 8, 168),
                null,
                0,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                LOW_ROUGHNESS_CERAMIC,
                HIGH_ROUGHNESS_CERAMIC);
            break;
        /* OTHERS */
        case "fabric":
            changeSpecialMaterial(material,
                loadTexture(OTHERS_RESOURCES_PATH + 'fabric/' + 'diffuse.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'fabric/' + 'normal.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'fabric/' + 'roughness.jpg'));
            break;
        case "marble":
            changeSpecialMaterial(material,
                loadTexture(OTHERS_RESOURCES_PATH + 'marble/' + 'diffuse.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'marble/' + 'normal.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'marble/' + 'roughness.jpg'));
            break;
        case "wood":
            changeSpecialMaterial(material,
                loadTexture(OTHERS_RESOURCES_PATH + 'wood/' + 'diffuse.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'wood/' + 'normal.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'wood/' + 'roughness.jpg'));
            break;
        case "tiles":
            changeSpecialMaterial(material,
                loadTexture(OTHERS_RESOURCES_PATH + 'tiles/' + 'diffuse.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'tiles/' + 'normal.jpg'),
                loadTexture(OTHERS_RESOURCES_PATH + 'tiles/' + 'roughness.jpg'));
            break;
        case "rubber":
            changeSpecialMaterial(material,
                loadTexture(OTHERS_RESOURCES_PATH + 'rubber/' + 'diffuse.png'),
                loadTexture(OTHERS_RESOURCES_PATH + 'rubber/' + 'normal.png'),
                null);
            break;
        case "mirror":
            changeMaterial(material,
                makeColor(255, 255, 255),
                null,
                1,
                loadTexture(SHARED_RESOURCES_PATH + 'normal.png'),
                0.01,
                0.5);
            break;
    }

}

let changeMaterial = function (material, color, map, metalness, normalMap, roughLow, roughHi) {
    material.color = color;
    material.map = map; // texture for the color
    material.metalness = metalness;
    material.envMap = globalHDRCubeRenderTarget.texture;
    material.normalMap = normalMap;
    material.roughness = roughLow;
    material.roughnessMap = null;
    material.roughnessHigh = roughHi;
    material.roughnessLow = roughLow;
    material.isSpecialMaterial = false;
    if (material.map) material.map.needsUpdate = true;
    material.needsUpdate = true;
    if (globalWornStatus == true) {
        activateWorn(material);
    } else {
        deactivateWorn(material);
    }
}

let changeSpecialMaterial = function (material, map, normalMap, roughMap) {
    material.color = null;
    material.map = map; // texture for the color
    material.metalness = 0.;
    material.envMap = globalHDRCubeRenderTarget.texture;
    material.normalMap = normalMap;
    material.roughness = 1;
    material.roughnessHigh = 0.;
    material.roughnessLow = 0.;
    material.roughnessMap = roughMap;
    material.isSpecialMaterial = true;
    //if(material.map) material.map.needsUpdate = true;
    material.needsUpdate = true;
}




let activateWorn = function (material) {
    if (material.isSpecialMaterial) return;

    if (material.roughnessMap == null) {
        material.roughnessMap = loadTexture(SHARED_RESOURCES_PATH + 'roughness.png');
        material.roughness = material.roughnessHigh;
    }

    material.needsUpdate = true;
}

let deactivateWorn = function (material) {
    if (material.isSpecialMaterial) return;

    if (material.roughnessMap != null) {
        material.roughnessMap = null;
        material.roughness = material.roughnessLow;
    }

    material.needsUpdate = true;
}

let setAllMaterials = function (name) {
    setMaterial(globalTopMaterial, name);
    setMaterial(globalBottomMaterial, name);
    setMaterial(globalButtonMaterial, name);
    setMaterial(globalRingMaterial, name);
}

let activateWornAll = function () {
    activateWorn(globalTopMaterial);
    activateWorn(globalBottomMaterial);
    activateWorn(globalButtonMaterial);
    activateWorn(globalRingMaterial);
}

let deactivateWornAll = function () {
    deactivateWorn(globalTopMaterial);
    deactivateWorn(globalBottomMaterial);
    deactivateWorn(globalButtonMaterial);
    deactivateWorn(globalRingMaterial);
}

let makeColor = function (R, G, B) {
    return new THREE.Vector3(R / 255.0, G / 255.0, B / 255.0)
}


