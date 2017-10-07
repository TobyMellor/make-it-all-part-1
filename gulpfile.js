var gulp      = require('gulp'),
    plumber   = require('gulp-plumber'),
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    sass      = require('gulp-sass'),
    path      = require('path'),
    minifyCSS = require('gulp-minify-css')
    concat    = require('gulp-concat');

gulp.task('scripts', function() {
    gulp.src(['assets/js/plugins/**/*.js'])
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/plugins/'));

    gulp.src(['assets/js/**/*.js', '!assets/js/plugins/**'])
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat('main.min.js'))
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