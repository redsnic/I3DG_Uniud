'use strict';

let texturingVertexShader = document.getElementById("texturingVertex").textContent;
let texturingFragmentShader = document.getElementById("texturingFragment").textContent;

//let valueVertexShader = document.getElementById("valueVertex").textContent;
//let valueFragmentShader = document.getElementById("valueFragment").textContent;

let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

// creating the mesh for the light source
let lightMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
lightMesh.position.set(7.0, 7.0, 7.0);

// declaring the geometries, materials and meshes for the parts of the ball
let topGeometry, topMaterial, topMesh;
let bottomGeometry, bottomMaterial, bottomMesh;
let ringGeometry, ringMaterial, ringMesh;
let buttonGeometry, buttonMaterial, buttonMesh;

// declaring the structures storing the textures for the materials of the ball
let textureTopMaterial, textureBottomMaterial, textureRingMaterial, textureButtonMaterial;

// declaring the structures storing the values for the materials of the ball
let valueTopMaterial, valueBottomMaterial, valueRingMaterial, valueButtonMaterial;

// declaring the structures storing the uniforms for the texture materials of the parts of the ball
let uniformsTextureTopMaterial, uniformsTextureBottomMaterial, uniformsTextureRingMaterial, uniformsTextureButtonMaterial;

// declaring the structures storing the uniforms for the value materials of the parts of the ball
let uniformsValueTopMaterial, uniformsValueBottomMaterial, uniformsValueRingMaterial, uniformsValueButtonMaterial;

// structure with the initial textures
let textures = {
    top: "Pokeball",
    bottom: "Pokeball",
    ring: "Pokeball",
    button: "Pokeball",
}


initializeTextureMaterials();
initializeValueMaterials();

setTexture("Pokeball", "Top");
setTexture("Pokeball", "Bottom");
setTexture("Pokeball", "Ring");
setTexture("Pokeball", "Button");

// default: white, 1.0 intensity
let lightParameters = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    intensity: 1.0
}

initializeTextureUniforms();
initializeValueUniforms();

topMaterial = new THREE.ShaderMaterial({ uniforms: uniformsTextureTopMaterial, vertexShader: texturingVertexShader, fragmentShader: texturingFragmentShader });
bottomMaterial = new THREE.ShaderMaterial({ uniforms: uniformsTextureBottomMaterial, vertexShader: texturingVertexShader, fragmentShader: texturingFragmentShader });
ringMaterial = new THREE.ShaderMaterial({ uniforms: uniformsTextureRingMaterial, vertexShader: texturingVertexShader, fragmentShader: texturingFragmentShader });
buttonMaterial = new THREE.ShaderMaterial({ uniforms: uniformsTextureButtonMaterial, vertexShader: texturingVertexShader, fragmentShader: texturingFragmentShader });

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

let stats = new Stats();
let gui;

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

function loadTexture(file) {
    let texture = new THREE.TextureLoader().load(file, function (texture) {
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
    let lightSettings = gui.addFolder('Light Parameters');
    lightSettings.add(lightParameters, 'red').min(0).max(1).onChange(function (newVal) { render() });
    lightSettings.add(lightParameters, 'green').min(0).max(1).onChange(function (newVal) { render() });
    lightSettings.add(lightParameters, 'blue').min(0).max(1).onChange(function (newVal) { render() });
    lightSettings.add(lightParameters, 'intensity').min(0).max(10).onChange(function (newVal) { render() });

    let textureSettings = gui.addFolder('Texture parameters');
    textureSettings.add(textures, 'top', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Top");
            topMaterial.needsUpdate = true;
            render()
        });
    textureSettings.add(textures, 'bottom', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Bottom");
            bottomMaterial.needsUpdate = true;
            render()
        });
    textureSettings.add(textures, 'ring', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Ring");
            bottomMaterial.needsUpdate = true;
            render()
        });
    textureSettings.add(textures, 'button', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Button");
            bottomMaterial.needsUpdate = true;
            render()
        });
}

function initializeTextureMaterials() {
    textureTopMaterial = {
        diffuse: loadTexture("texture/poke/pokeball_diffuse.png"),
        specular: loadTexture("texture/poke/pokeball_spec.png"),
        normal: loadTexture("texture/poke/pokeball_normal.png"),
        roug: loadTexture("texture/poke/pokeball_roug.png"),
    }

    textureBottomMaterial = {
        diffuse: loadTexture("texture/poke/pokeball_diffuse.png"),
        specular: loadTexture("texture/poke/pokeball_spec.png"),
        normal: loadTexture("texture/poke/pokeball_normal.png"),
        roug: loadTexture("texture/poke/pokeball_roug.png"),
    }

    textureRingMaterial = {
        diffuse: loadTexture("texture/poke/pokeball_diffuse.png"),
        specular: loadTexture("texture/poke/pokeball_spec.png"),
        normal: loadTexture("texture/poke/pokeball_normal.png"),
        roug: loadTexture("texture/poke/pokeball_roug.png"),
    }

    textureButtonMaterial = {
        diffuse: loadTexture("texture/poke/pokeball_diffuse.png"),
        specular: loadTexture("texture/poke/pokeball_spec.png"),
        normal: loadTexture("texture/poke/pokeball_normal.png"),
        roug: loadTexture("texture/poke/pokeball_roug.png"),
    }
}

function initializeValueMaterials() {
    valueTopMaterial = {
        diffuse: new THREE.Vector3(0.0, 0.0, 0.0),
        specular: new THREE.Vector3(0.9, 0.8, 0.7),
        roug: 0.2,
    }

    valueBottomMaterial = {
        diffuse: new THREE.Vector3(0.0, 0.0, 0.0),
        specular: new THREE.Vector3(0.9, 0.8, 0.7),
        roug: 0.2,
    }

    valueRingMaterial = {
        diffuse: new THREE.Vector3(0.0, 0.0, 0.0),
        specular: new THREE.Vector3(0.9, 0.8, 0.7),
        roug: 0.2,
    }

    valueButtonMaterial = {
        diffuse: new THREE.Vector3(0.0, 0.0, 0.0),
        specular: new THREE.Vector3(0.9, 0.8, 0.7),
        roug: 0.2,
    }
}

function setTexture(textureType, part) {
    switch (textureType) {
        case "Pokeball":
            switch (part) {
                case "Top":
                    //set textureTopMaterial to pokeball
                    textureTopMaterial.diffuse = loadTexture("texture/poke/pokeball_diffuse.png");
                    textureTopMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureTopMaterial.normal = loadTexture("texture/poke/pokeball_normal.png");
                    textureTopMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Bottom":
                    //set textureBottomMaterial to pokeball
                    textureBottomMaterial.diffuse = loadTexture("texture/poke/pokeball_diffuse.png");
                    textureBottomMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureBottomMaterial.normal = loadTexture("texture/poke/pokeball_normal.png");
                    textureBottomMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Ring":
                    //set textureRingMaterial to pokeball
                    textureRingMaterial.diffuse = loadTexture("texture/poke/pokeball_diffuse.png");
                    textureRingMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureRingMaterial.normal = loadTexture("texture/poke/pokeball_normal.png");
                    textureRingMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Button":
                    //set textureButtonMaterial to pokeball
                    textureButtonMaterial.diffuse = loadTexture("texture/poke/pokeball_diffuse.png");
                    textureButtonMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureButtonMaterial.normal = loadTexture("texture/poke/pokeball_normal.png");
                    textureButtonMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
            }
            break;
        case "Masterball":
            switch (part) {
                case "Top":
                    //set textureTopMaterial to masterball
                    textureTopMaterial.diffuse = loadTexture("texture/master/master_diffuse.png");
                    textureTopMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureTopMaterial.normal = loadTexture("texture/master/master_normal.png");
                    textureTopMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Bottom":
                    //set textureBottomMaterial to masterball
                    textureBottomMaterial.diffuse = loadTexture("texture/master/master_diffuse.png");
                    textureBottomMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureBottomMaterial.normal = loadTexture("texture/master/master_normal.png");
                    textureBottomMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Ring":
                    //set textureRingMaterial to masterball
                    textureRingMaterial.diffuse = loadTexture("texture/master/master_diffuse.png");
                    textureRingMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureRingMaterial.normal = loadTexture("texture/master/master_normal.png");
                    textureRingMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Button":
                    //set textureButtonMaterial to masterball
                    textureButtonMaterial.diffuse = loadTexture("texture/master/master_diffuse.png");
                    textureButtonMaterial.specular = loadTexture("texture/poke/pokeball_spec.png");
                    textureButtonMaterial.normal = loadTexture("texture/master/master_normal.png");
                    textureButtonMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
            }
            break;
        case "Blue":
            switch (part) {
                case "Top":
                    //set textureTopMaterial to metal
                    textureTopMaterial.diffuse = loadTexture("texture/steel/CorrugatedSteel01_col.jpg");
                    textureTopMaterial.specular = loadTexture("texture/steel/CorrugatedSteel01_met.jpg");
                    textureTopMaterial.normal = loadTexture("texture/steel/CorrugatedSteel01_nrm.jpg");
                    textureTopMaterial.roug = loadTexture("texture/steel/CorrugatedSteel01_rgh.jpg");
                    break;
                case "Bottom":
                    //set textureBottomMaterial to metal
                    textureBottomMaterial.diffuse = loadTexture("texture/steel/CorrugatedSteel01_col.jpg");
                    textureBottomMaterial.specular = loadTexture("texture/steel/CorrugatedSteel01_met.jpg");
                    textureBottomMaterial.normal = loadTexture("texture/steel/CorrugatedSteel01_nrm.jpg");
                    textureBottomMaterial.roug = loadTexture("texture/steel/CorrugatedSteel01_rgh.jpg");
                    break;
                case "Ring":
                    //set textureRingMaterial to metal
                    textureRingMaterial.diffuse = loadTexture("texture/steel/CorrugatedSteel01_col.jpg");
                    textureRingMaterial.specular = loadTexture("texture/steel/CorrugatedSteel01_met.jpg");
                    textureRingMaterial.normal = loadTexture("texture/steel/CorrugatedSteel01_nrm.jpg");
                    textureRingMaterial.roug = loadTexture("texture/steel/CorrugatedSteel01_rgh.jpg");
                    break;
                case "Button":
                    //set textureButtonMaterial to metal
                    textureButtonMaterial.diffuse = loadTexture("texture/steel/CorrugatedSteel01_col.jpg");
                    textureButtonMaterial.specular = loadTexture("texture/steel/CorrugatedSteel01_met.jpg");
                    textureButtonMaterial.normal = loadTexture("texture/steel/CorrugatedSteel01_nrm.jpg");
                    textureButtonMaterial.roug = loadTexture("texture/steel/CorrugatedSteel01_rgh.jpg");
                    break;
            }
            break;
        case "Rubber":
            switch (part) {
                case "Top":
                    //set textureTopMaterial to plastic
                    textureTopMaterial.diffuse = loadTexture("texture/plastic/diffuse.png");
                    textureTopMaterial.specular = loadTexture("texture/plastic/spec.png");
                    textureTopMaterial.normal = loadTexture("texture/plastic/normal.png");
                    textureTopMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Bottom":
                    //set textureBottomMaterial to plastic
                    textureBottomMaterial.diffuse = loadTexture("texture/plastic/diffuse.png");
                    textureBottomMaterial.specular = loadTexture("texture/plastic/spec.png");
                    textureBottomMaterial.normal = loadTexture("texture/plastic/normal.png");
                    textureBottomMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Ring":
                    //set textureRingMaterial to plastic
                    textureRingMaterial.diffuse = loadTexture("texture/plastic/diffuse.png");
                    textureRingMaterial.specular = loadTexture("texture/plastic/spec.png");
                    textureRingMaterial.normal = loadTexture("texture/plastic/normal.png");
                    textureRingMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
                case "Button":
                    //set textureButtonMaterial to plastic
                    textureButtonMaterial.diffuse = loadTexture("texture/plastic/diffuse.png");
                    textureButtonMaterial.specular = loadTexture("texture/plastic/spec.png");
                    textureButtonMaterial.normal = loadTexture("texture/plastic/normal.png");
                    textureButtonMaterial.roug = loadTexture("texture/poke/pokeball_roug.png");
                    break;
            }
            break;
    }
}

function updateUniforms() {

    uniformsTextureTopMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
    uniformsTextureTopMaterial.clight.value = new THREE.Vector3(lightParameters.intensity * lightParameters.red,
        lightParameters.intensity * lightParameters.green,
        lightParameters.intensity * lightParameters.blue);
    uniformsTextureTopMaterial.diffuseMap.value = textureTopMaterial.diffuse;
    uniformsTextureTopMaterial.specularMap.value = textureTopMaterial.specular;
    uniformsTextureTopMaterial.rougMap.value = textureTopMaterial.roug;
    uniformsTextureTopMaterial.normalMap.value = textureTopMaterial.normal;

    uniformsTextureBottomMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
    uniformsTextureBottomMaterial.clight.value = new THREE.Vector3(lightParameters.intensity * lightParameters.red,
        lightParameters.intensity * lightParameters.green,
        lightParameters.intensity * lightParameters.blue);
    uniformsTextureBottomMaterial.diffuseMap.value = textureBottomMaterial.diffuse;
    uniformsTextureBottomMaterial.specularMap.value = textureBottomMaterial.specular;
    uniformsTextureBottomMaterial.rougMap.value = textureBottomMaterial.roug;
    uniformsTextureBottomMaterial.normalMap.value = textureBottomMaterial.normal;

    uniformsTextureRingMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
    uniformsTextureRingMaterial.clight.value = new THREE.Vector3(lightParameters.intensity * lightParameters.red,
        lightParameters.intensity * lightParameters.green,
        lightParameters.intensity * lightParameters.blue);
    uniformsTextureRingMaterial.diffuseMap.value = textureRingMaterial.diffuse;
    uniformsTextureRingMaterial.specularMap.value = textureRingMaterial.specular;
    uniformsTextureRingMaterial.rougMap.value = textureRingMaterial.roug;
    uniformsTextureRingMaterial.normalMap.value = textureRingMaterial.normal;

    uniformsTextureButtonMaterial.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);
    uniformsTextureButtonMaterial.clight.value = new THREE.Vector3(lightParameters.intensity * lightParameters.red,
        lightParameters.intensity * lightParameters.green,
        lightParameters.intensity * lightParameters.blue);
    uniformsTextureButtonMaterial.diffuseMap.value = textureButtonMaterial.diffuse;
    uniformsTextureButtonMaterial.specularMap.value = textureButtonMaterial.specular;
    uniformsTextureButtonMaterial.rougMap.value = textureButtonMaterial.roug;
    uniformsTextureButtonMaterial.normalMap.value = textureButtonMaterial.normal;
}

function initializeTextureUniforms() {
    uniformsTextureTopMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuseMap: { type: "t", value: textureTopMaterial.diffuse },
        specularMap: { type: "t", value: textureTopMaterial.specular },
        rougMap: { type: "t", value: textureTopMaterial.roug },
        normalMap: { type: "t", value: textureTopMaterial.normal },
    }

    uniformsTextureBottomMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuseMap: { type: "t", value: textureBottomMaterial.diffuse },
        specularMap: { type: "t", value: textureBottomMaterial.specular },
        rougMap: { type: "t", value: textureBottomMaterial.roug },
        normalMap: { type: "t", value: textureBottomMaterial.normal },
    }

    uniformsTextureRingMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuseMap: { type: "t", value: textureRingMaterial.diffuse },
        specularMap: { type: "t", value: textureRingMaterial.specular },
        rougMap: { type: "t", value: textureRingMaterial.roug },
        normalMap: { type: "t", value: textureRingMaterial.normal },
    }

    uniformsTextureButtonMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuseMap: { type: "t", value: textureButtonMaterial.diffuse },
        specularMap: { type: "t", value: textureButtonMaterial.specular },
        rougMap: { type: "t", value: textureButtonMaterial.roug },
        normalMap: { type: "t", value: textureButtonMaterial.normal },
    }
}

function initializeValueUniforms() {
    uniformsValueTopMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuse: { type: "v3", value: new THREE.Vector3(valueTopMaterial.diffuse.x, valueTopMaterial.diffuse.y, valueTopMaterial.diffuse.z) },
        specular: { type: "v3", value: new THREE.Vector3(valueTopMaterial.specular.x, valueTopMaterial.specular.y, valueTopMaterial.specular.z) },
        roug: { type: "f", value: valueTopMaterial.roug },
    }

    uniformsValueBottomMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuse: { type: "v3", value: new THREE.Vector3(valueBottomMaterial.diffuse.x, valueBottomMaterial.diffuse.y, valueBottomMaterial.diffuse.z) },
        specular: { type: "v3", value: new THREE.Vector3(valueBottomMaterial.specular.x, valueBottomMaterial.specular.y, valueBottomMaterial.specular.z) },
        roug: { type: "f", value: valueBottomMaterial.roug },
    }

    uniformsValueRingMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuse: { type: "v3", value: new THREE.Vector3(valueRingMaterial.diffuse.x, valueRingMaterial.diffuse.y, valueRingMaterial.diffuse.z) },
        specular: { type: "v3", value: new THREE.Vector3(valueRingMaterial.specular.x, valueRingMaterial.specular.y, valueRingMaterial.specular.z) },
        roug: { type: "f", value: valueRingMaterial.roug },
    }

    uniformsValueButtonMaterial = {
        pointLightPosition: { type: "v3", value: new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z) },
        clight: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) },
        diffuse: { type: "v3", value: new THREE.Vector3(valueButtonMaterial.diffuse.x, valueButtonMaterial.diffuse.y, valueButtonMaterial.diffuse.z) },
        specular: { type: "v3", value: new THREE.Vector3(valueButtonMaterial.specular.x, valueButtonMaterial.specular.y, valueButtonMaterial.specular.z) },
        roug: { type: "f", value: valueButtonMaterial.roug },
    }
}

init();
buildGui();
update();