var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');		// For use with browserify, use gulp-react for other

var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');

var paths = {
	src: {
		DIR: 'src/',
		ASSETS: 'src/assets/',
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

gulp.task('copy-lib', function() {
	return gulp.src(paths.LIB)
		.pipe(gulp.dest(paths.dest.LIB));
});

gulp.task('copy-services', function() {
	return gulp.src(paths.src.SERVICES + '*.*')
		.pipe(gulp.dest(paths.dest.JS));
})

gulp.task('copy-html', function() {
	// Copies src html to the dest html
	return gulp.src(paths.src.HTML)
		.pipe(gulp.dest(paths.dest.DIR));
})

gulp.task('concat-jsx', function() {
	// Concatenates all src jsx files into one bundled jsx file in paths.dest.jsx
	return gulp.src(paths.src.JSX)
		.pipe(concat(paths.JSX_OUT))
		.pipe(gulp.dest(paths.dest.JSX));
});

gulp.task('browserify-jsx', function() {
	// TODO
	var b = browserify({
		entries: [paths.src.ASSETS + 'index.js'] ,
		debug: true,
		transform: [reactify],
		cache: {}, packageCache: {}, fullPaths: true
	});

	return b.bundle()
		.pipe(source(paths.OUT))
		.pipe(buffer())
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
})

gulp.task('replace', function() {
	// Replaces the jsx in index.html with a single concatenated js bundle
	return gulp.src(paths.dest.HTML)
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

gulp.task('replace-jsx', function() {
	// Replaces the jsx in index.html with a single concatenated jsx bundle
	return gulp.src(paths.dest.HTML)
		.pipe(htmlreplace({
			'jsx': {
				src: paths.JSX_OUT,
				tpl: '<script type="text/babel" src="assets/js/%s"></script>'
			}
		}, {
			keepBlockTags: true,
			resolvePaths: true
		}))
		.pipe(gulp.dest(paths.dest.DIR));
});
