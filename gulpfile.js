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

    // The Main files used on every page
    gulp.src(['assets/js/main.js', 'assets/js/pages/DynamicPage.js'])
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./public/js/'));

    // Tickets
    gulp.src(['assets/js/pages/tickets/**/*.js'])
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat('tickets.min.js'))
        .pipe(gulp.dest('./public/js/pages/'));

    // Staff
    gulp.src(['assets/js/pages/staff/**/*.js'])
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat('staff.min.js'))
        .pipe(gulp.dest('./public/js/pages/'));

    // Global Metrics
    gulp.src(['assets/js/pages/global_metrics/**/*.js'])
        .pipe(plumber())
        // .pipe(uglify())
        .pipe(concat('global_metrics.min.js'))
        .pipe(gulp.dest('./public/js/pages/'));
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