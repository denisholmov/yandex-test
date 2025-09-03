document.addEventListener('DOMContentLoaded', function () {
  const list = document.querySelector('.tournament-participants__list');
  const items = document.querySelectorAll('.tournament-participants__item');
  const prevBtn = document.querySelector('.controls__btn--prev');
  const nextBtn = document.querySelector('.controls__btn--next');
  const counter = document.querySelector('.controls__counter');

  let currentIndex = 0;
  let isMobile = window.innerWidth <= 768;
  let itemsPerView = isMobile ? 1 : 3;
  let totalSlides = Math.ceil(items.length / itemsPerView);

  function updateSlider() {
    if (!items[0]) return;

    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      itemsPerView = isMobile ? 1 : 3;
      totalSlides = Math.ceil(items.length / itemsPerView);
      currentIndex = 0;
    }

    const itemWidth = items[0].offsetWidth + 40;
    const offset = -currentIndex * itemWidth * itemsPerView;

    list.style.transform = `translateX(${offset}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
    counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function next() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateSlider, 100);
  }

  updateSlider();
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  window.addEventListener('resize', handleResize);
});
