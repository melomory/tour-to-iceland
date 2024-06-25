$(() => {
  $("#video-play-action").on("click", function (evt) {
    evt.preventDefault();

    $(this).css({ display: "none" });
    $(".video__container").css({ background: "none" });
    $("#video-player").css({ display: "block" });
  });
});
