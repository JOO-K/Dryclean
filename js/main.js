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
  const fov = 90;
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
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/posx.jpg' ), side: THREE.DoubleSide } ), // Right side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/negx.jpg' ), side: THREE.DoubleSide } ), // Left side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/posy.jpg' ), side: THREE.DoubleSide } ), // Top side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/negy.jpg' ), side: THREE.DoubleSide } ), // Bottom side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/negz.jpg' ), side: THREE.DoubleSide } ), // Front side
			new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load( 'images/posz.jpg' ), side: THREE.DoubleSide } ) // Back side
		];    
    // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
		var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
		var cube = new THREE.Mesh( geometry, cubeMaterial );
    cube.rotation.x += .05;
		scene.add( cube );
        
        
    
    
    //Get your video element:
        const video1 = document.getElementById('video1');
        video1.autoplay = true;


    //Create your video texture:
        const videoTexture1 = new THREE.VideoTexture(video1);
        const videoMaterial1a =  new THREE.MeshBasicMaterial( {map: videoTexture1, side: THREE.BackSide, toneMapped: false} );
        const videoMaterial1b =  new THREE.MeshBasicMaterial( {map: videoTexture1, side: THREE.FrontSide, toneMapped: false} );
    
    
    //Create screen
        const screen1 = new THREE.CircleGeometry(122, 50);
        const screen2 = new THREE.CircleGeometry(122, 50);
        const videoScreen1 = new THREE.Mesh(screen1, videoMaterial1b,);
        const videoScreen2 = new THREE.Mesh(screen2, videoMaterial1a,);
        scene.add(videoScreen1);
        videoScreen1.position.y = -30;
        videoScreen1.rotation.x = 1.5708;
        videoScreen1.rotation.z = 180;
        scene.add(videoScreen2);
        videoScreen2.position.y = -30;
        videoScreen2.rotation.x = 1.5708;
        videoScreen2.rotation.z = 180;
    
        
    
  //Load Models
  let loader = new THREE.GLTFLoader();
    
  loader.load("obj/spikering5.gltf", function(gltf) {
    scene.add(gltf.scene);
    spikering = gltf.scene;
    animate();
  });
    
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
  spikering.scale.x = 14;
  spikering.scale.y = 14;
  spikering.scale.z = 14;
  spikering.position.y = -30;
  spikering.rotation.y += .003;
    
  logo.scale.x = 40;
  logo.scale.y = 40;
  logo.scale.z = 40;
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
  controls.maxDistance = 500;
  controls.enableZoom = false;
  controls.enablePan = false;


