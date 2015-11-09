
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

gulp.task('sass', function (){
    return gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});


gulp.task('watch', function (){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['index.html', 'js/main.js','js/facets.js'], browserSync.reload);
});

gulp.task('default', ['watch']);