const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.img');
const buttons = document.querySelectorAll('.slider-button');

let currentIndex = 0;

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentIndex);
    });
}

setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}, 5000); // Автоматическая смена слайдов каждые 5 секунд

updateSlider(); // Начать с первого слайда