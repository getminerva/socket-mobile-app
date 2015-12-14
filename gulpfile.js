var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

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
};

// gulp.task('concat-js', function() {
// 	return gulp.src('src/assets/js/*')
// 		.pipe(concat('bundle.js'))
// 		.pipe();
// });

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


gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./src/assets/index.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('index.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./www/assets/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('index.js'))
    .pipe(gulp.dest('./www/assets/'));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});


// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);
