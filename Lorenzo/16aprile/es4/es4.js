var renderer = new THREE.WebGLRenderer( { antialias: true } );
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var scene = new THREE.Scene();

// default: white, 1.0 intensity
var lightParameters = {
    red: 1.0,
    green: 1.0,
	blue: 1.0,
	intensity: 1.0,
}

// default: red plastic
var materialParameters = {
    material_red: 0.8,
    material_green: 0.2,
    material_blue: 0.1,
    metalness: 1.0,
	roughness: 0.3
}

var uniforms = {
	material_color:	{ type: "v3", value: new THREE.Vector3() },
	roughness: {type: "f", value: 0.5},
    metalness: {type: "f", value: 1.0},
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
	clight:	{ type: "v3", value: new THREE.Vector3() },
};

vs = document.getElementById("vertex").textContent;
fs = document.getElementById("fragment").textContent;

ourMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vs, fragmentShader: fs });
geometry = new THREE.TorusKnotGeometry( 2, 0.5, 200, 32 );
var mesh = new THREE.Mesh( geometry, ourMaterial );

var lightMesh = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16),
    new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true})
);
lightMesh.position.set( 7.0, 7.0, 7.0 );
uniforms.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x, lightMesh.position.y, lightMesh.position.z);

var gui;
var stats = new Stats();

function init() {
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor( 0xf0f0f0 );

    camera.position.set( 0, 10, 10 );
	scene.add( camera );

    scene.add( mesh );
    scene.add(lightMesh);

	document.body.appendChild( renderer.domElement );
	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.addEventListener( 'change', render );
	controls.minDistance = 1;
	controls.maxDistance = 100;
	//controls.maxPolarAngle = Math.PI / 2;
	controls.enablePan = false;
	controls.target.copy( mesh.position );
	controls.update();

	window.addEventListener( 'resize', onResize, false );

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
}

function onResize() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = ( window.innerWidth / window.innerHeight );
	camera.updateProjectionMatrix();
}

function update() {
	requestAnimationFrame( update );
	stats.update();
}

function render() {
	updateUniforms();
	renderer.render( scene, camera );
}

function clearGui() {
	if ( gui ) gui.destroy();
		gui = new dat.GUI();
		gui.open();
	}

function buildGui() {
	clearGui();
	lightSettings = gui.addFolder('Light Parameters');
	lightSettings.add(lightParameters,'red').min(0).max(1).onChange( function(newVal) { render() });
	lightSettings.add(lightParameters,'green').min(0).max(1).onChange( function(newVal) { render() });
	lightSettings.add(lightParameters,'blue').min(0).max(1).onChange( function(newVal) { render() });
    lightSettings.add(lightParameters,'intensity').min(0).max(10000).onChange( function(newVal) { render() });

	materialSettings = gui.addFolder('material settings');
	materialSettings.add(materialParameters,'material_red').min(0).max(1).onChange( function(newVal) { render() });
	materialSettings.add(materialParameters,'material_green').min(0).max(1).onChange( function(newVal) { render() });
	materialSettings.add(materialParameters,'material_blue').min(0).max(1).onChange( function(newVal) { render() });
	materialSettings.add(materialParameters,'roughness').min(0).max(1).onChange( function(newVal) { render() });
    materialSettings.add(materialParameters,'metalness').min(0).max(1).onChange( function(newVal) { render() });
}

function updateUniforms() {
	uniforms.material_color.value = new THREE.Vector3(
        materialParameters.material_red,
        materialParameters.material_green,
        materialParameters.material_blue );

	uniforms.roughness.value = materialParameters.roughness>0.0?materialParameters.roughness:0.01;
    
    uniforms.metalness.value = materialParameters.metalness;
    
    uniforms.clight.value = new THREE.Vector3(
		lightParameters.red * lightParameters.intensity,
		lightParameters.green * lightParameters.intensity,
		lightParameters.blue * lightParameters.intensity);
}

init();
buildGui();
update();
render();
