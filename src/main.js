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
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'lightBlue' );

	{

		const planeSize = 40;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );//got this from the website that was provided in the assignment
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	{

		const skyColor = 0xB1E1FF; // light blue
		const groundColor = 0xB97A20; // brownish orange
		const intensity = 3;
		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );;//got this from the website that was provided in the assignment
		scene.add( light );

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
		{
			const color = 0x800080; // White color
			const intensity = 5;
		  
			const ambientLight = new THREE.AmbientLight(color, intensity);
			scene.add(ambientLight);
		  }
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
        root.position.y = 2.31;
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

        
        function makeInstance(geometry, color, x,y,z, texture) {
            const material = new THREE.MeshPhongMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            return mesh;
        }
  
        const loader = new THREE.TextureLoader();
        const texture = loader.load('lib/coolCat.jpg');
        texture.colorSpace = THREE.SRGBColorSpace;

        objects = [
            makeInstance(boxGeometry, 0x44aa88, -5,5,0, texture),
            makeInstance(cylinderGeometry, 0x8844aa, -5,5,3, null),
            makeInstance(pyramidGeometry, 0xaa8844, -5,5,-3, null),
        ];

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
