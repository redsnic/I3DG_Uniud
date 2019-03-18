let stats;
let scene, camera, renderer;
let geom, mat, mesh;

initStats();
init();
loop();

/* manage input for rotation*/
document.addEventListener('keydown', rotateKey);
function rotateKey(e) {
    if(e.code == "ArrowRight"){
        cubeMesh.rotation.y += 0.1;
    }else if(e.code == "ArrowLeft"){
        cubeMesh.rotation.y -= 0.1;
    }else if(e.code == "ArrowDown"){
        cubeMesh.rotation.x -= 0.1;
    }else if(e.code == "ArrowUp"){
        cubeMesh.rotation.x += 0.1;
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
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    geom = new THREE.Geometry();

    //pianta
    geom.vertices.push(new THREE.Vector3(0, 0, -1));
    geom.vertices.push(new THREE.Vector3(1, 0, 0));
    geom.vertices.push(new THREE.Vector3(-1, 0, 0));
    geom.vertices.push(new THREE.Vector3(0, 0, 1));
    
    //punte
    geom.vertices.push(new THREE.Vector3(0, +1, 0));
    geom.vertices.push(new THREE.Vector3(0, -1, 0));
    
    //facce (vertici in ordine antiorario)
    geom.faces.push(new THREE.Face3(4, 2, 3));
    geom.faces.push(new THREE.Face3(4, 3, 1));
    geom.faces.push(new THREE.Face3(4, 1, 0));
    geom.faces.push(new THREE.Face3(4, 0, 2));
    
    geom.faces.push(new THREE.Face3(5, 3, 2));
    geom.faces.push(new THREE.Face3(5, 1, 3));
    geom.faces.push(new THREE.Face3(5, 0, 1));
    geom.faces.push(new THREE.Face3(5, 2, 0));

    material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
    
    cubeMesh = new THREE.Mesh(geom, material);
    scene.add(cubeMesh);
    camera.position.z = 5;
}

function loop() {
    requestAnimationFrame(loop);
    stats.update();
    renderer.render(scene, camera);
}
