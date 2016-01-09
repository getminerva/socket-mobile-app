var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');		// For use with browserify, use gulp-react for other
var htmlreplace = require('gulp-html-replace');


var paths = {
	src: {
		DIR: 'src/',
		ASSETS: 'src/assets/',
		CSS: 'src/assets/css/',
		COMPONENTS: 'src/assets/js/components/',
		SERVICES: 'src/assets/js/services/',
		VIEWS: 'src/views/',
		JSX: ['src/assets/js/*/*.jsx', 'src/assets/views/*.jsx', 'src/assets/index.js'],
		HTML: 'src/index.html',
		LIB: ['src/lib/*/*.*', 'src/lib/*/*/*.*'],
	},
	dest: {
		DIR: 'www/',
		ASSETS: 'www/assets/',
		CSS: 'www/assets/css/',
		SERVICES: 'www/assets/js/services/',
		JS: 'www/assets/js',
		JSX: 'www/assets/js/',
		LIB: ['www/lib/*/*.*', 'www/lib/*/*/*.*'],
		HTML: 'www/index.html'
	},
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	JSX_OUT: 'bundle.jsx',
	BROWSERIFY_OUT: 'bundle.js'
};

gulp.task('copy-services', function() {
	return gulp.src(paths.src.SERVICES + '*.*')
		.pipe(gulp.dest(paths.dest.JS));
});

gulp.task('copy-css', function() {
	return gulp.src(paths.src.CSS + 'index.css')
		.pipe(gulp.dest(paths.dest.CSS));
});

gulp.task('browserify-jsx', function() {
	var b = browserify({
		entries: [paths.src.ASSETS + 'index.js'] ,
		debug: true,
		transform: [reactify],
		cache: {}, packageCache: {}, fullPaths: true
	});

	return b.bundle()
		.pipe(source(paths.OUT))
		.pipe(gulp.dest(paths.dest.ASSETS));
});

gulp.task('cr-html', function() {
	return gulp.src(paths.src.HTML)
		.pipe(htmlreplace({
			'jsx': {
				src: paths.OUT,
				tpl: '<script type="text/javascript" src="assets/%s"></script>'
			}
		}, {
			keepBlockTags: true,
			resolvePaths: true
		}))
		.pipe(gulp.dest(paths.dest.DIR));
});

gulp.task('watch-html', function() {
	gulp.watch(paths.src.HTML, ['cr-html']);
});

gulp.task('watch-css', function() {
	gulp.watch(paths.src.CSS + 'index.css', ['copy-css']);
});

gulp.task('watch-js', function() {
	var watcher = watchify(browserify({
		entries: [paths.src.ASSETS + 'index.js'],
		transform: [reactify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths :true
	}));

	return watcher.on('update', function() {
		watcher.bundle()
			.pipe(source(paths.OUT))
			.pipe(gulp.dest(paths.dest.ASSETS));
		console.log('Updated JS build');
	}).bundle()
		.pipe(source(paths.OUT))
		.pipe(gulp.dest(paths.dest.ASSETS));
});

gulp.task('default', ['watch-html', 'watch-css', 'watch-js']);
