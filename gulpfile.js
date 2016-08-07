var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var htmlmin = require('gulp-html-minifier');
var uglify = require('gulp-uglify');
var compressor = require('gulp-compressor');

//Paths
var from = 'application/';
var to = '';


//Clean server folder
gulp.task('clean' , function(){
        del(to+'public/');
        del(to+'views/index.hbs');
});


//Change html to hbs and copy it in a views
gulp.task('indexRename' , function(){
    gulp.src(from + 'dist/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename('index.hbs'))
        .pipe(gulp.dest(to+'views/'));
});

//Copy dist to public in the server
gulp.task('script' , function () {
   gulp.src(['!'+from +'dist/index.html', from +'dist/**/*' , '!'+from+'dist/**/*.js' , '!'+from+'dist/**/*.css' , '!'+from+'dist/**/*.html'])
       .pipe(gulp.dest(to +'public/'));
    gulp.src(['!'+from +'dist/index.html', from +'dist/**/*.js' ])
        .pipe(uglify())
        .pipe(gulp.dest(to +'public/'));
    gulp.src(['!'+from +'dist/index.html', from +'dist/**/*.html' ])
        .pipe(compressor({'remove-intertag-spaces': true,
        'simple-bool-attr': true,
        'compress-js': true,
        'compress-css': true}))
        .pipe(gulp.dest(to +'public/'));
    gulp.src(['!'+from +'dist/index.html', from +'dist/**/*.css' ])
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
