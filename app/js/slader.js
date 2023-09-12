document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    function goToSlide(index) {
        currentIndex = index;
        for (let i = 0; i < totalSlides; i++) {
            slides[i].style.display = i === currentIndex ? "block" : "none";
        }
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    });

    // Инициализация слайдера
    goToSlide(currentIndex);
});
