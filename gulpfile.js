var gulp = require('gulp');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var jasmine = require('gulp-jasmine');

gulp.task('watch', function() {

  livereload.listen();

  gulp.watch(['js/**/*', 'css/**/*', '**/*.html']).on('change', livereload.changed);

});

// gulp.task('test', function () {
//     return gulp.src('tests/quadtree-test.js', {read: false})
//         .pipe(mocha());
// });

gulp.task('test', function () {
  return gulp.src('tests/quadtree-test.js')
    .pipe(jasmine());
});