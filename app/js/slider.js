$(document).ready(function () {
    const slides = $(".slide");
    const dots = $(".dot");

    let currentIndex = 0;

    function showSlide(index) {
        slides.hide();
        slides.eq(index).show();
        dots.removeClass("active");
        dots.eq(index).addClass("active");
    }

    dots.click(function () {
        const index = dots.index(this);
        currentIndex = index;
        showSlide(index);
    });

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 6000);

    showSlide(currentIndex);
});

const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

const slides = slider.querySelectorAll(".slide");

let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide) => {
        slide.style.display = "none";
    });
    slides[index].style.display = "block";

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    showSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
});

showSlide(currentIndex);
