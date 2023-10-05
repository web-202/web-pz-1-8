const slides = document.querySelectorAll('.slide');
let current = 0;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const showSlide = (index) => {
    debugger
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function next() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prev() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

showSlide(current);