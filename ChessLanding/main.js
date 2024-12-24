const points = document.querySelectorAll('.stages__point');
const stages = document.querySelectorAll('.stages__item-mobile');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const carouselLine = document.querySelector('.carousel__line');
const buttonNext = document.querySelector('.button-next');
const buttonPrev = document.querySelector('.button-prev');
const page = document.querySelector('.carousel-page');
const btnMobileNext = document.querySelector('.carousel__right-btn');
const btnMobilePrev = document.querySelector('.carousel__left-btn');
const pageMobile = document.querySelector('.carousel__page-mobile');

let counter = 0;
let offset = 0;
let pageNumber = 1;
let interval = 1000 * 4;
let timer = setInterval(autoSlide, interval);

// Инициализация
function init() {
  points[0].classList.add('active-point');
  stages[0].classList.add('active-stage');
  page.innerHTML = "3<span>/6</span>";
  pageMobile.innerHTML = `${pageNumber}<span>/6</span>`;
  updateBtnStates();
  updateCarouselPosition();
}

// Обновление состояний кнопок
function updateBtnStates() {
  leftBtn.disabled = counter === 0;
  rightBtn.disabled = counter >= stages.length - 1;

  buttonPrev.disabled = offset === 0;
  buttonNext.disabled = offset >= 1222;

  btnMobilePrev.disabled = offset === 0;
  btnMobileNext.disabled = offset === 1600;
}

// Обновление состояния карусели
function updateCarouselPosition() {
  carouselLine.style.left = -offset + 'px';
  page.innerHTML = `${pageNumber}<span>/6</span>`;
  pageMobile.innerHTML = `${pageNumber}<span>/6</span>`;
}

// Удаление активных классов
function resetActiveClasses() {
  points.forEach(point => point.classList.remove('active-point'));
  stages.forEach(stage => stage.classList.remove('active-stage'));
}

// Переход по точкам
function changeStage(newCounter) {
  resetActiveClasses();
  counter = newCounter;
  updateBtnStates();
  stages[counter].classList.add('active-stage');
  points[counter].classList.add('active-point');
}

// Обработчик кликов по точкам
points.forEach((point, index) => {
  point.addEventListener('click', () => changeStage(index));
});

// Логика слайдера для левых/правых кнопок
leftBtn.addEventListener('click', () => {
  changeStage(counter - 1);
});

rightBtn.addEventListener('click', () => {
  changeStage(counter + 1);
});

// Автопереход
function autoSlide() {
  counter = (counter + 1) % stages.length;
  changeStage(counter);
}

// Логика слайдера для кнопок карусели
buttonNext.addEventListener('click', () => {
  offset += 1222;
  pageNumber = offset === 1222 ? 6 : 3;
  updateBtnStates();
  updateCarouselPosition();
});

buttonPrev.addEventListener('click', () => {
  offset -= 1222;
  pageNumber = offset === 0 ? 3 : 6;
  updateBtnStates();
  updateCarouselPosition();
});

// Карусель для мобильных
btnMobileNext.addEventListener('click', () => {
  offset += 320;
  pageNumber++;
  updateBtnStates();
  updateCarouselPosition();
});

btnMobilePrev.addEventListener('click', () => {
  offset -= 320;
  pageNumber--;
  updateBtnStates();
  updateCarouselPosition();
});

init();
