//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('transparent');


  //Camera setup    
  const fov = 100;
  const aspect = container.clientWidth * 1.0/ container.clientHeight * 1.0;
  const near = 0.1;
  const far = 5000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 250);

  
  //Light setup
  const ambient = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambient);

  const light = new THREE.PointLight(0xfa8331, 30);
  light.position.set(0, 500, 0);
  scene.add(light);
    
  const light2 = new THREE.PointLight(0xfff000, 15);
  light2.position.set(200, 0, -200);
  light2.rotation.x += .005;
  scene.add(light2);
    
  const light3 = new THREE.PointLight(0xfff000, 15);
  light3.position.set(0, 0, 200);
  light3.rotation.x += .005;
  scene.add(light3);
    
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth * 1.0, container.clientHeight * 1.0);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // CUBE
		// Skybox texture website http://www.custommapmakers.org/skyboxes.php
		var geometry = new THREE.CubeGeometry( 3000, 3000, 3000 );
		var cubeMaterials =
		[
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/Rainbowposx.jpg' ), side: THREE.DoubleSide } ), // Right side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/Rainbownegx.jpg' ), side: THREE.DoubleSide } ), // Left side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/Rainbowposy.jpg' ), side: THREE.DoubleSide } ), // Top side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/Rainbownegy.jpg' ), side: THREE.DoubleSide } ), // Bottom side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/Rainbownegz.jpg' ), side: THREE.DoubleSide } ), // Front side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/Rainbowposz.jpg' ), side: THREE.DoubleSide } ) // Back side
		];    
    // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
		var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
		var cube = new THREE.Mesh( geometry, cubeMaterial );
    cube.rotation.x += .05;
		scene.add( cube );
        
        
    
    

    
        
    
  //Load Models
  let loader = new THREE.GLTFLoader();

    
  loader.load("obj/logo.gltf", function(gltf) {
    scene.add(gltf.scene);
    logo = gltf.scene;
    animate();
  });
    
    
  
   
}


function animate() {
    
//  grid.position.y = -10;
//  
//  face.rotation.y += .005;
//  absform.rotation.z += .05;
//  absform.rotation.y += .05;
//  absform.rotation.x += .05;
//  absform.scale.x += .0;
//  tahoe.position.x += -40;
//  deathvalley.position.x += 40;
 
    
      logo.scale.x = 0;
      logo.scale.y = 0;
      logo.scale.z = 0;
      logo.position.y = -0;
      logo.rotation.y += -.003;
  
  

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
    
}



init();

function onWindowResize() {
  camera.aspect = container.clientWidth * 1.0/ container.clientHeight * 1.0;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth * 1.0, container.clientHeight * 1.0);
}

window.addEventListener("resize", onWindowResize);

//Orbit Controls
  controls = new THREE.OrbitControls( camera, renderer.domElement);
  controls.minDistance = 250;
  controls.maxDistance = 5000;
  controls.enableZoom = true;
  controls.enablePan = true;


