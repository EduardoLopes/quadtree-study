var gulp = require('gulp');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var jasmine = require('gulp-jasmine');

gulp.task('watch', function() {

  livereload.listen();

  gulp.watch(['js/**/*', 'css/**/*', '**/*.html']).on('change', livereload.changed);

});