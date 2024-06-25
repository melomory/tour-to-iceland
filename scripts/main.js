$(() => {
  $("#video-play-action").on("click", function (evt) {
    evt.preventDefault();

    $(this).css({ display: "none" });
    $(".video__container").css({ background: "none" });
    $("#video-player").css({ display: "block" });
  });


  initProgramSlider($(".program__slider"));
  initReviewSlider($(".review__slider"));
});

function showPreviousSlide($slides) {
  $slides.currentSlide =
    ($slides.currentSlide - 1 + $slides.length) % $slides.length;
  updateSlider($slides);
}

function showNextSlide($slides) {
  $slides.currentSlide = ($slides.currentSlide + 1) % $slides.length;
  updateSlider($slides);
}

function updateSlider($slides) {
  $slides.each(function (index) {
    if (index === $slides.currentSlide) {
      $(this).css({display: "grid"});
    } else  {
      $(this).css({display: "none"});
    }
  })
}

function initProgramSlider($slider) {
  const $prevButton = $slider.find(".slider-btn_prev");
  const $nextButton = $slider.find(".slider-btn_next");
  const $slides = $slider.find(".program__tour");
  $slides.currentSlide = 0;

  $prevButton.on("click", () => showPreviousSlide($slides));
  $nextButton.on("click", () => showNextSlide($slides));

  updateSlider($slides) 
}

function initReviewSlider($slider) {
  const $prevButton = $slider.find(".slider-btn_prev");
  const $nextButton = $slider.find(".slider-btn_next");
  const $slides = $slider.find(".review-card");
  $slides.currentSlide = 0;

  $prevButton.on("click", () => showPreviousSlide($slides));
  $nextButton.on("click", () => showNextSlide($slides));

  updateSlider($slides) 
}