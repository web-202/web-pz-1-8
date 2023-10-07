document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel-container").forEach((carousel) => {

    carousel.querySelector(".prev").addEventListener("click", () => {
      minusItem(carousel);
    });

    carousel.querySelector(".next").addEventListener("click", () => {
      plusItem(carousel);
    });

    showItems(carousel, 0);
  });
});

function plusItem(carousel) {
  let item = currentItem(carousel);

  carousel
    .querySelectorAll(".item")
    [item].nextElementSibling.classList.contains("item")
    ? showItems(carousel, item + 1)
    : showItems(carousel, 0);
}

function minusItem(carousel) {
  let item = currentItem(carousel);

  carousel.querySelectorAll(".item")[item].previousElementSibling != null
    ? showItems(carousel, item - 1)
    : showItems(carousel, carousel.querySelectorAll(".item").length - 1);
}

function currentItem(carousel) {
  return [...carousel.querySelectorAll(".item")].findIndex(
    (item) => item.style.display === "block"
  );
}

function showItems(carousel, item) {
  if (carousel.querySelectorAll(".item")[currentItem(carousel)] !== undefined)
    carousel.querySelectorAll(".item")[currentItem(carousel)].style.display =
      "none";
  carousel.querySelectorAll(".item")[item].style.display = "block";

  if (carousel.querySelector(".dot.active") != null)
    carousel.querySelector(".dot.active").classList.remove("active");
  carousel.querySelectorAll(".dot")[item].classList.add("active");
}
