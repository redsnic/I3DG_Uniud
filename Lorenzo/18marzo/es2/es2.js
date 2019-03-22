let scene, camera, renderer, controls, stats;
let sunGeom, sunMaterial, sun;
let planetGeom, planetMaterial, planet;
let moonGeom, moonMaterial, moon;

//let debugAxisGeom, debugAxisMaterial, debugAxis;

let planetOrbit;

let sunRadius = 2;
let planetRadius = 1;
let planetOffsetFromSun = 6;
let moonRadius = 0.3;
let moonOffsetFromPlanet = 2;

// angolo di cui inclinare il pianeta
let tiltAngle = 25 * Math.PI/180;
//asse inclinato di tiltAngle su cui il pianeta deve ruotare attorno
let rotatedPlanetAxis;
//asse perpendicolare a quello inclinato, usato per posizionare il pianeta sull'asse inclinato
let rotationPlanetAxis;
//angolo usato per la rotazione del pianeta attorno a se stesso
let planetRotationAngle = 0;
let moonOrbitRotationAngle = 0;

let clock = new THREE.Clock();
let delta = 0;

init();
initStats();
loop();

function initStats() {
	controls = new THREE.OrbitControls(camera);
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
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement);

	camera.position.set(0, 2, 8);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	setUpSun();
	setUpPlanet();
	setUpMoon();
	//setUpDebugAxis();

	planetOrbit = new THREE.Object3D();
	moonOrbit = new THREE.Object3D();
	planetOrbit.position.set(planet.position.x,planet.position.y,planet.position.z);

	sun.add( planetOrbit );
	planetOrbit.add( planet );
	moonOrbit.add( moon );

	scene.add(sun);
	scene.add(moonOrbit);
	//scene.add(debugAxis);
}


function loop() {
	requestAnimationFrame(loop);
	delta = clock.getDelta();
	rotatePlanetOrbit();
	rotatePlanet();
	rotateMoonOrbit();
	rotateMoon();
	//rotateDebugAxis();
	controls.update();
	stats.update();
	renderer.render(scene, camera);
}

function setUpSun() {
	sunGeom = new THREE.SphereGeometry(sunRadius, 20, 20);
	sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffc300, wireframe: true});
	sun = new THREE.Mesh(sunGeom, sunMaterial);
	sun.position.set(0,0,0);
}

function setUpPlanet() {
	planetGeom = new THREE.SphereGeometry(planetRadius, 20, 20);
	planetMaterial = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true});
	planet = new THREE.Mesh(planetGeom, planetMaterial);
	planet.matrixAutoUpdate = false;

	let maxCorner = new THREE.Vector3(Math.sin(tiltAngle), Math.cos(tiltAngle), 0);
	let minCorner = new THREE.Vector3(0,0,0);
	rotatedPlanetAxis = new THREE.Vector3();
	rotatedPlanetAxis.subVectors(maxCorner, minCorner);
	rotatedPlanetAxis.normalize();

	rotationPlanetAxis = new THREE.Vector3();
	rotationPlanetAxis.crossVectors(new THREE.Vector3(0,1,0), rotatedPlanetAxis);
	rotationPlanetAxis.normalize();

}

function setUpMoon() {
	moonGeom = new THREE.SphereGeometry(moonRadius, 16, 16);
	moonMaterial = new THREE.MeshBasicMaterial({ color: 0xc07cff, wireframe: true});
	moon = new THREE.Mesh(moonGeom, moonMaterial);
	moon.position.set(moonOffsetFromPlanet,0,0);
}

function setUpDebugAxis() {
	debugAxisGeom = new THREE.CylinderGeometry(0.03,0.03,5);
	debugAxisMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false});
	debugAxis = new THREE.Mesh(debugAxisGeom, debugAxisMaterial);
}

function rotatePlanetOrbit(){
	//se ogni 365 secondi l'angolo deve aumentare di 2pi, in 1/60 di secondo qunato aumenta?
	//365 : 2pi = 1/60 : x
	let incr = ((1/60)*2*Math.PI)/365;
	//scalo incr considerando il reale frametime
	incr *= delta/(1/60);
	planetOrbit.rotation.y += incr;
}

function rotatePlanet(){
	//creo la matrice per posizionare il pianeta sull'asse inclinato
	planet.matrix.makeRotationAxis(rotationPlanetAxis, tiltAngle);
	temp = planet.matrix.clone();
	//creo la matrice per ruotare il pianeta attorno all'asse inclinato
	planet.matrix.makeRotationAxis(rotatedPlanetAxis, planetRotationAngle);
	planet.matrix = planet.matrix.multiply(temp);
	planet.matrix.setPosition( new THREE.Vector3(planetOffsetFromSun,0,0) );

	//se ogni 1 secondi l'angolo deve aumentare di 2pi, in 1/60 di secondo qunato aumenta?
	//1 : 2pi = 1/60 : x
	let incr = (1/60)*2*Math.PI;
	//scalo incr considerando il reale frametime
	incr *= delta/(1/60);
	planetRotationAngle += incr;
}

function rotateMoonOrbit(){
	moonOrbit.matrixAutoUpdate = false;
	//creo la matrice per posizionare l'rbita sull'asse inclinato
	moonOrbit.matrix.makeRotationAxis(rotationPlanetAxis, tiltAngle);
	temp = moonOrbit.matrix.clone();
	//creo la matrice per ruotare l'orbita attorno all'asse inclinato
	moonOrbit.matrix.makeRotationAxis(rotatedPlanetAxis, moonOrbitRotationAngle);
	moonOrbit.matrix = moonOrbit.matrix.multiply(temp);
	//posiziono il centro dell'orbita presso centro (reale) del pianeta contenuto nella matrice world
	moonOrbit.matrix.setPosition( new THREE.Vector3(planet.matrixWorld.elements[12],planet.matrixWorld.elements[13],planet.matrixWorld.elements[14]) );

	//se ogni 365/12 secondi l'angolo deve aumentare di 2pi, in 1/60 di secondo qunato aumenta?
	//365/12 : 2pi = 1/60 : x
	let incr = ((1/60)*2*Math.PI)/(365/12);
	//scalo incr considerando il reale frametime
	incr *= delta/(1/60);
	moonOrbitRotationAngle += incr;
}

function rotateMoon(){
	//se ogni 365/28 secondi l'angolo deve aumentare di 2pi, in 1/60 di secondo qunato aumenta?
	//365/28 : 2pi = 1/60 : x
	let incr = ((1/60)*2*Math.PI)/(365/28);
	//scalo incr considerando il reale frametime
	incr *= delta/(1/60);
	moon.rotation.y += incr;
}

function rotateDebugAxis(){
	let maxCorner = new THREE.Vector3(Math.sin(tiltAngle), Math.cos(tiltAngle), 0);
	let minCorner = new THREE.Vector3(0,0,0);
	let rotated_axis = new THREE.Vector3();
	rotated_axis.subVectors(maxCorner, minCorner);
	rotated_axis.normalize();
	
	let rotationAxis = new THREE.Vector3();
	rotationAxis.crossVectors(new THREE.Vector3(0,1,0), rotated_axis);
	rotationAxis.normalize();

	debugAxis.matrix.makeRotationAxis(rotationAxis, tiltAngle);
	debugAxis.matrix.setPosition( new THREE.Vector3(planetOffsetFromSun,0,0) );
	debugAxis.matrixAutoUpdate = false;
}