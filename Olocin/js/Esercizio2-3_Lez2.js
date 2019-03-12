/**
 * 
 * Esercizi 2 e 3 della seconda lezione:
 * disegnare un ottaedro e sfruttarlo per approssimare una sfera
 * Nicolò Rossi
 * 
 */

  var scene, camera, renderer, sphere, v, geometry, triangles, index;
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  /**
   * creates a triangle object on the given vertices with the given indexes 
   */
  function makeTriangle(a,b,c,ia,ib,ic){
	  vertices = [];
	  vertices.push(a);
	  vertices.push(b);
	  vertices.push(c);
	  indexes = [];
	  indexes.push(ia);
	  indexes.push(ib);
	  indexes.push(ic);
	  triangle = { vertices:vertices, indexes: indexes };
	  return triangle;
  }
  
  /**
   * enhance the approximation of the sphere of one iteration
   * (requires to remove sphere from the scene)
   */
  function enhance(){
	size = triangles.length;
 	for( i=0; i<size; i++ ){
 		T = triangles[i];
  			
  		/* original vertices */
  		A = T.vertices[0];
  		B = T.vertices[1];
  		C = T.vertices[2];
  		iA = T.indexes[0];
  		iB = T.indexes[1];
  		iC = T.indexes[2];
  		/* compute middle points and scaling coefficients */
  		cA = 1/Math.sqrt((((A.x+B.x)/2)*((A.x+B.x)/2) + ((A.y+B.y)/2)*((A.y+B.y)/2) + ((A.z+B.z)/2)*((A.z+B.z)/2)));
  		cB = 1/Math.sqrt((((C.x+B.x)/2)*((C.x+B.x)/2) + ((C.y+B.y)/2)*((C.y+B.y)/2) + ((C.z+B.z)/2)*((C.z+B.z)/2)));
  		cC = 1/Math.sqrt((((A.x+C.x)/2)*((A.x+C.x)/2) + ((A.y+C.y)/2)*((A.y+C.y)/2) + ((A.z+C.z)/2)*((A.z+C.z)/2)));
  		AB = new THREE.Vector3(cA*((A.x+B.x)/2), cA*((A.y+B.y)/2), cA*((A.z+B.z)/2));
  		BC = new THREE.Vector3(cB*((C.x+B.x)/2), cB*((C.y+B.y)/2), cB*((C.z+B.z)/2));
  		AC = new THREE.Vector3(cC*((A.x+C.x)/2), cC*((A.y+C.y)/2), cC*((A.z+C.z)/2));
  		/* build triangles */
  		iAB = index;
  		iBC = index+1;
  		iAC = index+2;
        
  		v.push(AB);
  		v.push(BC);
  		v.push(AC);
  		index += 3;
  			
  		T1 = makeTriangle(AB,B,BC,iAB,iB,iBC);
  		T2 = makeTriangle(AC,AB,BC,iAC,iAB,iBC);
  		T3 = makeTriangle(A,AB,AC,iA,iAB,iAC);
  		T4 = makeTriangle(AC,BC,C,iAC,iBC,iC);
  				
  		triangles[i]=T1;
  		triangles.push(T2);
  		triangles.push(T3);
  		triangles.push(T4);

  	}
  }
  
  /**
   * prepare geometry, material and triangles to display the sphere
   */
  function prepare(){
	  /* Material                               Proprieties as object */
	  triangleMaterial = new THREE.MeshBasicMaterial({ color: 0x005500, wireframe:true});
	  	
	  console.log(triangles);
	  	
	  /* Geometry */
	  geometry = new THREE.Geometry();
	  	
	  /* push vertices */
	  for( i = 0; i<v.length; i++ ){
	  	geometry.vertices.push(v[i]);
	  }
	  /* Mesh                  Geometry  Material      */ 
	  for( i = 0; i<triangles.length; i++ ){
	  	geometry.faces.push(new THREE.Face3(triangles[i].indexes[0], triangles[i].indexes[1], triangles[i].indexes[2]));
	  }
	  	
	  sphere = new THREE.Mesh(geometry, triangleMaterial);
	  
	  scene.add(sphere);
  }
  
  
  /* manage input for rotation*/
  document.addEventListener('keydown', inputReader);
  function inputReader(e) {
	  if(e.code == "ArrowRight"){
		  sphere.rotation.y += 0.1;
	  }else if(e.code == "ArrowLeft"){
		  sphere.rotation.y -= 0.1;
	  }else if(e.code == "ArrowDown"){
		  sphere.rotation.x -= 0.1;
	  }else if(e.code == "ArrowUp"){
		  sphere.rotation.x += 0.1;
	  }else if(e.code == "Enter"){ // enhance the approximation
		  enhance();
		  scene.remove(sphere);
		  prepare();
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
  	
  	/* prepare initial vertices and triangles */
  	v = []
  	v.push(new THREE.Vector3( 0,-1, 0)); // down
  	v.push(new THREE.Vector3( 0, 0,-1)); 
  	v.push(new THREE.Vector3( 1, 0, 0)); 
  	v.push(new THREE.Vector3( 0, 0, 1));
  	v.push(new THREE.Vector3(-1, 0,  0));
  	v.push(new THREE.Vector3( 0, 1,  0));// up 	
  	
  	/* init octahedron */
  	triangles = []
  	triangles.push(makeTriangle(v[0],v[1],v[2],0,1,2));
  	triangles.push(makeTriangle(v[0],v[2],v[3],0,2,3));
  	triangles.push(makeTriangle(v[0],v[3],v[4],0,3,4));
  	triangles.push(makeTriangle(v[0],v[4],v[1],0,4,1));
  	triangles.push(makeTriangle(v[5],v[1],v[2],5,1,2));
  	triangles.push(makeTriangle(v[5],v[2],v[3],5,2,3));
  	triangles.push(makeTriangle(v[5],v[3],v[4],5,3,4));
  	triangles.push(makeTriangle(v[5],v[4],v[1],5,4,1));
  
  	index = 6; // active index for new vertices
  	
  	/* display octahedron */
  	prepare();
  	
  	camera.position.z = 2.5;
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