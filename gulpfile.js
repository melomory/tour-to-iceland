"use strict";

const { series, src, dest } = require("gulp");
const watch = require("gulp-watch");
const less = require("gulp-less");
const path = require("path");
const cleanCSS = require("gulp-clean-css");
const lessPluginAutoPrefix = require("less-plugin-autoprefix");
const autoprefix = new lessPluginAutoPrefix({ browsers: ["last 2 versions"] });
const rename = require("gulp-rename");
const terser = require("gulp-terser");

function copy(cb) {
  src(["src/index.html", "src/!(styles|scripts)**"], { encoding: false }).pipe(
    dest("dist")
  );
  src(
    [
      "node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
      "node_modules/owl.carousel/dist/assets/owl.theme.default.min.css",
    ],
    { encoding: false }
  ).pipe(dest("dist/styles/owlcarousel"));

  src(["node_modules/magnific-popup/dist/magnific-popup.css"], {
    encoding: false,
  }).pipe(dest("dist/styles/magnific-popup"));

  src(["node_modules/animate.css/animate.min.css"], {
    encoding: false,
  }).pipe(dest("dist/styles/animate.css"));

  cb();
}

function processStyles(cb) {
  src("src/styles/main.less")
    .pipe(
      less({
        plugins: [autoprefix],
      })
    )
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(rename("main.min.css"))
    .pipe(dest("dist/styles"));

  cb();
}

function processScripts(cb) {
  src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/owl.carousel/dist/owl.carousel.min.js",
    "node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
    "node_modules/wowjs/dist/wow.min.js",
    "node_modules/imask/dist/imask.min.js",
  ]).pipe(dest("dist/scripts"));

  src(["src/scripts/main.js"]).pipe(terser()).pipe(rename("main.min.js")).pipe(dest("dist/scripts"));

  cb();
}

exports.build = series(copy, processStyles, processScripts);
exports.watch = () =>
  watch(
    ["src/*.html", "src/**/*.css", "src/**/*.less", "src/**/*.js"],
    series(copy, processStyles, processScripts)
  );
