let stats;
let scene, camera, renderer;
let cubeGeometry, cubeMaterial, cubeMesh;

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

// creates the two triangles that constitues a face of the cube
function createFaceFromVertices(v0, v1, v2, v3) {
    cubeGeometry.faces.push(new THREE.Face3(v0, v3, v1));
    cubeGeometry.faces.push(new THREE.Face3(v1, v3, v2));
}

function setFacesColors() {
    for ( var i = 0; i < cubeGeometry.faces.length; i +=2 ) {
        col = Math.random() * 0xffffff;
        //the two triangles of the same face must have the same color
        cubeGeometry.faces[i].color.setHex( col );
        cubeGeometry.faces[i+1].color.setHex( col );
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
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    cubeGeometry = new THREE.Geometry();
    materials = [];

    //front face
    cubeGeometry.vertices.push(new THREE.Vector3(-1, -1, 1));
    cubeGeometry.vertices.push(new THREE.Vector3(-1, 1, 1));
    cubeGeometry.vertices.push(new THREE.Vector3(1, 1, 1));
    cubeGeometry.vertices.push(new THREE.Vector3(1, -1, 1));

    //back face
    cubeGeometry.vertices.push(new THREE.Vector3(-1, -1, -1));
    cubeGeometry.vertices.push(new THREE.Vector3(-1, 1, -1));
    cubeGeometry.vertices.push(new THREE.Vector3(1, 1, -1));
    cubeGeometry.vertices.push(new THREE.Vector3(1, -1, -1));

    createFaceFromVertices(0,1,2,3);
    createFaceFromVertices(3,2,6,7);
    createFaceFromVertices(1,5,6,2);
    createFaceFromVertices(4,0,3,7);
    createFaceFromVertices(7,6,5,4);
    createFaceFromVertices(4,5,1,0);
    
    setFacesColors();
    
    cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
    
    cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeMesh);
    camera.position.z = 5;
}

function loop() {
    requestAnimationFrame(loop);
    stats.update();
    renderer.render(scene, camera);
}
