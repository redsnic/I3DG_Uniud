let stats;
let scene, camera, renderer;
let geom, material, mesh;

initStats();
init();
loop();

/* manage input for rotation*/
document.addEventListener('keydown', manageKeys);
function manageKeys(e) {
    if(e.code == "ArrowRight"){
        mesh.rotation.y += 0.1;
    }else if(e.code == "ArrowLeft"){
        mesh.rotation.y -= 0.1;
    }else if(e.code == "ArrowDown"){
        mesh.rotation.x -= 0.1;
    }else if(e.code == "ArrowUp"){
        mesh.rotation.x += 0.1;
    }else if(e.code == "Enter"){
        enhance();
    }
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

// fornisce un nuovo punto intermedio ad A e B
function getPointInBetween(pointA, pointB) {
    var dir = pointB.clone().sub(pointA);
    var len = dir.length();
    dir = dir.normalize().multiplyScalar(len*0.5);
    return pointA.clone().add(dir);
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
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

    //pianta
    geom.vertices.push(new THREE.Vector3(0, 0, -1));
    geom.vertices.push(new THREE.Vector3(1, 0, 0));
    geom.vertices.push(new THREE.Vector3(-1, 0, 0));
    geom.vertices.push(new THREE.Vector3(0, 0, 1));
    
    //punte
    geom.vertices.push(new THREE.Vector3(0, +1, 0));
    geom.vertices.push(new THREE.Vector3(0, -1, 0));
    
    //facce
    geom.faces.push(new THREE.Face3(4, 2, 3));
    geom.faces.push(new THREE.Face3(4, 3, 1));
    geom.faces.push(new THREE.Face3(4, 1, 0));
    geom.faces.push(new THREE.Face3(4, 0, 2));
    
    geom.faces.push(new THREE.Face3(5, 3, 2));
    geom.faces.push(new THREE.Face3(5, 1, 3));
    geom.faces.push(new THREE.Face3(5, 0, 1));
    geom.faces.push(new THREE.Face3(5, 2, 0));
    
    mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);
    camera.position.z = 5;

}

function loop() {
    requestAnimationFrame(loop);
    stats.update();
    renderer.render(scene, camera);
}

function enhance() {

    // salvo le informazione sulla rotazione per ripristinarla
    currentMeshXRotation = mesh.rotation.x;
    currentMeshYRotation = mesh.rotation.y;

    //rimuovo la mesh per ricrearla e riaggiungerla
    scene.remove(mesh);

    // creo le strutture per la nuova geometria (che comporra' la nuova mesh)
    newFaces = [];
    newVertices = [];
    // mantengo i vertici precedenti
    geom.vertices.forEach(function(element) {
        newVertices.push(element);
    });

    // per ogni faccia inserisco i nuovi 3 vertici intermedi e le 4 nuove facce che questi compongono
    geom.faces.forEach(function(element) {
        pA = geom.vertices[element.a];
        pB = geom.vertices[element.b];
        pC = geom.vertices[element.c];
        
        betAB = getPointInBetween(pA, pB).normalize();
        newVertices.push(betAB);
        betBC = getPointInBetween(pB, pC).normalize();
        newVertices.push(betBC);
        betCA = getPointInBetween(pC, pA).normalize();
        newVertices.push(betCA);
        
        face = new THREE.Face3(newVertices.length-3, newVertices.length-1, newVertices.length-2);
        newFaces.push(face);
        face = new THREE.Face3(element.a, newVertices.length-1, newVertices.length-3);
        newFaces.push(face);
        face = new THREE.Face3(element.b, newVertices.length-3, newVertices.length-2);
        newFaces.push(face);
        face = new THREE.Face3(element.c, newVertices.length-2, newVertices.length-1);
        newFaces.push(face);
    });

    // creo la nuova geometria con le facce e vertici calcolati
    newGeom = new THREE.Geometry();
    newGeom.faces = newFaces;
    newGeom.vertices = newVertices;
    
    // aggiorno il riferimento alla geometria, serve le successive esecuzioni di questa procedura
    geom = newGeom;
    mesh = new THREE.Mesh(newGeom, material);

    // aggiungo la nuova mesh e ripristino la rotazione
    scene.add(mesh);
    mesh.rotation.x = currentMeshXRotation;
    mesh.rotation.y = currentMeshYRotation;

}
