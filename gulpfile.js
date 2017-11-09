var gulp       = require('gulp'),
    plumber    = require('gulp-plumber'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    sass       = require('gulp-sass'),
    path       = require('path'),
    minifyCSS  = require('gulp-minify-css'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    babel      = require('gulp-babel'),
    minifyJS   = require('gulp-babel-minify');

gulp.task('scripts', function() {
    // The Main files used on every page
    gulp.src(['assets/js/main.js', 'assets/js/pages/DynamicPage.js', 'assets/js/pages/Manager.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minifyJS({
	        mangle: false
/*
	        mangle: {
		        keepClassName: true
	        }
*/
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./public/js/'));
    
    for (var pagetype of ['tickets', 'staff', 'hardware', 'software', 'metrics', 'problem_types', 'settings', 'login']) {
        gulp.src(['assets/js/pages/' + pagetype + '/**/*.js'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(concat(pagetype + '.min.js'))
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(minifyJS({
	            mangle: false
/*
    	        mangle: {
    		        keepClassName: true
    	        }
*/
            }))
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest('./public/js/pages/'));
    }
});

gulp.task('styles', function() {
    gulp.src(['assets/sass/main.scss', 'assets/sass/*/*.scss', '!assets/sass/plugins/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('plugins', function() {
	  // Minify plugins once on first run of gulp
	  // Separated from watch to speed up recompilation
	  // Re-run gulp in Terminal after making changes to plugins
    gulp.src(['assets/js/plugins/jquery.js', 'assets/js/plugins/jquery-ui.js', 'assets/js/plugins/jquery-ui-timepicker-addon.js', 'assets/js/plugins/popper.js', 'assets/js/plugins/bootstrap.js', 'assets/js/plugins/bootstrap-select.js', 'assets/js/plugins/chart.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('plugins.min.js'))
        .pipe(minifyJS({
	        mangle: {
		        keepClassName: true
	        }
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./public/js/plugins/'));
    gulp.src(['assets/sass/plugins/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('plugins.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./public/css/plugins/'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/**/*.js', ['scripts']);
    gulp.watch('assets/sass/**/*.scss', ['styles']);
})

gulp.task('default', ['scripts', 'styles', 'plugins', 'watch']);
