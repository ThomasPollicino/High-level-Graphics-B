import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

let objects; 
function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 45;
	const aspect = 2; 
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'lightBlue' );

	{

		const planeSize = 160;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	{

		const skyColor = 0xB1E1FF; 
		const groundColor = 0xB97A20; 
		const intensity = 3;
		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		scene.add( light );

	}

	{

		const color = 0xFF0000;
		const intensity = 2.5;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 10, -3 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );


		
	}
	{

		const color = 0xFFFF00;
		const intensity = 2.5;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 10, 0 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );


		
	}
	{

		const color = 0x800080;
		const intensity = 2.5;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 5, 0 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );


		
	}

	{
		{
			const color = 0x800080; 
			const intensity = 5;
		  
			const ambientLight = new THREE.AmbientLight(color, intensity);
			scene.add(ambientLight);
		}
	}
	{
		const loader = new THREE.CubeTextureLoader();
		const texture = loader.load([
		  'lib/cartoonCity.jpg',
		  'lib/cartoonCity.jpg',
		  'lib/cartoonCity.jpg',
		  'lib/cartoonCity.jpg',
		  'lib/cartoonCity.jpg',
		  'lib/cartoonCity.jpg',
		]);
		scene.background = texture;
	}


	


	{
        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();
        mtlLoader.load('lib/Avent_sport.mtl', (mtl) => {
        mtl.preload();
        objLoader.setMaterials(mtl);
        objLoader.load('lib/Avent_sport.obj', (root) => {//Credit: https://free3d.com/3d-model/lamborghini-aventador-sport-44634.html
        const scaleFactor = 5.0;
        root.scale.set(scaleFactor, scaleFactor, scaleFactor);
	   root.position.x = 45;
	   root.position.y = 2.31; 
	   root.position.z = 57; 
        scene.add(root);
        });
        });



		
	}


	{
		const mtlLoader = new MTLLoader();
		const objLoader = new OBJLoader();
		mtlLoader.load('lib/eiffel.mtl', (mtl) => {
		  mtl.preload();
		  objLoader.setMaterials(mtl);
		  objLoader.load('lib/eiffel.obj', (root) => {//Credit: https://free3d.com/3d-model/-eiffel-tower-v1--470573.html
			const scaleFactor = 0.005;
			root.scale.set(scaleFactor, scaleFactor, scaleFactor);
			
			root.rotation.x = -Math.PI / 2; 
			root.position.set(25, 0, 27);
			root.position.x = 0; 
			root.position.y = 0.31; 
			root.position.z = 0; 
			
			scene.add(root);
		  });
		});
	  }




    {
		const boxWidth = 1;
		const boxHeight = 1;
		const boxDepth = 1;
		const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	
		const cylinderRadius = 0.5;
		const cylinderHeight = 1;
		const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight);
	
		const pyramidRadius = 0.5;
		const pyramidHeight = 1;
		const pyramidGeometry = new THREE.ConeGeometry(pyramidRadius, pyramidHeight, 4);
	
		function makeInstance(geometry, x, y, z, scaleX, scaleY, scaleZ, rotationX, rotationY, rotationZ, texture, color) {
			const material = texture ? new THREE.MeshPhongMaterial({ map: texture }) : new THREE.MeshPhongMaterial();
			if (color) {
				material.color.setHex(color);
			}
			const mesh = new THREE.Mesh(geometry, material);
			mesh.scale.set(scaleX, scaleY, scaleZ);
			mesh.rotation.set(rotationX, rotationY, rotationZ);
			mesh.position.set(x, y, z);
			scene.add(mesh);
			return mesh;
		}
	
		const loader = new THREE.TextureLoader();
		const texture = loader.load('lib/coolCat.jpg');
		texture.colorSpace = THREE.SRGBColorSpace;
	
		objects = [
			makeInstance(boxGeometry, -5, 5, 0, 1, 1, 1, 0, 0, 0, texture, 0x44aa88),
			makeInstance(cylinderGeometry, -5, 5, 3, 1, 1, 1, 0, 0, 0, null, 0x8844aa),
			makeInstance(pyramidGeometry, -5, 5, -3, 1, 1, 1, 0, 0, 0, null, 0xaa8844),
		  ];
	
		const roadWidth = 35;
		const roadHeight = 0.15;
		const roadDepth = 160;
		const roadGeometry = new THREE.BoxGeometry(roadWidth, roadHeight, roadDepth);
		const roadColor = 0x444444;
	
		const road1 = makeInstance(roadGeometry, 50, 0.2, 0, 1, 1, 1, 0, 0, 0, null, roadColor);
		const road4 = makeInstance(roadGeometry, -50, 0.2, 0, 1, 1, 1, 0, 0, 0, null, roadColor);
		const road2 = makeInstance(roadGeometry, 0, 0.15, 60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadColor);
		const road3 = makeInstance(roadGeometry, 0, 0.15, -60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadColor);

		const roadLineWidth = 0.5;
		const roadLineHeight = 0.1;
		const roadLineDepth = 10;
		const roadLineGeometry = new THREE.BoxGeometry(roadLineWidth, roadLineHeight, roadLineDepth);
		const roadLineColor = 0xFFFF00; 

		const roadLine1 = makeInstance(roadLineGeometry, 50, 0.25, 20, 1, 1, 1, 0, 0, 0, null, roadLineColor);
		const roadLine2 = makeInstance(roadLineGeometry, 50, 0.25, 0, 1, 1, 1, 0, 0, 0, null, roadLineColor);
		const roadLine3 = makeInstance(roadLineGeometry, 50, 0.25, -20, 1, 1, 1, 0, 0, 0, null, roadLineColor);
		const roadLine4 = makeInstance(roadLineGeometry, -50, 0.25, 20, 1, 1, 1, 0, 0, 0, null, roadLineColor);
		const roadLine5 = makeInstance(roadLineGeometry, -50, 0.25, 0, 1, 1, 1, 0, 0, 0, null, roadLineColor);
		const roadLine6 = makeInstance(roadLineGeometry, -50, 0.25, -20, 1, 1, 1, 0, 0, 0, null, roadLineColor);

		const roadLine7 = makeInstance(roadLineGeometry, 20, 0.2, 60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadLineColor);
		const roadLine8 = makeInstance(roadLineGeometry, 0, 0.2, 60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadLineColor);
		const roadLine9 = makeInstance(roadLineGeometry, -20, 0.2, 60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadLineColor);
		const roadLine10 = makeInstance(roadLineGeometry, 20, 0.2, -60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadLineColor);
		const roadLine11 = makeInstance(roadLineGeometry, 0, 0.2, -60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadLineColor);
		const roadLine12 = makeInstance(roadLineGeometry, -20, 0.2, -60, 1, 1, 1, 0, Math.PI / 2, 0, null, roadLineColor);

		const greenSquareWidth = 160;
		const greenSquareHeight = 0.1;
		const greenSquareDepth = 160;
		const greenSquareGeometry = new THREE.BoxGeometry(greenSquareWidth, greenSquareHeight, greenSquareDepth);
		const greenSquareColor = 0x006600; 
	
		const greenSquare = makeInstance(greenSquareGeometry, 0, 0.01, 0, 1, 1, 1, 0, 0, 0, null, greenSquareColor);
	




		const trunkRadius = 0.5;
		const trunkHeight = 15;
		const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius, trunkHeight);
		const trunkColor = 0x8B4513; 
	  
		const leafRadius = 5;
		const leafGeometry = new THREE.SphereGeometry(leafRadius);
		const leafColor = 0x228B22; 
	  
		const pyramidRadiusT = 3;
		const pyramidHeightT = 15;
		const pyramidGeometryT = new THREE.ConeGeometry(pyramidRadiusT, pyramidHeightT, 4);
	  
		function createTree1(x, y, z) {
		  const trunk = makeInstance(trunkGeometry, x, y+trunkHeight/2, z, 1, 1, 1, 0, 0, 0, null, trunkColor);
		  const pyramid = makeInstance(pyramidGeometryT, x, y + trunkHeight, z, 1, 1, 1, 0, 0, 0, null, leafColor);
		}
		function createTree(x, y, z) {
			const trunk1 = makeInstance(trunkGeometry, x, y+trunkHeight/2, z, 1, 1, 1, 0, 0, 0, null, trunkColor);
			const leaves = makeInstance(leafGeometry, x, y + trunkHeight, z, 1, 1, 1, 0, 0, 0, null, leafColor);
		  }
	  
		createTree1(73, 0.1, 20);
		createTree(73, 0.1, -20);
		createTree1(73, 0.1, -32);
		createTree(73, 0.1, 32);
		createTree(73, 0.1, 6);
		createTree1(73, 0.1, -6);

		createTree1(-73, 0.1, 20);
		createTree(-73, 0.1, -20);
		createTree1(-73, 0.1, -32);
		createTree(-73, 0.1, 32);
		createTree(-73, 0.1, 6);
		createTree1(-73, 0.1, -6);
	}

	
	
	

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render(time) {

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}
        time *= 0.001;
        objects.forEach((obj, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        obj.rotation.x = rot;
        obj.rotation.y = rot;
        });

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
