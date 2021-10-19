const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const webp = require('imagemin-webp');

// Минификация и оптимизация изображений WebP

module.exports = function webP() {
  return src([
    'dev/static/images/**/*.{png,jpg,webp}',
    '!dev/static/images/sprite/**/*',
  ])
    .pipe(newer('dist/static/images/'))
    .pipe(
      imagemin([
        webp({
          quality: 75,
        }),
      ]),
    )
    .pipe(
      rename({
        extname: '.webp',
      }),
    )
    .pipe(dest('dist/static/images/'));
};
