			var container, stats;

			var camera, scene, renderer, objects;
			var particleLight, pointLight;
			var dae, skin;

			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load('quad.dae', function(collada) {

				dae = collada.scene;
				console.log(collada);
				skin = collada.dae.scene.nodes[0].geometries[0].instance_material[0];
				console.log(skin);
				var black = new THREE.MeshBasicMaterial({
					color : 0x000000
				});
				var charcol = new THREE.MeshBasicMaterial({
					color : 0x252525
				});
				//middle plate
				collada.scene.children[0].children[0].material = black.clone();
				collada.scene.children[0].children[1].material = black.clone();

				//front bar
				collada.scene.children[0].children[2].material = charcol.clone();
				collada.scene.children[0].children[3].material = charcol.clone();

				//rear bar
				collada.scene.children[0].children[4].material = new THREE.MeshBasicMaterial({
					color : 0x4B4B4B
				});
				collada.scene.children[0].children[5].material = new THREE.MeshBasicMaterial({
					color : 0x4B4B4B
				});

				//stands
				collada.scene.children[0].children[6].material = black.clone();
				collada.scene.children[0].children[7].material = black.clone();
				collada.scene.children[0].children[8].material = black.clone();
				collada.scene.children[0].children[9].material = black.clone();
				collada.scene.children[0].children[10].material = black.clone();
				collada.scene.children[0].children[11].material = black.clone();
				collada.scene.children[0].children[12].material = black.clone();
				collada.scene.children[0].children[13].children[0].children[0].material = black.clone();
				collada.scene.children[0].children[13].children[0].children[1].material = black.clone();
				collada.scene.children[0].children[13].children[0].children[2].material = black.clone();
				collada.scene.children[0].children[13].children[1].children[0].material = black.clone();
				collada.scene.children[0].children[13].children[1].children[1].material = black.clone();
				collada.scene.children[0].children[13].children[1].children[2].material = black.clone();

				collada.scene.children[0].children[14].children[0].children[0].material = black.clone();
				collada.scene.children[0].children[14].children[0].children[1].material = black.clone();
				collada.scene.children[0].children[14].children[0].children[2].material = black.clone();
				collada.scene.children[0].children[14].children[1].children[0].material = black.clone();
				collada.scene.children[0].children[14].children[1].children[1].material = black.clone();
				collada.scene.children[0].children[14].children[1].children[2].material = black.clone();

				collada.scene.children[0].children[15].children[0].children[0].material = black.clone();
				collada.scene.children[0].children[15].children[0].children[1].material = black.clone();
				collada.scene.children[0].children[15].children[0].children[2].material = black.clone();
				collada.scene.children[0].children[15].children[1].children[0].material = black.clone();
				collada.scene.children[0].children[15].children[1].children[1].material = black.clone();
				collada.scene.children[0].children[15].children[1].children[2].material = black.clone();

				collada.scene.children[0].children[16].children[0].children[0].material = black.clone();
				collada.scene.children[0].children[16].children[0].children[1].material = black.clone();
				collada.scene.children[0].children[16].children[0].children[2].material = black.clone();
				collada.scene.children[0].children[16].children[1].children[0].material = black.clone();
				collada.scene.children[0].children[16].children[1].children[1].material = black.clone();
				collada.scene.children[0].children[16].children[1].children[2].material = black.clone();

				//motor and support
				collada.scene.children[0].children[17].children[0].children[0].material = new THREE.MeshBasicMaterial({
					color : 0xB1B1B1
				});
				collada.scene.children[0].children[17].children[0].children[1].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[17].children[0].children[2].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[17].children[0].children[3].material = new THREE.MeshBasicMaterial({
					color : 0xC1C1C1
				});
				collada.scene.children[0].children[17].children[0].children[4].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});

				collada.scene.children[0].children[18].children[0].children[0].material = new THREE.MeshBasicMaterial({
					color : 0xB1B1B1
				});
				collada.scene.children[0].children[18].children[0].children[1].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[18].children[0].children[2].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[18].children[0].children[3].material = new THREE.MeshBasicMaterial({
					color : 0xC1C1C1
				});
				collada.scene.children[0].children[18].children[0].children[4].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});

				collada.scene.children[0].children[19].children[0].children[0].material = new THREE.MeshBasicMaterial({
					color : 0xB1B1B1
				});
				collada.scene.children[0].children[19].children[0].children[1].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[19].children[0].children[2].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[19].children[0].children[3].material = new THREE.MeshBasicMaterial({
					color : 0xC1C1C1
				});
				collada.scene.children[0].children[19].children[0].children[4].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});

				collada.scene.children[0].children[20].children[0].children[0].material = new THREE.MeshBasicMaterial({
					color : 0xB1B1B1
				});
				collada.scene.children[0].children[20].children[0].children[1].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[20].children[0].children[2].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});
				collada.scene.children[0].children[20].children[0].children[3].material = new THREE.MeshBasicMaterial({
					color : 0xC1C1C1
				});
				collada.scene.children[0].children[20].children[0].children[4].material = new THREE.MeshBasicMaterial({
					color : 0xD1D1D1
				});

				dae.scale.x = dae.scale.y = dae.scale.z = 0.04;
				dae.updateMatrix();
				dae.position.y = 2.5

				init();
				animate();

			});

			function init() {

				container = document.getElementById('3dModel');

				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
				camera.position.set(100, 300, 100);

				scene = new THREE.Scene();

				// Grid

				var size = 14, step = 1;

				var geometry = new THREE.Geometry();
				var material = new THREE.LineBasicMaterial({
					color : 0x303030
				});

				for (var i = -size; i <= size; i += step) {

					geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
					geometry.vertices.push(new THREE.Vector3(size, -0.04, i));

					geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
					geometry.vertices.push(new THREE.Vector3(i, -0.04, size));

				}

				var line = new THREE.Line(geometry, material, THREE.LinePieces);
				scene.add(line);

				// Add the COLLADA

				scene.add(dae);

				particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
					color : 0xffffff
				}));
				scene.add(particleLight);

				// Lights

				scene.add(new THREE.AmbientLight(0xcccccc));

				var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee);
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add(directionalLight);

				pointLight = new THREE.PointLight(0xffffff, 4);
				pointLight.position = particleLight.position;
				scene.add(pointLight);

				renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);

				container.appendChild(renderer.domElement);

				//

				window.addEventListener('resize', onWindowResize, false);

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize(window.innerWidth, window.innerHeight);

			}

			//

			var t = 0;
			var clock = new THREE.Clock();

			function animate() {

				var delta = clock.getDelta();

				requestAnimationFrame(animate);
				/*
				 if ( t > 1 ) t = 0;

				 if ( skin ) {

				 // guess this can be done smarter...

				 // (Indeed, there are way more frames than needed and interpolation is not used at all
				 //  could be something like - one morph per each skinning pose keyframe, or even less,
				 //  animation could be resampled, morphing interpolation handles sparse keyframes quite well.
				 //  Simple animation cycles like this look ok with 10-15 frames instead of 100 ;)

				 for ( var i = 0; i < skin.morphTargetInfluences.length; i++ ) {

				 skin.morphTargetInfluences[ i ] = 0;

				 }

				 skin.morphTargetInfluences[ Math.floor( t * 30 ) ] = 1;

				 t += delta;

				 }*/

				render();

			}

			function render() {

				var timer = Date.now() * 0.00015;

				camera.position.x = Math.cos(timer) * 15;
				camera.position.y = 10;
				camera.position.z = Math.sin(timer) * 15;

				camera.lookAt(dae.position);

				particleLight.position.x = Math.sin(timer * 4) * 3009;
				particleLight.position.y = Math.cos(timer * 5) * 4000;
				particleLight.position.z = Math.cos(timer * 4) * 3009;

				renderer.render(scene, camera);

			}