
  // PC BLOCKER POP-UP 

  var userAgent = navigator.userAgent.toLowerCase();

  // Check if the user is on Windows, macOS, or Linux and not on mobile devices
  if ((userAgent.indexOf('win') > -1 || userAgent.indexOf('mac') > -1 || userAgent.indexOf('linux') > -1) &&
      !(userAgent.indexOf('android') > -1 || userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1)) {
      // Show the overlay and popup
      var overlay = document.getElementById("qr-popup");
      overlay.style.display = "flex";
  }

document.addEventListener("DOMContentLoaded", function () {
  

// NAVBAR 
  let menu = document.querySelector("#menu-icon");
  let navList = document.querySelector(".nav-list");
  const unitconv=78.5714;

  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navList.classList.toggle("open");
  };
  // GLOBAL VARIABLES
  let ar_url = "./src/ar.html";

  // D1 OPT1
  const link_d1_opt1 = document.getElementById("d1_opt1");
  link_d1_opt1.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    DoorStyle("DoorDD");
    Size8x3();
  });
  // D1 OPT2
  const link_d1_opt2 = document.getElementById("d1_opt2");
  link_d1_opt2.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    DoorStyle("DoorDD");
    Size7x3();
  });

  // D1 CUSTOM
  const customSizeListItem = document.getElementById("d1_custom");
  const customSizeInputs = document.querySelector(".custom-size-inputs");
  const widthInput = document.getElementById("widthInput");
  const heightInput = document.getElementById("heightInput");
  const goButton = document.getElementById("goButton");

  customSizeListItem.addEventListener("click", function () {
    customSizeInputs.style.display = "block";
  });

        // D1 GO BUTTON
  goButton.addEventListener("click", function () {
    const width = parseFloat(widthInput.value);
    const height = parseFloat(heightInput.value);

    if (!isNaN(width) && !isNaN(height) && width > 0 && width < 30 && height > 0 && height < 30) {
        DoorStyle("DoorDD");
        custom_size(width,height);
    } else {
      console.log("Invalid input");
    }
  });


  // D2 OPT1
  const link_d2_opt1 = document.getElementById("d2_opt1");
  link_d2_opt1.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    DoorStyle("DoorSD");
    Size8x3();
  });
  // D2 OPT2
  const link_d2_opt2 = document.getElementById("d2_opt2");
  link_d2_opt2.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    DoorStyle("DoorSD");
    Size7x3();
  });

  // D2 CUSTOM
  const customSizeListItem2 = document.getElementById("d2_custom");
  const customSizeInputs2 = document.querySelector(".custom-size-inputs2");
  const widthInput2 = document.getElementById("widthInput2");
  const heightInput2 = document.getElementById("heightInput2");
  const goButton2 = document.getElementById("goButton2");

  customSizeListItem2.addEventListener("click", function () {
    customSizeInputs2.style.display = "block";
  });

        // D2 GO BUTTON
  goButton2.addEventListener("click", function () {
    const width = parseFloat(widthInput2.value);
    const height = parseFloat(heightInput2.value);

    if (!isNaN(width) && !isNaN(height) && width > 0 && width < 30 && height > 0 && height < 30) {
        DoorStyle("DoorSD");
        custom_size(width,height);
    } else {
      console.log("Invalid input");
    }
  });

  // 8X3 (PRESET-1)
  function Size8x3() {
    const param1Value = 235.714; // Width
    const param2Value = 628.58; // Height
    ar_url += "&param1=" + param1Value + "&param2=" + param2Value;
    window.location.href = ar_url;
  }
  // 7X3 (PRESET-2)
  function Size7x3() {
    const param1Value = 235.714; // Width
    const param2Value = 550; // Height
    ar_url += "&param1=" + param1Value + "&param2=" + param2Value;

    window.location.href = ar_url;
  }

  // CUSTOM SIZE DOOR
  function custom_size(width, height){
    const param1Value = width*unitconv; // Width
    const param2Value = height*unitconv; // Height
    ar_url += "&param1=" + param1Value + "&param2=" + param2Value;

    window.location.href = ar_url;

  }


function DoorStyle(Door){
  ar_url = "./src/ar.html";
  ar_url += "?doortype=" + Door;
    
}
});
