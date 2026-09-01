'use strict';


/* =========================
   Main Visual Slider
========================= */

const slides = document.querySelectorAll('.visual-slide');
const prevButton = document.querySelector('.visual-prev');
const nextButton = document.querySelector('.visual-next');
const currentSlide = document.querySelector('.current-slide');
const progress = document.querySelector('.indicator-progress');

let currentIndex = 0;
let slideTimer;

const slideDuration = 5000;


const showSlide = (index) => {

    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');

    currentSlide.textContent =
        String(index + 1).padStart(2, '0');

    progress.style.width =
        `${((index + 1) / slides.length) * 100}%`;

};


const nextSlide = () => {

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);

};


const prevSlide = () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    showSlide(currentIndex);

};


const startSlide = () => {

    slideTimer = setInterval(() => {
        nextSlide();
    }, slideDuration);

};


const resetSlideTimer = () => {

    clearInterval(slideTimer);

    startSlide();

};


nextButton.addEventListener('click', () => {

    nextSlide();

    resetSlideTimer();

});


prevButton.addEventListener('click', () => {

    prevSlide();

    resetSlideTimer();

});


showSlide(currentIndex);

startSlide();


/* =========================
   Search
========================= */

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#site-search');
const searchMessage = document.querySelector('.search-message');


searchForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const keyword = searchInput.value.trim();


    if (!keyword) {

        searchMessage.textContent =
            '검색어를 입력해주세요.';

        searchInput.focus();

        return;
    }


    searchMessage.textContent =
        `"${keyword}" 검색 결과를 준비하고 있습니다.`;

});


/* =========================
   Product Slider
========================= */

const productSlides =
    document.querySelectorAll('.product-slide');

const productDots =
    document.querySelectorAll('.product-dot');

const productPrevButtons =
    document.querySelectorAll('.product-prev');

const productNextButtons =
    document.querySelectorAll('.product-next');


let productIndex = 0;


const showProduct = (index) => {

    productSlides.forEach((slide) => {
        slide.classList.remove('active');
    });


    productDots.forEach((dot) => {
        dot.classList.remove('active');
    });


    productSlides[index].classList.add('active');

    productDots[index].classList.add('active');

};


const nextProduct = () => {

    productIndex++;

    if (productIndex >= productSlides.length) {
        productIndex = 0;
    }

    showProduct(productIndex);

};


const prevProduct = () => {

    productIndex--;

    if (productIndex < 0) {
        productIndex = productSlides.length - 1;
    }

    showProduct(productIndex);

};


productNextButtons.forEach((button) => {

    button.addEventListener('click', nextProduct);

});


productPrevButtons.forEach((button) => {

    button.addEventListener('click', prevProduct);

});


productDots.forEach((dot, index) => {

    dot.addEventListener('click', () => {

        productIndex = index;

        showProduct(productIndex);

    });

});


showProduct(productIndex);


/* =========================
   Numbers Counter
========================= */

const counters =
    document.querySelectorAll('.counter');


const animateCounter = (counter) => {

    const target =
        Number(counter.dataset.target);

    const duration = 1600;

    const startTime = performance.now();


    const updateCounter = (currentTime) => {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue =
            Math.floor(target * easedProgress);

        counter.textContent =
            currentValue.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent =
                target.toLocaleString();

        }

    };


    requestAnimationFrame(updateCounter);

};


/* 숫자 영역이 화면에 들어왔을 때 실행 */

const numbersSection =
    document.querySelector('.numbers-section');


let counterStarted = false;


const counterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting &&
                    !counterStarted
                ) {

                    counterStarted = true;

                    counters.forEach((counter) => {
                        animateCounter(counter);
                    });

                }

            });

        },
        {
            threshold: 0.3
        }
    );


counterObserver.observe(numbersSection);