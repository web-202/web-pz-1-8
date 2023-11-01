// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector('.menu')
    const body = document.querySelector('body')
    burger.addEventListener('click', () => {
      if (!menu.classList.contains('active')) {
        menu.classList.add('active')
        burger.classList.add('active-burger')
        body.classList.add('locked')
      } else {
        menu.classList.remove('active')
        burger.classList.remove('active-burger')
        body.classList.remove('locked')
      }
    })
    // Вот тут мы ставим брейкпоинт навбара
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991.98) {
        menu.classList.remove('active')
        burger.classList.remove('active-burger')
        body.classList.remove('locked')
      }
    })
  }
  burgerMenu()
  
  
  // Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
  function fixedNav() {
    const nav = document.querySelector('nav')
  
    // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
    const breakpoint = 1
    if (window.scrollY >= breakpoint) {
      nav.classList.add('fixed__nav')
    } else {
      nav.classList.remove('fixed__nav')
    }
  }
  window.addEventListener('scroll', fixedNav)
  

  const slider = document.querySelector('.slider__cont');
  const slides = document.querySelectorAll('.slider__img');
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
