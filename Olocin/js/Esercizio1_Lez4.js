/**
 * 
 * Esercizio 1 della lezione 4: 
 * cilindri sulle diagonali
 * Nicolò Rossi
 * 
 */

  var scene, camera, renderer, group;
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  
  function makeCylinderOnAxis( cylGeom, cylMat, a, b  ){
	  	cyl = new THREE.Mesh(cylGeom, cylMat);
	  	var rotated_cyl_axis =new THREE.Vector3();rotated_cyl_axis.subVectors( a, b );
	  	rotated_cyl_axis.normalize();
	  	var angle = Math.acos( rotated_cyl_axis.dot(new THREE.Vector3(0,1,0)));
	  	var rotation_axis =new THREE.Vector3();
	    // remember:right-hand rule
	  	rotation_axis.crossVectors(new THREE.Vector3(0,1,0),rotated_cyl_axis);
	  	// rotation axis given to makeRotationAxis must be normalised
	  	rotation_axis.normalize();
	  	cyl.matrix.makeRotationAxis(rotation_axis, angle);
	  	cyl.matrixAutoUpdate = false;
	  	return cyl;
  }
  
  
  /* initialization: executed at page load */
  function Init(){
  	
  	scene    = new THREE.Scene();
  	/*                                    FOV              aspect ratio                min  max    distance for visible objects */
  	camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,        1000);
  	renderer = new THREE.WebGLRenderer();
  	renderer.setSize(window.innerWidth, window.innerHeight);
  	/* append renderer to page */
  	document.body.appendChild(renderer.domElement);  
  	
  	orbitctrl = THREE.OrbitControls(camera, renderer.domElement);
  	
  	var axesHelper = new THREE.AxesHelper( 5 );
  	scene.add( axesHelper );
  	
  	/* create wireframe 1x1 cube */
  	cubeGeom = new THREE.BoxGeometry(1,1,1);
  	cubeMat  = new THREE.MeshBasicMaterial({color:0x009900, wireframe:true});
  	cube     = new THREE.Mesh(cubeGeom, cubeMat);
  	
  	
  	scene.add(cube);
  	
  	/* prepare cylinders */
  	cylGeom = new THREE.CylinderGeometry(0.1,0.1,2,32);
  	cylMat  = new THREE.MeshBasicMaterial({color:0x990000 , wireframe:true});
  	
  	
  	cyls = []
  	/* position cyl1 */
  	
  	p1 = new THREE.Vector3(1, 1, 1);
  	p2 = new THREE.Vector3(-1, -1, -1);
  	
  	p3 = new THREE.Vector3(1, 1, -1);
  	p4 = new THREE.Vector3(-1, -1, 1);
  	
  	p5 = new THREE.Vector3(1, -1, 1);
  	p6 = new THREE.Vector3(-1, 1, -1);
  	
  	p7 = new THREE.Vector3(-1, 1, 1);
  	p8 = new THREE.Vector3(1, -1, -1);
  	
  	cyls.push(makeCylinderOnAxis( cylGeom, cylMat, p1, p2  ));
  	cyls.push(makeCylinderOnAxis( cylGeom, cylMat, p3, p4  ));
  	cyls.push(makeCylinderOnAxis( cylGeom, cylMat, p5, p6  ));
  	cyls.push(makeCylinderOnAxis( cylGeom, cylMat, p7, p8  ));
  	
  	cyls.forEach(function(el){ scene.add(el); });
  	
  	camera.position.z = 5;
  	console.log("INIT END");
  	
  }

  /* rendering loop */
  function Render(){
	  
	  
  	requestAnimationFrame(Render);

	stats.begin();

	renderer.render(scene, camera);

	stats.end();
  	
  	
  }
  
  Init();
  Render();