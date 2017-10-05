var gulp      = require('gulp'),
    plumber   = require('gulp-plumber'),
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    sass      = require('gulp-sass'),
    path      = require('path'),
    minifyCSS = require('gulp-minify-css');

gulp.task('scripts', function() {
    gulp.src(['assets/js/**/*.js', '!assets/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('styles', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/**/*.js', ['scripts']);
    gulp.watch('assets/sass/**/*.scss', ['styles']);
})

gulp.task('default', ['styles', 'scripts', 'watch']);