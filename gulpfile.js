var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    del     = require('del'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS  = require('gulp-minify-css'),
    ghPages = require('gulp-gh-pages');

gulp.task('minify', function () {
  gulp.src('assets/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified/js'));

  gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('minified/html/'))

  gulp.src('assets/css/*.css')
   .pipe(minifyCSS({keepBreaks:true}))
   .pipe(gulp.dest('minified/css'))
});

gulp.task('clean', function(cb) {
  del(['minified/*'], cb);
});

gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});
