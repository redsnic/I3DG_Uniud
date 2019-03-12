/**
 * 
 * Esercizio 1 della lezione 2:
 * disegnare un cubo con sei facce colorate diversamente
 * Nicolò Rossi
 * 
 */

  var scene, camera, renderer, group;
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  /**
   * creates a square on the given vertices 
   * @param a  vert
   * @param b  vert
   * @param c  vert
   * @param d  vert
   * @param geometry
   * @returns
   */
  function SquareGeometry(a,b,c,d){
	  geometry = new THREE.Geometry();
	  geometry.vertices.push(a);
	  geometry.vertices.push(b);
	  geometry.vertices.push(c);
	  geometry.vertices.push(d);
	  geometry.faces.push(new THREE.Face3(0,1,2));
	  geometry.faces.push(new THREE.Face3(0,2,3));
	  return geometry;
  }
  
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
  	camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  	renderer = new THREE.WebGLRenderer();
  	renderer.setSize(window.innerWidth, window.innerHeight);
  	/* append renderer to page */
  	document.body.appendChild(renderer.domElement);  
  	
  	/* prepare a cube objet from triangles: */
  	/* Geometry */
  	
  	v0 = new THREE.Vector3(-1,-1, 1);
  	v1 = new THREE.Vector3( 1,-1, 1);
  	v2 = new THREE.Vector3( 1, 1, 1);
  	v3 = new THREE.Vector3( -1, 1, 1);
  	v4 = new THREE.Vector3(-1,-1, -1);
  	v5 = new THREE.Vector3( 1,-1, -1);
  	v6 = new THREE.Vector3( 1, 1, -1);
  	v7 = new THREE.Vector3(-1, 1, -1);  	
  	
  	front = SquareGeometry(v0,v1,v2,v3);
  	back = SquareGeometry(v5,v4,v7,v6);
  	left = SquareGeometry(v4,v0,v3,v7);
  	right = SquareGeometry(v1,v5,v6,v2);
  	down = SquareGeometry(v4,v5,v1,v0);
  	up = SquareGeometry(v3,v2,v6,v7);
  
  	
  	/* Material                               Proprieties as object */
  	frontMaterial = new THREE.MeshBasicMaterial({ color: 0x005500});
  	backMaterial = new THREE.MeshBasicMaterial({ color: 0x550000});
  	leftMaterial = new THREE.MeshBasicMaterial({ color: 0x000055});
  	rightMaterial = new THREE.MeshBasicMaterial({ color: 0x005555});
  	downMaterial = new THREE.MeshBasicMaterial({ color: 0x555500});
  	upMaterial = new THREE.MeshBasicMaterial({ color: 0x555555});
  	
  	/* Mesh                  Geometry  Material      */                   
  	frontMesh    = new THREE.Mesh(front, frontMaterial);
  	backMesh    = new THREE.Mesh(back, backMaterial);
  	leftMesh    = new THREE.Mesh(left, leftMaterial);
  	rightMesh    = new THREE.Mesh(right, rightMaterial);
  	downMesh    = new THREE.Mesh(down, downMaterial);
  	upMesh    = new THREE.Mesh(up, upMaterial);
  	
  	/* merge meshes in a single object */
  	group = new THREE.Group();
  	group.add(frontMesh);
  	group.add(backMesh);
  	group.add(leftMesh);
  	group.add(rightMesh);
  	group.add(downMesh);
  	group.add(upMesh);
  	
  	scene.add(group);
  	
  	
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