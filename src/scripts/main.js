$(() => {
  initBurgerMenu();

  $("#video-play-action").on("click", function (evt) {
    evt.preventDefault();

    $(this).css({ display: "none" });
    $(".video__container").css({ background: "none" });
    $("#video-player").css({ display: "block" });
  });

  initProgramSlider($(".program__slider"));
  initReviewSlider($(".review__slider"));

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    items: 1,
  });

  $(".gallery__slider").magnificPopup({
    delegate: "img",
    type: "image",
    callbacks: {
      elementParse: (item) => (item.src = item.el.attr("src")),
    },
  });

  const $popupContainer = $(".popup-container");
  $popupContainer
    .find(".popup__cancel")
    .on("click", () => $popupContainer.css({ display: "none" }));
  $popupContainer
    .find(".popup__btn")
    .on("click", () => $popupContainer.css({ display: "none" }));

  $("#create-order").on("click", function (evt) {
    evt.preventDefault();

    if (isFormValid()) {
      sendForm();
    }
  });

  new WOW({
    animateClass: "animate__animated",
  }).init();

  const $element = $("#phone-number");
  const maskOptions = {
    mask: "+{7}(000)000-00-00",
    lazy: false,
  };
  const mask = IMask($element.get(0), maskOptions);
});

function isFormValid() {
  const $orderForm = $("#order-form");

  let isValid = true;

  $orderForm.find(".order__form-control").each(function () {
    const $control = $(this);

    if (
      !(
        ($control.is("input") &&
          (($control.attr("type") === "text" && $control.val()) ||
            ($control.attr("type") === "tel" &&
              !$control.val().includes("_")))) ||
        $control
          .find("input")
          .toArray()
          .some((item) => $(item).is(":checked"))
      )
    ) {
      const messageText = "Необходимо заполнить";
      if (!$control.next().hasClass("error-message")) {
        $control
          .after($("<p></p>").text(messageText).addClass("error-message"))
          .addClass("error-border");
      }

      isValid &&= false;
    } else {
      $control.removeClass("error-border");

      if ($control.next().hasClass("error-message")) {
        $control.next().remove();
      }
    }

    isValid &&= true;
  });

  return isValid;
}

function initBurgerMenu() {
  const $headerCancelButton = $("#header-cancel");
  const $navigationMenu = $(".header__navigation-menu");
  $("#burger-button").on("click", function (evt) {
    toggleBurgerMenu($headerCancelButton, $navigationMenu);
  });

  $navigationMenu
    .find($(".header__link"))
    .on("click", () => toggleBurgerMenu($headerCancelButton, $navigationMenu));

  $headerCancelButton.on("click", () =>
    toggleBurgerMenu($headerCancelButton, $navigationMenu)
  );
}

function toggleBurgerMenu($headerCancelButton, $navigationMenu) {
  if ($headerCancelButton.css("display") !== "none") {
    $navigationMenu.css({ display: "none" });
    $headerCancelButton.css({ display: "none" });
  } else {
    $navigationMenu.css({ display: "flex" });
    $headerCancelButton.css({ display: "block" });
  }
}

function sendForm() {
  let $loader = $(".loader");
  $loader.css("display", "flex");
  offScroll();

  $.ajax({
    type: "POST",
    url: "https://testologia.ru/checkout",
    data: $("#order-form").serialize(),
  }).done(function (response) {
    $loader.hide();
    onScroll();

    if (response.success) {
      $(".popup-container").css({ display: "block" });
    } else {
      alert(
        "Возникла ошибка при отправке заявки, позвоните нам и сообщите нам о проблеме."
      );
    }
  });
}

function offScroll() {
  $("html, body").css({
    overflow: "hidden",
  });
}

function onScroll() {
  $("html, body").css({
    overflow: "auto",
  });
}

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
      $(this).css({ display: "grid" });
    } else {
      $(this).css({ display: "none" });
    }
  });
}

function initProgramSlider($slider) {
  const $prevButton = $slider.find(".slider-btn_prev");
  const $nextButton = $slider.find(".slider-btn_next");
  const $slides = $slider.find(".program__tour");
  $slides.currentSlide = 0;

  $prevButton.on("click", () => showPreviousSlide($slides));
  $nextButton.on("click", () => showNextSlide($slides));

  updateSlider($slides);
}

function initReviewSlider($slider) {
  const $prevButton = $slider.find(".slider-btn_prev");
  const $nextButton = $slider.find(".slider-btn_next");
  const $slides = $slider.find(".review-card");
  $slides.currentSlide = 0;

  $prevButton.on("click", () => showPreviousSlide($slides));
  $nextButton.on("click", () => showNextSlide($slides));

  updateSlider($slides);
}
