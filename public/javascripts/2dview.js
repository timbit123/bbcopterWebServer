var scene2d, camera2d, renderer2d;
var container2d;
var bgMesh, aiMesh;
function init2d() {
	container2d = document.getElementById('2dModel');
	scene2d = new THREE.Scene();
	var width = 300, height = 300;
	camera2d = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -100, 1000);
	scene2d.add(camera2d);

	var bgplaneGeo = new THREE.PlaneGeometry(450, 450);
	var bgplaneMat = new THREE.MeshLambertMaterial({
		map : THREE.ImageUtils.loadTexture('/images/bgAI.png'),
		overdraw : true
	});
	bgMesh = new THREE.Mesh(bgplaneGeo, bgplaneMat);
	bgMesh.position.z = 2;
	bgMesh.scale = new THREE.Vector3(0.6, 0.6, 0.6);
	scene2d.add(bgMesh);

	var aiplaneGeo = new THREE.PlaneGeometry(500, 1200);
	var aiplaneMat = new THREE.MeshLambertMaterial({
		map : THREE.ImageUtils.loadTexture('/images/movingAI.png'),
		overdraw : true
	});
	aiMesh = new THREE.Mesh(aiplaneGeo, aiplaneMat);
	aiMesh.position.z = 1;
	aiMesh.scale = new THREE.Vector3(0.6, 0.6, 0.6);
	scene2d.add(aiMesh);

	renderer2d = new THREE.CanvasRenderer();
	renderer2d.setSize(300, 300);
	container2d.appendChild(renderer2d.domElement);
}

var positionY = 0;
init2d();
animate2d();
var speedAnimation = 1, roll2dcurrent = 0, roll2dtogo = 0;
var pitch2dcurrent = 0, pitch2dtogo = 0;

function animate2d() {
	var delta = clock.getDelta();
	//update current
	if (roll2dcurrent != roll2dtogo) {
		if (roll2dcurrent > roll2dtogo) {
			roll2dcurrent -= delta * speedAnimation;
			if (roll2dcurrent < roll2dtogo) {
				roll2dcurrent = roll2dtogo;
			}
		} else {
			roll2dcurrent += delta * speedAnimation;
			if (roll2dcurrent > roll2dtogo) {
				roll2dcurrent = roll2dtogo;
			}
		}
		aiMesh.translateY(-positionY);
		aiMesh.rotation.z = roll2dcurrent;
		console.log(roll2dcurrent);
		//positionY -= delta * 1.5;
		aiMesh.translateY(positionY);
	}

	if (pitch2dcurrent != pitch2dtogo) {
		if (pitch2dcurrent > pitch2dtogo) {
			pitch2dcurrent -= delta * speedAnimation;
			if (pitch2dcurrent < pitch2dtogo) {
				pitch2dcurrent = pitch2dtogo;
			}
		} else {
			pitch2dcurrent += delta * speedAnimation;
			if (pitch2dcurrent > pitch2dtogo) {
				pitch2dcurrent = pitch2dtogo;
			}
		}
	}

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
	requestAnimationFrame(animate2d);
	render2d();

}

makeRotation();
var index = 2;
function makeRotation() {
	index += 10;
	if (index > 360) {
		index -= 360;
	}
	setTimeout(function() {
		aiPitchRollUpdate(0, index);
		console.log(index);
		makeRotation();
	}, 2000);
}

function aiPitchRollUpdate(pitch, roll) {
	if (-180 < pitch < 180 && 0 < roll < 360) {
		roll2dtogo = (Math.PI * roll) / 180;
	}
}

function render2d() {

	renderer2d.render(scene2d, camera2d);

}