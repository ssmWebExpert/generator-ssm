/* SSM Gulp boilerplate, apr. 2017 */

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')();
	pkg = require('./package.json');
	run = require('run-sequence');
	wiredep = require('wiredep').stream;
	config = {
		lessPath: 'less',
		cssPath: './',
		imgPathSrc: 'sourceimages',
		imgPathDest: "images"
	};

gulp.task('images', function(){
    gulp.src([config.imgPathSrc + '**/*.png'])
	    .pipe($.plumber())
        .pipe($.imagemin({verbose: true}))
        .pipe(gulp.dest(config.imgPathDest));
    gulp.src([config.imgPathSrc + '**/*.jpg'])
	    .pipe($.plumber())
        .pipe($.imagemin({verbose: true}))
        .pipe(gulp.dest(config.imgPathDest));
	gulp.src([config.imgPathSrc + '**/*.svg'])
		.pipe($.plumber())
		.pipe($.contribCopy())
		.pipe(gulp.dest(config.imgPathDest));
});

/**********************************************************************
3. Configure Gulp tasks
**********************************************************************/

/* less compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('less', function(){
	return gulp.src(config.lessPath + '/style.less')
	    .pipe($.plumber())
		.pipe($.newer(config.cssPath))
		.pipe($.less({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		})).on('error', function(err){
			gutil.log(err);
			this.emit('end');
		}))
	    .pipe($.autoprefixer({
	        browsers: ['last 4 versions'],
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
	'less',
  	'images');
});

gulp.task('default', ['build', 'browser-sync'], function(){
  gulp.watch('sourceimages/**/*', ['images']);
  gulp.watch(config.lessPath + '/**/*.less', ['less']);
});

gulp.task('done', function(){
  run(
	'less',
  	'images');
});