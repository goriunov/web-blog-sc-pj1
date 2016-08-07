var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');

//Paths
var from = 'application/';
var to = '';


//Clean server folder
gulp.task('clean' , function(){
        del(to+'public/');
        del(to+'views/index.hbs')
});


//Change html to hbs and copy it in a views
gulp.task('indexRename' , function(){
    gulp.src(from + 'dist/index.html')
        .pipe(rename('index.hbs'))
        .pipe(gulp.dest(to+'views/'));
});

//Copy dist to public in the server
gulp.task('script' , function () {
   gulp.src(['!'+from +'dist/index.html', from +'dist/**/*'])
       .pipe(gulp.dest(to +'public/'));
});

gulp.task('addTool' , function(){
   gulp.src(from + 'not-compiled-files/**/*')
       .pipe(gulp.dest(to + 'public/'));
});

//watch for changes in to dist
gulp.task('watch', function(){
    gulp.watch(from + 'dist/**/*' , ['script']);
    gulp.watch(from + 'dist/index.html' , ['indexRename']);
});
