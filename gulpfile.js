var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('default', ['html', 'css', 'js']);

gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter())
        .pipe(gulp.dest('public/'));
});

gulp.task('css', function() {
 return gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('js', function () {
    return gulp.src('js/*.js')
    .pipe(browserify())
//    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function () {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
});
