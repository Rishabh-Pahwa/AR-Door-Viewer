import * as THREE from "three";
import * as THREEx from "../node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";


//SWITCH LOADER
const swapper = document.querySelector(".swapper");
const swapperOverlay = document.querySelector(".swapper-overlay");
function swap() {
  swapperOverlay.style.display = "block";
  swapper.style.display = "block";

  setTimeout(function () {
    swapperOverlay.style.display = "none";
    swapper.style.display = "none";
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {


  const leftArrowButton = document.getElementById("leftArrow");
  const rightArrowButton = document.getElementById("rightArrow");

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let param1 = params.param1;
  let param2 = params.param2;
  let doormodel = params.doortype;

  // EVERYTIME THIS PAGE LOADS I is RESET
  let i = 0; 
  const DD_design = ["DDpm.png", "DDmodel.png", "SDmodel.png"];
  const SD_design = ["SDpm.png", "SDmodel.png", "DDmodel.png"];
  let doorpath = "../assets/";
  function DoorStyle(Door) {
    doorpath = "../assets/";
    switch (Door) {
      case "DoorDD":
        doorpath += DD_design[i];
        break;
      case "DoorSD":
        doorpath += SD_design[i];
        break;
      default:
        doorpath += "SDpm.png";
    }
  }

  //MAIN
  function main(W, H, doorpath) {
    corner();
    const canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    const camera = new THREE.PerspectiveCamera(
      130,
      window.innerWidth / window.innerHeight,
      0.6,
      10000
    ); // PLANE
    //const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setSize(window.innerWidth, window.innerHeight);

    const arjs = new THREEx.LocationBased(scene, camera);
    const cam = new THREEx.WebcamRenderer(renderer);

    // DOOR PLANE METHOD
    const geometry = new THREE.PlaneGeometry(W, H);
    const texture = new THREE.TextureLoader().load(doorpath);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const plane = new THREE.Mesh(geometry, material);
    arjs.add(plane, -0.72, 51.051); // WORKING

    arjs.fakeGps(-0.72, 51.05); //WORKING

    //HERE WAS COMMENTED CODE FOR GPS DOOR FIXING

    requestAnimationFrame(render);

    // PAUSE BACKGROUD RENDERING <------
    let isPageVisible = true;

    document.addEventListener("visibilitychange", () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        requestAnimationFrame(render);
      }
    });

    function render() {
      if (!isPageVisible) {
        return;
      }
      //------>
      if (
        canvas.width != canvas.clientWidth ||
        canvas.height != canvas.clientHeight
      ) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        const aspect = canvas.clientWidth / canvas.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
      }
      // Update the scene using the latest sensor readings
      // deviceOrientationControls.update();

      // Initialize elements
      const fixButton = document.getElementById("fixButton");

      // FOR FIX-RESET BUTTON
      if (updatesEnabled) {
        cam.update();
        if (updatesEnabled) {
          renderer.render(scene, camera);
        }
      }

      fixButton.style.opacity = updatesEnabled ? "0.9" : "0.75";
      // cam.update();
      //   renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

  // FIX - RESET BUTTON
  let updatesEnabled = true;

  // const fixButton = document.getElementById("fixButton");
  // fixButton.addEventListener("click", toggleUpdates);

  // Hide arrow buttons when fix button is clicked
  fixButton.addEventListener("click", () => {
    toggleUpdates();
    toggleArrowButtonsVisibility();
  });

  function toggleUpdates() {
    updatesEnabled = !updatesEnabled;
    if (updatesEnabled) {
      fixButton.textContent = "Fix Door";
    } else {
      fixButton.textContent = "Reset";
    }
  }

  function toggleArrowButtonsVisibility() {
    if (updatesEnabled) {
      // leftArrowButton.style.display = "block";
      // rightArrowButton.style.display = "block";
      corner();
    } else {
      leftArrowButton.style.display = "none";
      rightArrowButton.style.display = "none";
    }
  }

  DoorStyle(doormodel);
  main(param1, param2, doorpath);

  // CORNER
  function corner() {
    if (i == 0) {
      leftArrowButton.style.display = "none";
      rightArrowButton.style.display = "block";
    } else leftArrowButton.style.display = "block";

    if (i == DD_design.length - 1) {
      rightArrowButton.style.display = "none";
      leftArrowButton.style.display = "block";
    } else rightArrowButton.style.display = "block";
  }
  // ARROW BUTTONS
  leftArrowButton.addEventListener("click", () => {
    i--;
    swap();
    DoorStyle(doormodel);
    main(param1, param2, doorpath);
  });
  rightArrowButton.addEventListener("click", () => {
    i++;
    swap();
    DoorStyle(doormodel);
    main(param1, param2, doorpath);
  });
});