/**
 * 
 * Esempio della lezione del giorno 5/03/2019
 * Nicolò Rossi
 * 
 */

  var scene, camera, renderer, box;
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  /* manage input for rotation*/
  document.addEventListener('keydown', logKey);
  function logKey(e) {
	  if(e.code == "ArrowRight"){
		  box.rotation.y += 0.1;
	  }else if(e.code == "ArrowLeft"){
		  box.rotation.y -= 0.1;
	  }else if(e.code == "ArrowDown"){
		  box.rotation.x -= 0.1;
	  }else if(e.code == "ArrowUp"){
		  box.rotation.x += 0.1;
	  }
  }
  
  /* initialization: executed at page load */
  function Init(){
  	
  	scene    = new THREE.Scene();
  	/*                                    FOV              aspect ratio                min  max    distance for visible objects */
  	camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  	renderer = new THREE.WebGLRenderer();
  	console.log(renderer)
  	renderer.setSize(window.innerWidth, window.innerHeight);
  	/* append renderer to page */
  	document.body.appendChild(renderer.domElement);  
  	
  	/* prepare box objet this is done in three phases: */
  	/* Geometry */
  	boxGeometry = new THREE.CubeGeometry(1,1,1);
  	/* Material                               Proprieties as object */
  	boxMaterial = new THREE.MeshBasicMaterial({ color: 0x005500, wireframe : true });
  	/* Mesh                      Geometry     Material      */                   
  	box         = new THREE.Mesh(boxGeometry, boxMaterial);
  	/* add box to scene */
  	scene.add(box);
  	
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