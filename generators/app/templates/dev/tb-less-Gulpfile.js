/*
	SSM Gulp boilerplate, apr. 2017
*/

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')();
	pkg = require('./package.json');
	run = require('run-sequence');
	wiredep = require('wiredep').stream;
	src = './src',
	dist = './dist',
	tbPath = './bower_components/bootstrap',
	config = {
		htmlPath: dist,
		lessPath: src + '/less',
		cssPath: dist + '/css',
		jsPathSrc: src + '/js',
		jsPathDest: dist + '/js',
		imgPathSrc: src + '/images',
		tbPathFonts: tbPath + '/fonts',
		pathFonts: src + '/fonts',
		destFonts: dist + '/fonts',
		tbPathLess: tbPath + '/less',
		tbPathJs: tbPath + '/dist/js',
		imgPathDest: dist
	};

gulp.task('images', function(){
    gulp.src([config.imgPathSrc + '**/*'])
        .pipe($.imagemin({verbose: true}))
        .pipe(gulp.dest(config.imgPathDest));
});

/**********************************************************************
3. Configure Gulp tasks
**********************************************************************/

/* less compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('less', function(){
	return gulp.src(config.lessPath + '/**/style.less')
		.pipe($.newer(config.cssPath))
		.pipe($.less({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		}))
	    .pipe($.autoprefixer({
	        browsers: ['last 4 versions'],
	        cascade: false
	    }))
        .pipe($.groupCssMediaQueries())
		.pipe($.uglifycss({
			"maxLineLen": 80,
			"uglyComments": false
		}))
		.pipe(gulp.dest(config.cssPath))
		.pipe(browserSync.stream());
});

gulp.task('less-tb', function(){
	return gulp.src(config.tbPathLess + '/bootstrap.less')
		.pipe($.newer(config.cssPath))
		.pipe($.less({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		}))
	    .pipe($.autoprefixer({
	        browsers: ['last 4 versions'],
	        cascade: false
	    }))
        .pipe($.groupCssMediaQueries())
		.pipe($.uglifycss({
			"maxLineLen": 80,
			"uglyComments": false
		}))
		.pipe(gulp.dest(config.cssPath));
});

/* Compile Pug templates
-------------------------------------------------------------------- */

gulp.task('pug', function buildHTML() {
	return gulp.src(src + '/*.pug')
		.pipe($.pug({
			pretty: true
		}))
    	.pipe(wiredep())
    	.pipe($.useref())
    	.pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.uglifycss({
			"maxLineLen": 80,
			"uglyComments": false
		})))
		.pipe(gulp.dest(dist))
		.pipe(browserSync.stream());
});

/* Run a proxy server
-------------------------------------------------------------------- */

gulp.task('browser-sync', function() {
	browserSync.init({
	    notify: false,
		server: {
	        directory:true,
	        baseDir: ['dist']
		}
	});
});

/* Cleanup the less generated --sourcemap *.map.css files
-------------------------------------------------------------------- */

gulp.task('clean', function(){
	gulp.src([dist], 
		{read: false}
	)
	.pipe($.contribClean());
});

/* Copy
-------------------------------------------------------------------- */

gulp.task('html', function() {
	return gulp.src(src + '/*.html')
		.pipe($.contribCopy())
    	.pipe(wiredep())
    	.pipe($.useref())
    	.pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.uglifycss({
			"maxLineLen": 80,
			"uglyComments": false
		})))
		.pipe(gulp.dest(dist))
		.pipe(browserSync.stream());
});

gulp.task('copy', function(){
	gulp.src([
		config.tbPathFonts + '/**/*.*'
	])
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist + '/fonts'));
	gulp.src([
		config.tbPathJs + '/bootstrap.min.js'
	])
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist + '/js'));
	gulp.src([
		config.pathFonts + '**/*.*'
	])
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist));
});

gulp.task('copyImage', function(){
	gulp.src([
		config.imgPathSrc + '**/*.*'
	])
	.pipe($.contribCopy())
	.pipe(gulp.dest(config.imgPathDest));
});

/**********************************************************************
4. Uglify tasks
**********************************************************************/

gulp.task('uglify', function () {
    gulp.src(config.jsPathSrc + '**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest(dist));
});

/**********************************************************************
5. Registered Gulp tasks
**********************************************************************/

gulp.task('build', function(){
  run(
  	'clean',
	'pug',
	'html',
	'less',
	'less-tb',
  	'copy',
  	'images',
	'uglify');
});

gulp.task('serve', ['build', 'browser-sync'], function(){
  gulp.watch(config.cssPath + '/*.css').on('change', browserSync.reload);
  gulp.watch(src + '/*.pug', ['pug']);
  gulp.watch(src + '/*.html', ['html']);
  gulp.watch(dist + '/*.html').on('change', browserSync.reload);
  gulp.watch(src + '/**/*.js', ['uglify']).on('change', browserSync.reload);
  gulp.watch('src/images/**/*', ['copyImage']);
  gulp.watch(config.lessPath + '/**/*.less', ['less']).on('change', browserSync.reload);
});

gulp.task('done', ['build']);