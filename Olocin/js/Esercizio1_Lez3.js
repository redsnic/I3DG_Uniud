/**
 * 
 * Esercizio 1 della lezione 3: 
 * disegnare un fiore
 * Nicolò Rossi
 * 
 */

  var scene, camera, renderer, group;
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  /* manage input for rotation*/
  document.addEventListener('keydown', logKey);
  function logKey(e) {
	  if(e.code == "ArrowRight"){
		  group.rotation.y += 0.1;
	  }else if(e.code == "ArrowLeft"){
		  group.rotation.y -= 0.1;
	  }else if(e.code == "ArrowDown"){
		  group.rotation.x -= 0.1;
	  }else if(e.code == "ArrowUp"){
		  group.rotation.x += 0.1;
	  }
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
  	
  	/* prepare 3Dobjects */
  	stemGeometry = new THREE.CylinderGeometry(0.3,0.3,3,128,128);
  	stemMaterial = new THREE.MeshBasicMaterial( { color:0x00CC00 } );
    stem = new THREE.Mesh(stemGeometry,stemMaterial);
    
  	sphereGeometry = new THREE.SphereGeometry( 0.3, 128, 128 );
  	sphereMaterial = new THREE.MeshBasicMaterial( { color:0xCC00CC } );
  	sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  	
  	coneGeometry = new THREE.ConeGeometry(0.25, 2, 128);
  	coneMaterial = new THREE.MeshBasicMaterial( { color:0xCC0000 } );
  	
  	/* number of petals*/
  	nP = 24;
  	
  	petals = []
  	for(i=0; i<nP; i++){
  		petals.push(new THREE.Mesh(coneGeometry, coneMaterial));
  	}
  	
  	/* merge meshes in a single object */
  	group = new THREE.Group();
  	for(i=0; i<nP; i++){
  		group.add(petals[i]);
  	}
  	group.add(sphere);
  	group.add(stem);
  	
  	scene.add(group);
  	
  	sphere.position.y+=1.5;
  	
  	/*  prepare petals  */
  	for(i=0; i<nP; i++){
  		angle = (i*(360/(nP))) * (Math.PI/180);
  		petals[i].rotation.z = 90 * Math.PI/180;
  		petals[i].rotation.y = angle; 
  		petals[i].position.y +=1.5;
  		petals[i].position.x +=1.3*Math.cos(angle);
  		petals[i].position.z -=1.3*Math.sin(angle);
  	}
  	
  	camera.position.z = 5;
  	console.log("INIT END")
  	
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