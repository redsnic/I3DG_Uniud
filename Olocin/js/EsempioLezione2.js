/**
 * 
 * Esempio della seconda lezione
 * Nicolò Rossi
 * 
 */

  var scene, camera, renderer, triangle;
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  /* manage input for rotation*/
  document.addEventListener('keydown', logKey);
  function logKey(e) {
	  if(e.code == "ArrowRight"){
		  triangle.rotation.y += 0.1;
	  }else if(e.code == "ArrowLeft"){
		  triangle.rotation.y -= 0.1;
	  }else if(e.code == "ArrowDown"){
		  triangle.rotation.x -= 0.1;
	  }else if(e.code == "ArrowUp"){
		  triangle.rotation.x += 0.1;
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
  	
  	/* prepare a triangle objet: */
  	/* Geometry */
  	/* create an empty geometry */
  	geometry = new THREE.Geometry();
  	/* crate vertices */
  	geometry.vertices.push(new THREE.Vector3(-2,0,0));
  	geometry.vertices.push(new THREE.Vector3(2,0,0));
  	geometry.vertices.push(new THREE.Vector3(0,2,0));
  	/* crate face */
  	geometry.faces.push(new THREE.Face3(0,1,2));
  	
  	/* Material                               Proprieties as object */
  	material = new THREE.MeshBasicMaterial({ color: 0x005500, side: THREE.DoubleSide, wireframe:true});
  	/* Mesh                      Geometry  Material      */                   
  	triangle    = new THREE.Mesh(geometry, material);
  	/* add triangle to scene */
  	scene.add(triangle);
  	
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