/*
	SSM Gulp boilerplate, jul. 2017
*/

// SCSS and pug based template

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')();
	pkg = require('./package.json');
	run = require('run-sequence');
	config = {
		scssPath: 'scss',
		cssPath: './',
		imgPathSrc: 'sourceimages',
		imgPathDest: 'images'
	};

gulp.task('images', function(){
    gulp.src([config.imgPathSrc + '/*.*'])
	    .pipe($.plumber())
        .pipe($.imagemin({verbose: true}))
        .pipe(gulp.dest(config.imgPathDest));
});

/**********************************************************************
3. Configure Gulp tasks
**********************************************************************/

/* Sass compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('sass', function(){
	return gulp.src(config.scssPath + '/*.scss')
	    .pipe($.plumber())
		.pipe($.newer(config.cssPath))
		.pipe($.sass({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: false
		}).on('error', $.sass.logError))
	    .pipe($.autoprefixer({
	        browsers: ['last 2 versions'],
	        cascade: false
	    }))
        .pipe($.groupCssMediaQueries())
		.pipe(gulp.dest(config.cssPath));
});

/* Run a proxy server
-------------------------------------------------------------------- */

gulp.task('browser-sync', function() {
	browserSync.init({
	    notify: false,
		server: {
	        directory:true,
	        baseDir: ['./']
		}
	});
});

/**********************************************************************
5. Registered Gulp tasks
**********************************************************************/

gulp.task('build', function(){
  run(
	'sass',
  	'images');
});

gulp.task('default', ['build', 'browser-sync'], function(){
  gulp.watch('images/**/*', ['images']);
  gulp.watch(config.scssPath + '/**/*.scss', ['sass']);
});

gulp.task('done', function(){
  run(
	'sass',
  	'images');
});