var scene, camera, renderer, controls, stats;

function Start() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xf0f0f0);
	document.body.appendChild(renderer.domElement);

	camera.position.set(3, 4, 6);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var geometry = new THREE.BoxGeometry(2, 2, 2);
	var material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true});
	var cube = new THREE.Mesh(geometry, material);

	scene.add(cube);

	Coordinates.drawAllAxes();

	controls = new THREE.OrbitControls(camera);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);

	insertCylinder(new THREE.Vector3(-1, 1, 1), new THREE.Vector3(1, -1, -1));
	insertCylinder(new THREE.Vector3(-1, 1, -1), new THREE.Vector3(1, -1, 1));
	insertCylinder(new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, 1, -1));
	insertCylinder(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
}

function insertCylinder(vA, vB) {
	var cylinder_geometry = new THREE.CylinderGeometry(0.1, 0.1, 4);
	var cylinder_material = new THREE.MeshBasicMaterial({ color: 0xaaaaff });
	var cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);
	
	// per posizionare il cilindro sull'asse vA-vB devo trovarne l'asse perpendicolare, ossia il perno
	// della rotazione e fare routare il cilindro su questo, per trovarlo calcolo il prodotto vettoriale
	// tra l'asse vA-vB obiettivo e l'asse iniziale (y).

	var maxCorner = vA;
	var minCorner = vB;
	var rotatedCyl_axis = new THREE.Vector3();
	rotatedCyl_axis.subVectors(maxCorner, minCorner);
	rotatedCyl_axis.normalize();
	// per trovare l'angolo di rotazione
	// prodotto scalare tra vettore della posizione iniziale e quello della posizione finale
	var angle = Math.acos(rotatedCyl_axis.dot(new THREE.Vector3(0, 1, 0)));

	var rotationAxis = new THREE.Vector3();
	// per trovare il vetto perno della rotazione voluta
	// prodotto vettoriale tra vettore della posizione iniziale e quello della posizione finale
	rotationAxis.crossVectors(new THREE.Vector3(0, 1, 0), rotatedCyl_axis);
	rotationAxis.normalize();

	console.log(rotationAxis);

	cylinder.matrix.makeRotationAxis(rotationAxis, angle);
	cylinder.matrixAutoUpdate = false;
	scene.add(cylinder);
}


function Update() {
	requestAnimationFrame(Update);
	controls.update();
	stats.update();
	Render();
}

function Render() {
	renderer.render(scene, camera);
}

Start();
Update();