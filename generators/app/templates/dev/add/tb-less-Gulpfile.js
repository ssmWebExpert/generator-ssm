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
	wp = './wp',
	tbPath = './bower_components/bootstrap',
	config = {
		htmlPath: dist,
		lessPath: src + '/less',
		cssPath: dist + '/css',
		jsPathSrc: src + '/js',
		jsPathDest: dist + '/js',
		tbPathFonts: tbPath + '/fonts',
		pathFonts: src + '/fonts',
		destFonts: dist + '/fonts',
		tbPathLess: tbPath + '/less',
		tbPathJs: tbPath + '/dist/js',
		imgPathSrc: src + '/images/',
		imgPathDest: dist + '/images'
	};

gulp.task('wp-gulp', function(){
	gulp.src('theme-gulpfile.js')
		.pipe($.rename('gulpfile.js'))
		.pipe(gulp.dest(dist));
	gulp.src('theme-package.json')
		.pipe($.rename('package.json'))
		.pipe(gulp.dest(dist));
});

gulp.task('images', function(){
    gulp.src([config.imgPathSrc + '**/*'])
	    .pipe($.plumber())
        .pipe(gulp.dest(config.imgPathDest));
});

gulp.task('imagesDone', function(){
	gulp.src([config.imgPathSrc + '*.*'])
	    .pipe($.plumber())
        .pipe(gulp.dest(dist + '/sourceimages'))
        .pipe(gulp.dest(config.imgPathDest));
});

gulp.task('wp', function(){
	gulp.src([
		wp + "/**/*.*"
	])
	.pipe($.plumber())
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist));
});

gulp.task('imagesDoneWp', function(){
	gulp.src([config.imgPathSrc + '*.*'])
	    .pipe($.plumber())
        .pipe(gulp.dest(dist + '/sourceimages'))
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
	    .pipe($.plumber())
	    .pipe($.sourcemaps.init())
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
		// .pipe($.uglifycss({
		// 	"maxLineLen": 80,
		// 	"uglyComments": false
		// }))
		.pipe($.sourcemaps.write("./"))
		.pipe(gulp.dest(config.cssPath))
		.pipe(browserSync.stream());
});

gulp.task('lessDone', function(){
	return gulp.src(config.lessPath + '/**/style.less')
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
		// .pipe($.uglifycss({
		// 	"maxLineLen": 80,
		// 	"uglyComments": false
		// }))
		.pipe(gulp.dest(config.cssPath));
});

gulp.task('less-tb', function(){
	return gulp.src(config.tbPathLess + '/bootstrap.less')
		.pipe($.plumber())
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
		// .pipe($.uglifycss({
		// 	"maxLineLen": 80,
		// 	"uglyComments": false
		// }))
		.pipe(gulp.dest(config.cssPath));
});

/* Compile Pug templates
-------------------------------------------------------------------- */

gulp.task('pug', function buildHTML() {
	return gulp.src(src + '/*.pug')
	    .pipe($.plumber())
		.pipe($.pug({
			pretty: true
		}))
    	.pipe(wiredep())
    	.pipe($.useref())
		//.pipe($.if('*.js', $.uglify()))
		//.pipe($.if('*.css', $.uglifycss({
		//	"maxLineLen": 80,
		//	"uglyComments": false
		//})))
		.pipe(gulp.dest(dist));
});

/*************************
Use as Example for pug files convertation from another folder
You need to add pugInc task to pug-watch[] and to done task
*************************/

// gulp.task('pugInc', function buildHTML() {
// 	return gulp.src(src + '/inc/*.pug')
// 		.pipe($.plumber())
// 		.pipe($.pug({
// 			pretty: true
// 		}))
// 		.pipe(gulp.dest(dist + "/inc/"));
// });

gulp.task('pug-watch', ['pug'], function (done) {
    browserSync.reload();
    done();
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

/* Cleanup the Sass generated --sourcemap *.map.css files
-------------------------------------------------------------------- */

gulp.task('clean', function(){
	gulp.src([dist], 
		{read: false}
	)
	.pipe($.contribClean());
	gulp.src([config.imgPathSrc + '**.txt'], 
		{read: false}
	)
	.pipe($.contribClean());
});

/* Copy
-------------------------------------------------------------------- */

gulp.task('html', function() {
	return gulp.src(src + '/*.html')
	    .pipe($.plumber())
		.pipe($.contribCopy())
    	.pipe(wiredep())
    	.pipe($.useref())
  //   	.pipe($.if('*.js', $.uglify()))
  //       .pipe($.if('*.css', $.uglifycss({
		// 	"maxLineLen": 80,
		// 	"uglyComments": false
		// })))
		.pipe(gulp.dest(dist));
});

gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('copy', function(){
	gulp.src([
		config.tbPathFonts + '/**/*.*'
	])
	.pipe($.plumber())
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist + '/fonts'));
	gulp.src([
		config.tbPathJs + '/bootstrap.min.js'
	])
	.pipe($.plumber())
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist + '/js'));
	gulp.src([
		config.pathFonts + '**/*.*'
	])
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist));
});

/*************************
Use as Example for file clone
*************************/

// gulp.task('copyVideo', function(){
// 	gulp.src([
// 		src + 'video/*.*'
// 	])
// 	.pipe($.contribCopy())
// 	.pipe(gulp.dest(dist));
// });

gulp.task('copyImage', function(){
	gulp.src([
		config.imgPathSrc + '**/*.*'
	])
	.pipe($.contribCopy())
	.pipe(gulp.dest(config.imgPathDest));
});

gulp.task('copyLess', function(){
	gulp.src([
		config.lessPath + "**/**/*.*"
	])
	.pipe($.plumber())
	.pipe($.contribCopy())
	.pipe(gulp.dest(dist));
});

/**********************************************************************
4. Uglify tasks
**********************************************************************/

gulp.task('uglify', function () {
    gulp.src(config.jsPathSrc + '**/*.js')
    .pipe($.plumber())
    // .pipe($.uglify())
    .pipe(gulp.dest(dist));
});

/**********************************************************************
5. Registered Gulp tasks
**********************************************************************/

gulp.task('build', function(){
  run(
  	'clean',
	'pug-watch',
	'html-watch',
	'less',
	'less-tb',
  	'copy',
  	'images',
	'uglify');
});

gulp.task('default', ['build', 'browser-sync'], function(){
  gulp.watch(src + '/**/*.pug', ['pug-watch']);
  gulp.watch(src + '/*.html', ['html-watch']);
  gulp.watch(src + '/**/*.js', ['uglify']).on('change', browserSync.reload);
  gulp.watch('src/images/**/*', ['copyImage']);
  gulp.watch(config.lessPath + '/**/*.less', ['less']);
});

gulp.task('commit', function(){
  run(
  	'clean',
	'pug',
	'html',
  	'copyLess',
	'lessDone',
	'less-tb',
  	'copy',
  	'imagesDone',
  	'wp',
	'uglify');
});

gulp.task('done', function(){
  run(
  	'clean',
	'pug',
	'html',
  	'copyLess',
	'lessDone',
	'less-tb',
  	'copy',
  	'imagesDoneWp',
  	'wp',
  	'wp-gulp',
	'uglify');
});