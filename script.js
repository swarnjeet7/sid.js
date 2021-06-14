// console.log($("h3"));
// console.log($("li", ".one"));
// console.log(sid("#box").addClass("bongjos"));
// console.log(sid(document.querySelector("h2")));
// console.log(sid("ul"));

// console.log(sid("#box"));

// document.querySelectorAll(".heading").forEach(function (el) {
//   el.addEventListener("click", function () {
//     alert("click");
//   });
// });

// document.body.addEventListener("click", function () {
//   alert("click");
// });

// jQuery(".heading").click(function (event) {
//   event.stopPropagation();
//   alert("clicked");
// });

// jQuery(".list").append(jQuery(".heading"));

sid(".heading").click(function (event) {
  event.stopPropagation();
  alert("clicked");
});

sid(".list").append(sid(".heading"));
