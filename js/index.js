class TournamentSlider {
  constructor() {
    this.list = document.querySelector('.tournament-participants__list');
    this.items = document.querySelectorAll('.tournament-participants__item');
    this.prevBtn = document.querySelector('.controls__btn--prev');
    this.nextBtn = document.querySelector('.controls__btn--next');
    this.counter = document.querySelector('.controls__counter');

    this.currentIndex = 0;
    this.itemsPerView = 3;
    this.totalSlides = Math.ceil(this.items.length / this.itemsPerView);

    this.init();
  }

  init() {
    this.updateSlider();

    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    window.addEventListener('resize', () => this.handleResize());
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  updateSlider() {
    const itemWidth = this.items[0].offsetWidth + 40; // width + margin
    const offset = -this.currentIndex * itemWidth * this.itemsPerView;
    this.list.style.transform = `translateX(${offset}px)`;

    this.updateButtons();
    this.updateCounter();
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
  }

  updateCounter() {
    const current = this.currentIndex + 1;
    this.counter.textContent = `${current} / ${this.totalSlides}`;
  }

  handleResize() {
    this.updateSlider();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TournamentSlider();
});
