var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var sync = require('browser-sync').create();
var reload = sync.reload;

var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/main.css',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST_DEV: 'dev',
  DEST_PROD: 'prod',
  DEST_DEV_JS: 'dev/js',
  DEST_PROD_JS: 'prod/js',
  ENTRY_POINT: './src/js/app.js'
};

gulp.task('serve', ['replaceHTML', 'watch'], function(){
  sync.init({
    server: './dev'
  });
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['replaceHTML']);
  gulp.watch(path.CSS, ['replaceCSS']);
  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_DEV_JS))
      .pipe(reload({stream: true}))
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_DEV_JS));
});

gulp.task('default', ['serve']);

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_PROD_JS));
  console.log('Build successfull. Destination: /prod/* ');
});

gulp.task('replaceCSS', function(){
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_DEV))
    .pipe(reload({stream: true}));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'js/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST_DEV))
    .pipe(reload({stream: true}));
});

gulp.task('replaceMinifiedHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'js/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST_PROD));
  gulp.src(path.CSS)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.DEST_PROD));
});

gulp.task('production', ['replaceMinifiedHTML', 'build']);