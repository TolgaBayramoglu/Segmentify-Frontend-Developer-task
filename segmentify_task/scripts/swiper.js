const swiper = new Swiper(".swiper-container", {
  lazy: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 1.8,
      spaceBetween: 8,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 17,
    },
    1368: {
      slidesPerView: 4.23,
      spaceBetween: 17,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
