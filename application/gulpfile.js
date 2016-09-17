var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styling' , function(){
  gulp.src('./src/**/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src'));
});
