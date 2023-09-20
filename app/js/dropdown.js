const menuButton = document.getElementById("menuButton");
const menuContent = document.getElementById("menuContent");

menuButton.addEventListener("mouseenter", function () {
    menuContent.classList.add("show");
});

menuButton.addEventListener("mouseleave", function () {
    menuContent.classList.remove("show");
});

menuContent.addEventListener("mouseenter", function () {
    menuContent.classList.add("show");
});

menuContent.addEventListener("mouseleave", function () {
    menuContent.classList.remove("show");
});
