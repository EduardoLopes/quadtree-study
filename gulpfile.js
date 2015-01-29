var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {

  livereload.listen();

  gulp.watch(['js/**/*', 'css/**/*', '**/*.html']).on('change', livereload.changed);

});

