// WITHOUT OVERLAY

// window.addEventListener("load", function(){
//     setTimeout(
//         function open(event){
//             document.querySelector(".popup").style.display = "block";
//         },
//         500
//     )
// });
// document.querySelector("#close").addEventListener("click", function(){
//     document.querySelector(".popup").style.display = "none";
// });


// WITH OVERLAY
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function open() {
        document.querySelector(".popup-overlay").style.display = "block";
        document.querySelector(".popup").style.display = "block";
    }, 500);
});

document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup-overlay").style.display = "none";
    document.querySelector(".popup").style.display = "none";
});