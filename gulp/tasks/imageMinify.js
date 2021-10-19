const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const pngQuant = require('imagemin-pngquant');
const jpegRecompress = require('imagemin-jpeg-recompress');

// Минификация и оптимизация изображений

module.exports = function imageMinify() {
  return src([
    'dev/static/images/**/*.{gif,png,jpg,svg,webp}',
    '!dev/static/images/sprite/**/*',
  ])
    .pipe(newer('dist/static/images/'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
        pngQuant(),
        jpegRecompress(),
      ]),
    )
    .pipe(dest('dist/static/images/'));
};
