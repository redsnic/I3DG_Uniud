let stats;
let scene, camera, renderer;
let flower;
let stemGeometry, stemMaterial, stem;
let stamenGeometry, stamenMaterial, stamen;
let petalGeometry, petalMaterial;

let stemHeight = 3;
let stemRadius = 0.1;

let stamenRadius = 0.3;

let petalRadius = 0.2;
let petalLength = 1.2;

let numberPetals = 12;

initStats();
init();
loop();

/* manage input for rotation*/
document.addEventListener('keydown', manageKeys);
function manageKeys(e) {
    if(e.code == "ArrowRight"){
        flower.rotation.y += 0.1;
    }else if(e.code == "ArrowLeft"){
        flower.rotation.y -= 0.1;
    }else if(e.code == "ArrowDown"){
        flower.rotation.x -= 0.1;
    }else if(e.code == "ArrowUp"){
        flower.rotation.x += 0.1;
    }
}

function initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( window.innerWidth / - 300, window.innerWidth / 300, window.innerHeight / 300, window.innerHeight / -300, - 300, 1000); 
    //camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // creo l'oggetto fiori a cui aggiungo le componenti
    flower = new THREE.Object3D();
    scene.add(flower);

    stemGeometry = new THREE.CylinderGeometry(stemRadius, stemRadius, stemHeight, 16);
    stemMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff33, wireframe: true} );
    stem = new THREE.Mesh( stemGeometry, stemMaterial );
    stem.position.set(0,0,0);
    flower.add(stem);

    stamenGeometry = new THREE.SphereGeometry(stamenRadius, 16, 16);
    stamenMaterial = new THREE.MeshBasicMaterial( {color: 0x334433, wireframe: true} );
    stamen = new THREE.Mesh( stamenGeometry, stamenMaterial );
    stamen.position.set(0, stemHeight/2.0, 0);
    flower.add(stamen);

    petalGeometry = new THREE.CylinderGeometry(0 ,petalRadius, petalLength, 16);
    petalMaterial = new THREE.MeshBasicMaterial( {color: 0xff0055, wireframe: true} );
    for (i=0; i<numberPetals; i++){
        let petal = new THREE.Mesh( petalGeometry, petalMaterial );
        petal.rotation.order = "ZYX";
        petal.rotation.x = Math.PI/2;
        let angle = Math.PI/(numberPetals/2) * i;
        petal.rotation.y = angle;
        petal.position.set( -(petalLength/2 + stamenRadius) * Math.sin(angle) , stemHeight/2, -(petalLength/2 + stamenRadius) * Math.cos(angle));
        flower.add(petal);
    }

    camera.position.z = 4;
}

function loop() {
    requestAnimationFrame(loop);
    stats.update();
    renderer.render(scene, camera);
}