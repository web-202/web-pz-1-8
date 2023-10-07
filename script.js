const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;

function showSlide(index) {
    const slides = slider.querySelectorAll('img');
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slider.querySelectorAll('img').length - 1;
    }
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= slider.querySelectorAll('img').length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

showSlide(currentIndex);
